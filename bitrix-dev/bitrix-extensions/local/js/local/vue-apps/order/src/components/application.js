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
      PRODUCTS_BASE_PRICE_DISPLAY: undefined,
      PRODUCTS_PRICE_DISPLAY: undefined,
      PRODUCTS_DISCOUNT_DISPLAY: undefined,
      DELIVERY_BASE_PRICE_DISPLAY: undefined,
      DELIVERY_PRICE_DISPLAY: undefined,
      DELIVERY_DISCOUNT_DISPLAY: undefined,
      SUM_BASE_DISPLAY: undefined,
      DISCOUNT_VALUE_DISPLAY: undefined,
      SUM_DISPLAY: undefined,
    };
  },
  components: {},
  // language=Vue

  template: `
  <button @click.prevent="load">Load</button>
    <form action="" method="post" name="os-order-form" id="os-order-form">
      <input type="hidden" name="person_type_id" :value="PERSON_TYPE_ID">
      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE}}</h2>
      <table>

        <tr v-for="arProp in PROPERTIES" :key="arProp.ID">
          <td>
            <label :for="arProp.FORM_LABEL">
              {{arProp.NAME}}
              <span class="required" style="color: red;" title="%s" v-if="arProp.IS_REQUIRED">*</span>
            </label>
            <!--<div class="error" data-v-for="error in arProp.ERRORS" data-key="error.id">error.getMessage()</div>-->
          </td>
          <td>
            <div v-if="arProp.TYPE === 'LOCATION'" class="location">
              <select class="location-search" :name="arProp.FORM_NAME"
                :id="arProp.FORM_LABEL">
                <option :data-data='arProp.LOCATION_DATA' :value="arProp.VALUE">{{arProp.LOCATION_DATA.label}}</option>
              </select>
            </div>
            <div v-else-if="arProp.TYPE === 'ENUM'">
              <div v-for="(name, code) in arProp.OPTIONS">
                <label class="enum-option">
                  <input type="radio" :name="arProp.FORM_NAME" :value="code">
                  {{name}}
                </label>
              </div>
            </div>
            <div v-else-if="arProp.TYPE === 'DATE'">
              <calendar></calendar>
            </div>
            <div v-else-if="arProp.TYPE === 'Y/N'">
              <input :id="arProp.FORM_LABEL" type="checkbox" :name="arProp.FORM_NAME" value="Y">
            </div>
            <div v-else>
              <input :id="arProp.FORM_LABEL" type="text" :name="arProp.FORM_NAME" :value="arProp.VALUE">
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
          {{arDelivery.PRICE_DISPLAY}}
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
              <div v-for="arProp in arBasketItem.PROPERTIES" :key="arProp.ID">
                {{arProp.NAME}}
                {{arProp.VALUE}}
                <br>
              </div>
            </div>
          </td>
          <td>{{arBasketItem.QUANTITY_DISPLAY}}</td>
          <td v-html="arBasketItem.BASE_PRICE_DISPLAY"></td>
          <td v-html="arBasketItem.PRICE_DISPLAY"></td>
          <td v-html="arBasketItem.SUM_DISPLAY"></td>
        </tr>
      </table>

      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE}}</h2>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE}}</td>
          <td v-html="PRODUCTS_BASE_PRICE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE}}</td>
          <td v-html="PRODUCTS_PRICE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT}}</td>
          <td v-html="PRODUCTS_DISCOUNT_DISPLAY"></td>
        </tr>
      </table>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE}}</td>
          <td v-html="DELIVERY_BASE_PRICE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE}}</td>
          <td v-html="DELIVERY_PRICE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT}}</td>
          <td v-html="DELIVERY_DISCOUNT_DISPLAY"></td>
        </tr>
      </table>

      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE}}:</h3>
      <table>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE}}</td>
          <td v-html="SUM_BASE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT}}</td>
          <td v-html="DISCOUNT_VALUE_DISPLAY"></td>
        </tr>
        <tr>
          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE}}</td>
          <td v-html="SUM_DISPLAY"></td>
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
    load() {
      BX.ajax({
        method: 'POST',
        dataType: 'json',
        url: 'https://seller20testing.twpx.ru/bitrix/components/bitrix/sale.order.ajax/ajax.php',
        data: dataStore().OPTIONS,
        onsuccess: BX.delegate(function (result) {
          this.locations = result.locations;
          this.order = result.order;
        }, this),
        onfailure: BX.delegate(function () {
          this.endLoader();
        }, this),
      });
    },
  },
};
