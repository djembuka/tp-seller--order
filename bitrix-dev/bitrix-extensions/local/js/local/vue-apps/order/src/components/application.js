import './application.css';
import { LocationComponent } from 'local.vue-components.location-component';
import { ControlComponent } from 'local.vue-components.control-component';

import { mapState, mapActions } from 'ui.vue3.pinia';
import { orderStore } from '../stores/order';

export const Application = {
  data() {
    return {
      locations: undefined,
      order: undefined,
      sessid: window.BX.bitrix_sessid(),
    };
  },
  components: { LocationComponent, ControlComponent },
  // language=Vue

  template: `
  <form id="bx-soa-order-form" ref="form">

    <fieldset>
      <legend>Person type</legend>
      <ControlComponent v-if="controls.personType" :control="controls.personType" @input="input" @hints="hints" />
    </fieldset>

    <hr>

    <fieldset>
      <legend>Delivery</legend>
      <ControlComponent v-if="controls.delivery" :control="controls.delivery" @input="input" @hints="hints" />
    </fieldset>

    <hr>

    <fieldset>
      <legend>Location</legend>
      <input type="text" autocomplete="off" name="ORDER_PROP_6" :value="LOCATION" class="dropdown-field" placeholder="Введите название ..." wfd-invisible="true" style="display: none;">
    </fieldset>

    <hr>

    <fieldset>
      <legend>Paysystem</legend>
      <ControlComponent v-if="controls.paysystem" :control="controls.paysystem" @input="input" @hints="hints" />
    </fieldset>

    <hr>

    <fieldset>
      <legend>Order props</legend>
      <hr>
      <div v-for="control in controls.orderProps" :key="control.id">
        <ControlComponent :control="control" @input="input" @hints="hints" />
        <hr>
      </div>
      <textarea id="orderDescription" cols="4" class="form-control bx-soa-customer-textarea bx-ios-fix" name="ORDER_DESCRIPTION"></textarea>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Hidden</legend>
      <hr>
      <div style="display: grid; gap: 16px; grid-template-columns: repeat(4, 1fr);">
        <ControlComponent v-for="control in controls.hidden" :key="control.id" :control="control" @input="input" @hints="hints" />
      </div>
    </fieldset>

    <hr>
    
  </form>
  `,
  computed: {
    ...mapState(orderStore, ['OPTIONS', 'controls']),
    LOCATION() {
      if (this.OPTIONS.locations) {
        return Object.values(this.OPTIONS.locations)[0].lastValue;
      }
    },
  },
  methods: {
    ...mapActions(orderStore, ['changeControlValue', 'setOptions']),
    input(attrs) {
      this.changeControlValue(attrs);
    },
    changeDelivery() {
      this.ajax();
    },
    changePaysystem() {
      this.ajax();
    },
    makeData(data) {
      //pay systems
      this.PAY_SYSTEM_LIST = Object.values(data.PAY_SYSTEM).map((pay) => {
        return {
          ID: pay.ID,
          SORT: pay.SORT,
          NAME: pay.NAME,
          DESCRIPTION: pay.DESCRIPTION,
          CHECKED: pay.CHECKED,
          SRC: pay.PSA_LOGOTIP_SRC,
        };
      });

      //deliveries
      this.DELIVERY_LIST = Object.values(data.DELIVERY).map((del) => {
        return {
          ID: del.ID,
          SORT: del.SORT,
          NAME: del.NAME,
          DESCRIPTION: del.DESCRIPTION,
          CHECKED: del.CHECKED,
          SRC: del.LOGOTIP_SRC,
          PRICE_FORMATED: del.PRICE_FORMATED,
          FIELD_NAME: del.FIELD_NAME,
        };
      });

      //basket
      this.BASKET = Object.values(data.GRID.ROWS).map((product) => {
        return {
          ID: product.data.ID,
          SORT: product.data.SORT,
          NAME: product.data.NAME,
          PROPERTIES: Object.values(product.data.PROPS),
          QUANTITY: product.data.QUANTITY,
          MEASURE: product.data.MEASURE_TEXT,
          SRC: product.data.DETAIL_PICTURE_SRC_ORIGINAL,
          BASE_PRICE: product.data.BASE_PRICE,
          BASE_PRICE_FORMATED: product.data.BASE_PRICE_FORMATED,
          PRICE: product.data.PRICE, //price with discount
          PRICE_FORMATED: product.data.PRICE_FORMATED, //price with discount
          DETAIL_PAGE_URL: product.data.DETAIL_PAGE_URL,
          DISCOUNT_PRICE: product.data.DISCOUNT_PRICE,
          DESCRIPTION: product.data.PREVIEW_TEXT,
          SUM_BASE_FORMATED: product.data.SUM_BASE_FORMATED,
          SUM_FORMATED: product.data.SUM,
        };
      });

      //properties
      this.PROPERTIES = Object.values(data.ORDER_PROP.properties);

      this.DELIVERY_ERRORS = data.ERROR;
      this.PAY_SYSTEM_ERRORS = data.ERROR;

      this.PERSON_TYPE = Object.values(data.PERSON_TYPE);

      this.PRODUCTS_BASE_PRICE_FORMATED = data.TOTAL.PRICE_WITHOUT_DISCOUNT;
      this.PRODUCTS_PRICE_FORMATED = data.TOTAL.ORDER_PRICE_FORMATED;
      this.PRODUCTS_DISCOUNT_FORMATED = data.TOTAL.DISCOUNT_PRICE_FORMATED;

      this.DELIVERY_BASE_PRICE_FORMATED = data.TOTAL.DELIVERY_PRICE_FORMATED;

      this.DISCOUNT_PRICE_FORMATED = data.TOTAL.DISCOUNT_PRICE_FORMATED;

      this.SUM_BASE_FORMATED = data.TOTAL.PRICE_WITHOUT_DISCOUNT;
      this.SUM_FORMATED = data.TOTAL.ORDER_PRICE_FORMATED;
    },
    endLoader() {
      console.log('endLoader');
    },
    getData() {
      const order = {};
      new FormData(this.$refs.form).forEach(
        (value, key) => (order[key] = value)
      );

      return {
        order,
        sessid: this.sessid,
        via_ajax: 'Y',
        SITE_ID: this.OPTIONS.siteID,
        signedParamsString: this.OPTIONS.signedParamsString,
        'soa-action': 'refreshOrderAjax',
      };
    },
    ajax() {
      const self = this;

      BX.ajax({
        method: 'POST',
        dataType: 'json',
        url: this.OPTIONS.ajaxUrl,
        data: this.getData(),
        onsuccess: (result) => {
          this.setOptions({ options: result });
        },
        onfailure: (error) => {},
      });
    },
  },
};
