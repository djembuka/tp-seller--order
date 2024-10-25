import './application.css';

import { mapState, mapActions } from 'ui.vue3.pinia';
import { dataStore } from '../stores/data';

export const Application = {
  data() {
    return {
      locations: undefined,
      order: undefined,

      PROPERTIES: undefined,
      DELIVERY_LIST: undefined,
      DELIVERY_ERRORS: undefined,
      PAY_SYSTEM_LIST: undefined,
      PAY_SYSTEM_ERRORS: undefined,
      BASKET: undefined,
      PRODUCTS_BASE_PRICE_FORMATED: undefined,
      PRODUCTS_PRICE_FORMATED: undefined,
      PRODUCTS_DISCOUNT_FORMATED: undefined,
      DELIVERY_BASE_PRICE_FORMATED: undefined,
      DELIVERY_PRICE_FORMATED: undefined,
      DELIVERY_DISCOUNT_FORMATED: undefined,
      SUM_BASE_FORMATED: undefined,
      DISCOUNT_VALUE_FORMATED: undefined,
      SUM_FORMATED: undefined,
    };
  },
  components: {},
  // language=Vue

  template: `
  <button @click.prevent="loadData">Load</button>
    <form action="" method="post" name="os-order-form" id="os-order-form">
      <input type="hidden" name="person_type_id" :value="PERSON_TYPE_ID">
      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE}}</h2>
      <table>
        <tr v-for="prop in PROPERTIES" :key="prop.ID">
          <td>
            <label :for="prop.NAME">
              <span class="required" style="color: red;" title="%s" v-if="prop.REQUIRED === 'Y'">*</span>
            </label>
            <!--<div class="error" data-v-for="error in prop.ERRORS" data-key="error.id">error.getMessage()</div>-->
          </td>
          <td>
            <div v-if="prop.TYPE === 'LOCATION'" class="location">
              <select class="location-search" :name="prop.TYPE"
                :id="prop.TYPE">
                <option :data-data='prop.LOCATION_DATA' :value="prop.DEFAULT_VALUE">{{prop.NAME}}</option>
              </select>
            </div>
            <div v-else-if="prop.TYPE === 'ENUM'">
              <div v-for="(name, code) in prop.OPTIONS">
                <label class="enum-option">
                  <input type="radio" :name="prop.NAME" :value="code">
                  {{name}}
                </label>
              </div>
            </div>
            <div v-else-if="prop.TYPE === 'DATE'">
              <calendar></calendar>
            </div>
            <div v-else-if="prop.TYPE === 'Y/N'">
              <input :id="prop.NAME" type="checkbox" :name="prop.NAME" value="Y">
            </div>
            <div v-else>
              {{prop.NAME}}
              <input :id="prop.NAME" type="text" :name="prop.NAME" :value="prop.VALUE">
            </div>
          </td>
        </tr>

      </table>

      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE}}</h2>
      <!--<div data-v-for="error in DELIVERY_ERRORS" class="error" data-key="error.id">error.getMessage()</div>-->
      <div v-for="arDelivery in DELIVERY_LIST" :key="arDelivery.ID">
        <label>
          <input type="radio" name="delivery_id" :value="arDelivery.ID" :checked="arDelivery.CHECKED">
          {{arDelivery.NAME}}
          <span v-html="arDelivery.PRICE_FORMATED"></span>
        </label>
        <br>
      </div>

      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE}}</h2>
      <!--<div data-v-for="error in PAY_SYSTEM_ERRORS" class="error" data-key="error.id">error.getMessage()</div>-->
      <div v-for="arPaySystem in PAY_SYSTEM_LIST" :key="arPaySystem.ID">
        <label>
          <input type="radio" name="pay_system_id" :value="arPaySystem.ID" :checked="arPaySystem.CHECKED">
          {{arPaySystem.NAME}}
        </label>
        <br>
      </div>

      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE}}</h2>
      <table>
        <tr>
          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN}}</th>
          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN}}</th>
          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN}}</th>
          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN}}</th>
          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN}}</th>
        </tr>
        <tr v-for="arBasketItem in BASKET" :key="arBasketItem.ID">
          <td>
            {{arBasketItem.NAME}}
            <div v-if="arBasketItem.PROPERTIES.length" class="basket-properties">
              <div v-for="prop in arBasketItem.PROPERTIES" :key="prop.ID">
                {{prop.NAME}}
                {{prop.VALUE}}
                <br>
              </div>
            </div>
          </td>
          <td>{{arBasketItem.QUANTITY}} {{arBasketItem.MEASURE}}</td>
          <td v-html="arBasketItem.BASE_PRICE_FORMATED"></td>
          <td v-html="arBasketItem.PRICE_FORMATED"></td>
          <td v-html="arBasketItem.SUM_FORMATED"></td>
        </tr>
      </table>

      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE}}</h2>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE}}</td>
          <td v-html="PRODUCTS_BASE_PRICE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE}}</td>
          <td v-html="PRODUCTS_PRICE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT}}</td>
          <td v-html="PRODUCTS_DISCOUNT_FORMATED"></td>
        </tr>
      </table>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE}}</td>
          <td v-html="DELIVERY_BASE_PRICE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE}}</td>
          <td v-html="DELIVERY_PRICE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT}}</td>
          <td v-html="DELIVERY_DISCOUNT_FORMATED"></td>
        </tr>
      </table>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE}}</td>
          <td v-html="SUM_BASE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT}}</td>
          <td v-html="DISCOUNT_VALUE_FORMATED"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE}}</td>
          <td v-html="SUM_FORMATED"></td>
        </tr>
      </table>

      <input type="hidden" name="save" value="y">
      <br>
      <button type="submit">{{OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON}}</button>
      <br>
      <br>
    </form>
	`,
  computed: {
    ...mapState(dataStore, [
      'SESSION_ID',
      'SIGNED_PARAMETERS',
      'OPTIONS',
      'OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN',
      'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN',
      'OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT',
      'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT',
      'OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE',
      'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT',
      'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE',
      'OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON',
    ]),
  },
  methods: {
    ...mapActions(dataStore, []),
    loadData() {
      const self = this;
      BX.ajax({
        method: 'POST',
        dataType: 'json',
        url: 'https://seller20testing.twpx.ru/bitrix/components/bitrix/sale.order.ajax/ajax.php',
        data: dataStore().OPTIONS,
        onsuccess: BX.delegate((result) => {
          self.locations = result.locations;
          self.makeData(result.order);
        }, this),
        onfailure: BX.delegate(() => {
          self.endLoader();
        }, this),
      });
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
  },
};
