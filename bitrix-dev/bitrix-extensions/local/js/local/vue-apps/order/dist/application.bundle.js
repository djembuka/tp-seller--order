/* eslint-disable */
(function (exports,ui_vue3,local_vueComponents_locationComponent,ui_vue3_pinia) {
  'use strict';

  var dataStore = ui_vue3_pinia.defineStore('data', {
    state: function state() {
      return {
        sessionid: '',
        signedParameters: ''
      };
    }
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var Application = {
    data: function data() {
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
        SUM_FORMATED: undefined
      };
    },
    components: {
      LocationComponent: local_vueComponents_locationComponent.LocationComponent
    },
    // language=Vue

    template: "\n  <button @click.prevent=\"loadData\">Load</button>\n    <form action=\"\" method=\"post\" name=\"os-order-form\" id=\"os-order-form\">\n      <input type=\"hidden\" name=\"person_type_id\" :value=\"PERSON_TYPE_ID\">\n      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE}}</h2>\n      <table>\n        <tr v-for=\"prop in PROPERTIES\" :key=\"prop.ID\">\n          <td>\n            <label :for=\"prop.NAME\">\n              <span class=\"required\" style=\"color: red;\" title=\"%s\" v-if=\"prop.REQUIRED === 'Y'\">*</span>\n            </label>\n            <!--<div class=\"error\" data-v-for=\"error in prop.ERRORS\" data-key=\"error.id\">error.getMessage()</div>-->\n          </td>\n          <td>\n            <div v-if=\"prop.TYPE === 'LOCATION'\" class=\"location\">\n              <LocationComponent :label=\"prop.NAME\" />\n            </div>\n            <div v-else-if=\"prop.TYPE === 'ENUM'\">\n              <div v-for=\"(name, code) in prop.OPTIONS\">\n                <label class=\"enum-option\">\n                  <input type=\"radio\" :name=\"prop.NAME\" :value=\"code\">\n                  {{name}}\n                </label>\n              </div>\n            </div>\n            <div v-else-if=\"prop.TYPE === 'DATE'\">\n              <calendar></calendar>\n            </div>\n            <div v-else-if=\"prop.TYPE === 'Y/N'\">\n              <input :id=\"prop.NAME\" type=\"checkbox\" :name=\"prop.NAME\" value=\"Y\">\n            </div>\n            <div v-else>\n              {{prop.NAME}}\n              <input :id=\"prop.NAME\" type=\"text\" :name=\"prop.NAME\" :value=\"prop.VALUE\">\n            </div>\n          </td>\n        </tr>\n\n      </table>\n\n      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE}}</h2>\n      <!--<div data-v-for=\"error in DELIVERY_ERRORS\" class=\"error\" data-key=\"error.id\">error.getMessage()</div>-->\n      <div v-for=\"arDelivery in DELIVERY_LIST\" :key=\"arDelivery.ID\">\n        <label>\n          <input type=\"radio\" name=\"delivery_id\" :value=\"arDelivery.ID\" :checked=\"arDelivery.CHECKED\">\n          {{arDelivery.NAME}}\n          <span v-html=\"arDelivery.PRICE_FORMATED\"></span>\n        </label>\n        <br>\n      </div>\n\n      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE}}</h2>\n      <!--<div data-v-for=\"error in PAY_SYSTEM_ERRORS\" class=\"error\" data-key=\"error.id\">error.getMessage()</div>-->\n      <div v-for=\"arPaySystem in PAY_SYSTEM_LIST\" :key=\"arPaySystem.ID\">\n        <label>\n          <input type=\"radio\" name=\"pay_system_id\" :value=\"arPaySystem.ID\" :checked=\"arPaySystem.CHECKED\">\n          {{arPaySystem.NAME}}\n        </label>\n        <br>\n      </div>\n\n      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE}}</h2>\n      <table>\n        <tr>\n          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN}}</th>\n          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN}}</th>\n          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN}}</th>\n          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN}}</th>\n          <th>{{OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN}}</th>\n        </tr>\n        <tr v-for=\"arBasketItem in BASKET\" :key=\"arBasketItem.ID\">\n          <td>\n            {{arBasketItem.NAME}}\n            <div v-if=\"arBasketItem.PROPERTIES.length\" class=\"basket-properties\">\n              <div v-for=\"prop in arBasketItem.PROPERTIES\" :key=\"prop.ID\">\n                {{prop.NAME}}\n                {{prop.VALUE}}\n                <br>\n              </div>\n            </div>\n          </td>\n          <td>{{arBasketItem.QUANTITY}} {{arBasketItem.MEASURE}}</td>\n          <td v-html=\"arBasketItem.BASE_PRICE_FORMATED\"></td>\n          <td v-html=\"arBasketItem.PRICE_FORMATED\"></td>\n          <td v-html=\"arBasketItem.SUM_FORMATED\"></td>\n        </tr>\n      </table>\n\n      <h2>{{OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE}}</h2>\n\n      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE}}:</h3>\n      <table>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE}}</td>\n          <td v-html=\"PRODUCTS_BASE_PRICE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE}}</td>\n          <td v-html=\"PRODUCTS_PRICE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT}}</td>\n          <td v-html=\"PRODUCTS_DISCOUNT_FORMATED\"></td>\n        </tr>\n      </table>\n\n      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE}}:</h3>\n      <table>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE}}</td>\n          <td v-html=\"DELIVERY_BASE_PRICE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE}}</td>\n          <td v-html=\"DELIVERY_PRICE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT}}</td>\n          <td v-html=\"DELIVERY_DISCOUNT_FORMATED\"></td>\n        </tr>\n      </table>\n\n      <h3>{{OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE}}:</h3>\n      <table>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE}}</td>\n          <td v-html=\"SUM_BASE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT}}</td>\n          <td v-html=\"DISCOUNT_VALUE_FORMATED\"></td>\n        </tr>\n        <tr>\n          <td>{{OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE}}</td>\n          <td v-html=\"SUM_FORMATED\"></td>\n        </tr>\n      </table>\n\n      <input type=\"hidden\" name=\"save\" value=\"y\">\n      <br>\n      <button type=\"submit\">{{OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON}}</button>\n      <br>\n      <br>\n    </form>\n\t",
    computed: _objectSpread({}, ui_vue3_pinia.mapState(dataStore, ['SESSION_ID', 'SIGNED_PARAMETERS', 'OPTIONS', 'OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN', 'OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN', 'OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT', 'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT', 'OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE', 'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT', 'OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE', 'OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON'])),
    methods: _objectSpread(_objectSpread({}, ui_vue3_pinia.mapActions(dataStore, [])), {}, {
      loadData: function loadData() {
        var self = this;
        BX.ajax({
          method: 'POST',
          dataType: 'json',
          url: 'https://seller20testing.twpx.ru/bitrix/components/bitrix/sale.order.ajax/ajax.php',
          data: dataStore().OPTIONS,
          onsuccess: BX.delegate(function (result) {
            self.locations = result.locations;
            self.makeData(result.order);
          }, this),
          onfailure: BX.delegate(function () {
            self.endLoader();
          }, this)
        });
      },
      makeData: function makeData(data) {
        console.log(data);
        //pay systems
        this.PAY_SYSTEM_LIST = Object.values(data.PAY_SYSTEM).map(function (pay) {
          return {
            ID: pay.ID,
            SORT: pay.SORT,
            NAME: pay.NAME,
            DESCRIPTION: pay.DESCRIPTION,
            CHECKED: pay.CHECKED,
            SRC: pay.PSA_LOGOTIP_SRC
          };
        });

        //deliveries
        this.DELIVERY_LIST = Object.values(data.DELIVERY).map(function (del) {
          return {
            ID: del.ID,
            SORT: del.SORT,
            NAME: del.NAME,
            DESCRIPTION: del.DESCRIPTION,
            CHECKED: del.CHECKED,
            SRC: del.LOGOTIP_SRC,
            PRICE_FORMATED: del.PRICE_FORMATED,
            FIELD_NAME: del.FIELD_NAME
          };
        });

        //basket
        this.BASKET = Object.values(data.GRID.ROWS).map(function (product) {
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
            PRICE: product.data.PRICE,
            //price with discount
            PRICE_FORMATED: product.data.PRICE_FORMATED,
            //price with discount
            DETAIL_PAGE_URL: product.data.DETAIL_PAGE_URL,
            DISCOUNT_PRICE: product.data.DISCOUNT_PRICE,
            DESCRIPTION: product.data.PREVIEW_TEXT,
            SUM_BASE_FORMATED: product.data.SUM_BASE_FORMATED,
            SUM_FORMATED: product.data.SUM
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
      endLoader: function endLoader() {
        console.log('endLoader');
      }
    })
  };

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  var _store = /*#__PURE__*/new WeakMap();
  var _rootNode = /*#__PURE__*/new WeakMap();
  var _application = /*#__PURE__*/new WeakMap();
  var OrderMake = /*#__PURE__*/function () {
    function OrderMake(rootNode, options) {
      babelHelpers.classCallCheck(this, OrderMake);
      _classPrivateFieldInitSpec(this, _store, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _rootNode, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _application, {
        writable: true,
        value: void 0
      });
      babelHelpers.classPrivateFieldSet(this, _store, ui_vue3_pinia.createPinia());
      babelHelpers.classPrivateFieldSet(this, _rootNode, document.querySelector(rootNode));
      this.options = options;
    }
    babelHelpers.createClass(OrderMake, [{
      key: "run",
      value: function run() {
        var self = this;
        babelHelpers.classPrivateFieldSet(this, _application, ui_vue3.BitrixVue.createApp({
          name: 'Order Application',
          components: {
            Application: Application
          },
          template: '<Application/>',
          mounted: function mounted() {
            if (self.options && babelHelpers["typeof"](self.options) === 'object') {
              Object.keys(self.options).forEach(function (key) {
                dataStore()[key] = self.options[key] || '';
              });
            }
          }
        }));
        babelHelpers.classPrivateFieldGet(this, _application).use(babelHelpers.classPrivateFieldGet(this, _store));
        babelHelpers.classPrivateFieldGet(this, _application).mount(babelHelpers.classPrivateFieldGet(this, _rootNode));
      }
    }, {
      key: "initStorageBeforeStartApplication",
      value: function initStorageBeforeStartApplication() {
        ui_vue3_pinia.setActivePinia(babelHelpers.classPrivateFieldGet(this, _store));
      }
    }, {
      key: "getTableStore",
      value: function getTableStore() {
        return tableStore;
      }
    }]);
    return OrderMake;
  }();

  exports.OrderMake = OrderMake;

}((this.BX = this.BX || {}),BX,BX,BX));
//# sourceMappingURL=application.bundle.js.map
