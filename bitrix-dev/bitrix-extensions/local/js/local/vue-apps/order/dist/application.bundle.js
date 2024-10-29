/* eslint-disable */
(function (
  exports,
  ui_vue3,
  local_vueComponents_locationComponent,
  local_vueComponents_controlComponent,
  ui_vue3_pinia
) {
  'use strict';

  var orderStore = ui_vue3_pinia.defineStore('order', {
    state: function state() {
      return {
        OPTIONS: {},
        controls: {},
      };
    },
    actions: {
      changeControlValue: function changeControlValue(_ref) {
        var control = _ref.control,
          value = _ref.value,
          checked = _ref.checked;
        switch (control.property) {
          case 'text':
          case 'textarea':
            this.changeTextControlValue({
              control: control,
              value: value,
            });
            break;
          case 'multiselect':
            this.changeMultiselectValue({
              control: control,
              value: value,
              checked: checked,
            });
            break;
          case 'checkbox':
            this.changeCheckboxValue({
              control: control,
              checked: checked,
            });
            break;
          case 'select':
            this[
              'changeSelect'
                .concat(control.type.substring(0, 1).toUpperCase())
                .concat(control.type.substring(1).toLowerCase(), 'Value')
            ]({
              control: control,
              value: value,
            });
            break;
          case 'file':
            this.changeFileValue({
              control: control,
              value: value,
            });
            break;
          case 'date':
            this.changeDateValue({
              control: control,
              value: value,
            });
            break;
          case 'color':
            this.changeColorValue({
              control: control,
              value: value,
            });
            break;
        }
      },
      changeTextControlValue: function changeTextControlValue(_ref2) {
        var control = _ref2.control,
          value = _ref2.value;
        control.value = value;
      },
      changeSelectRadioValue: function changeSelectRadioValue(_ref3) {
        var control = _ref3.control,
          value = _ref3.value;
        console.log(control, value);
        control.value = value;
      },
      setOptions: function setOptions(_ref4) {
        var options = _ref4.options;
        this.OPTIONS = options;
      },
      createControls: function createControls() {
        //person type
        var personType = {
          property: 'select',
          type: 'radio',
          id: 'radioID',
          name: 'PERSON_TYPE',
          label: 'Person types',
        };
        if (this.OPTIONS.result) {
          personType.options = Object.values(
            this.OPTIONS.result.PERSON_TYPE
          ).map(function (p) {
            return {
              label: p.NAME,
              code: p.ID,
            };
          });
        }
        personType.value = Object.values(this.OPTIONS.result.PERSON_TYPE).find(
          function (p) {
            return p.CHECKED === 'Y';
          }
        ).ID;

        //delivery
        var delivery = {
          property: 'select',
          type: 'radio',
          id: 'ID_DELIVERY_ID_',
          name: 'DELIVERY_ID',
          label: 'Delivery',
        };
        if (this.OPTIONS.result) {
          delivery.options = Object.values(this.OPTIONS.result.DELIVERY).map(
            function (d) {
              return {
                label: d.NAME,
                code: d.ID,
              };
            }
          );
        }
        delivery.value = Object.values(this.OPTIONS.result.DELIVERY).find(
          function (d) {
            return d.CHECKED === 'Y';
          }
        ).ID;

        //paysystem
        var paysystem = {
          property: 'select',
          type: 'radio',
          id: 'ID_PAY_SYSTEM_ID_',
          name: 'PAY_SYSTEM_ID',
          label: 'Pay system',
        };
        if (this.OPTIONS.result) {
          paysystem.options = Object.values(this.OPTIONS.result.PAY_SYSTEM).map(
            function (p) {
              return {
                label: p.NAME,
                code: p.ID,
              };
            }
          );
        }
        paysystem.value = Object.values(this.OPTIONS.result.PAY_SYSTEM).find(
          function (p) {
            return p.CHECKED === 'Y';
          }
        ).ID;

        //order prors
        var orderProps = [];
        if (this.OPTIONS.result) {
          orderProps = this.OPTIONS.result.ORDER_PROP.properties.map(function (
            p
          ) {
            return {
              property: 'text',
              id: p.ID,
              name: p.CODE,
              label: p.NAME,
              value: p.VALUE[0],
              required: false,
              disabled: false,
            };
          });
        }
        this.controls = {
          hidden: [
            {
              property: 'text',
              id: 'sessid',
              name: 'sessid',
              label: 'sessid',
              value: window.BX.bitrix_sessid(),
              required: false,
              disabled: false,
            },
            {
              property: 'text',
              id: 'soaAction',
              name: 'soa-action',
              label: 'soa-action',
              value: 'saveOrderAjax',
              required: false,
              disabled: false,
            },
            {
              property: 'text',
              id: 'locationType',
              name: 'location_type',
              label: 'location_type',
              value: 'code',
              required: false,
              disabled: false,
            },
            {
              property: 'text',
              id: 'BUYER_STORE',
              name: 'BUYER_STORE',
              label: 'BUYER_STORE',
              value: 'BUYER_STORE',
              required: false,
              disabled: false,
            },
          ],
          personType: personType,
          delivery: delivery,
          paysystem: paysystem,
          orderProps: orderProps,
        };
        console.log(this.controls);
      },
    },
  });

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            babelHelpers.defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  var Application = {
    data: function data() {
      return {
        locations: undefined,
        order: undefined,
        sessid: window.BX.bitrix_sessid(),
      };
    },
    components: {
      LocationComponent:
        local_vueComponents_locationComponent.LocationComponent,
      ControlComponent: local_vueComponents_controlComponent.ControlComponent,
    },
    // language=Vue

    template:
      '\n  <form id="bx-soa-order-form" ref="form">\n\n    <fieldset>\n      <legend>Person type</legend>\n      <ControlComponent v-if="controls.personType" :control="controls.personType" @input="input" @hints="hints" />\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Delivery</legend>\n      <ControlComponent v-if="controls.delivery" :control="controls.delivery" @input="input" @hints="hints" />\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Location</legend>\n      <input type="text" autocomplete="off" name="ORDER_PROP_6" :value="LOCATION" class="dropdown-field" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 ..." wfd-invisible="true" style="display: none;">\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Paysystem</legend>\n      <ControlComponent v-if="controls.paysystem" :control="controls.paysystem" @input="input" @hints="hints" />\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Order props</legend>\n      <hr>\n      <div v-for="control in controls.orderProps" :key="control.id">\n        <ControlComponent :control="control" @input="input" @hints="hints" />\n        <hr>\n      </div>\n      <textarea id="orderDescription" cols="4" class="form-control bx-soa-customer-textarea bx-ios-fix" name="ORDER_DESCRIPTION"></textarea>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Hidden</legend>\n      <hr>\n      <div style="display: grid; gap: 16px; grid-template-columns: repeat(4, 1fr);">\n        <ControlComponent v-for="control in controls.hidden" :key="control.id" :control="control" @input="input" @hints="hints" />\n      </div>\n    </fieldset>\n\n    <hr>\n    \n  </form>\n  ',
    computed: _objectSpread(
      _objectSpread(
        {},
        ui_vue3_pinia.mapState(orderStore, ['OPTIONS', 'controls'])
      ),
      {},
      {
        LOCATION: function LOCATION() {
          if (this.OPTIONS.locations) {
            return Object.values(this.OPTIONS.locations)[0].lastValue;
          }
        },
      }
    ),
    methods: _objectSpread(
      _objectSpread(
        {},
        ui_vue3_pinia.mapActions(orderStore, [
          'changeControlValue',
          'setOptions',
        ])
      ),
      {},
      {
        input: function input(attrs) {
          this.changeControlValue(attrs);
        },
        changeDelivery: function changeDelivery() {
          this.ajax();
        },
        changePaysystem: function changePaysystem() {
          this.ajax();
        },
        makeData: function makeData(data) {
          //pay systems
          this.PAY_SYSTEM_LIST = Object.values(data.PAY_SYSTEM).map(function (
            pay
          ) {
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
          this.DELIVERY_LIST = Object.values(data.DELIVERY).map(function (del) {
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
          this.DELIVERY_BASE_PRICE_FORMATED =
            data.TOTAL.DELIVERY_PRICE_FORMATED;
          this.DISCOUNT_PRICE_FORMATED = data.TOTAL.DISCOUNT_PRICE_FORMATED;
          this.SUM_BASE_FORMATED = data.TOTAL.PRICE_WITHOUT_DISCOUNT;
          this.SUM_FORMATED = data.TOTAL.ORDER_PRICE_FORMATED;
        },
        endLoader: function endLoader() {
          console.log('endLoader');
        },
        getData: function getData() {
          var order = {};
          new FormData(this.$refs.form).forEach(function (value, key) {
            return (order[key] = value);
          });
          return {
            order: order,
            sessid: this.sessid,
            via_ajax: 'Y',
            SITE_ID: this.OPTIONS.siteID,
            signedParamsString: this.OPTIONS.signedParamsString,
            'soa-action': 'refreshOrderAjax',
          };
        },
        ajax: function ajax() {
          var _this = this;
          BX.ajax({
            method: 'POST',
            dataType: 'json',
            url: this.OPTIONS.ajaxUrl,
            data: this.getData(),
            onsuccess: function onsuccess(result) {
              _this.setOptions({
                options: result,
              });
            },
            onfailure: function onfailure(error) {},
          });
        },
      }
    ),
  };

  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError(
        'Cannot initialize the same private elements twice on an object'
      );
    }
  }
  var _store = /*#__PURE__*/ new WeakMap();
  var _rootNode = /*#__PURE__*/ new WeakMap();
  var _application = /*#__PURE__*/ new WeakMap();
  var OrderMake = /*#__PURE__*/ (function () {
    function OrderMake(rootNode, options) {
      babelHelpers.classCallCheck(this, OrderMake);
      _classPrivateFieldInitSpec(this, _store, {
        writable: true,
        value: void 0,
      });
      _classPrivateFieldInitSpec(this, _rootNode, {
        writable: true,
        value: void 0,
      });
      _classPrivateFieldInitSpec(this, _application, {
        writable: true,
        value: void 0,
      });
      babelHelpers.classPrivateFieldSet(
        this,
        _store,
        ui_vue3_pinia.createPinia()
      );
      babelHelpers.classPrivateFieldSet(
        this,
        _rootNode,
        document.querySelector(rootNode)
      );
      this.options = options;
    }
    babelHelpers.createClass(OrderMake, [
      {
        key: 'run',
        value: function run() {
          var self = this;
          babelHelpers.classPrivateFieldSet(
            this,
            _application,
            ui_vue3.BitrixVue.createApp({
              name: 'Order Application',
              components: {
                Application: Application,
              },
              template: '<Application/>',
              mounted: function mounted() {
                if (
                  self.options &&
                  babelHelpers['typeof'](self.options) === 'object'
                ) {
                  Object.keys(self.options).forEach(function (key) {
                    orderStore()[key] = self.options[key] || '';
                  });
                }
                orderStore().createControls();
              },
            })
          );
          babelHelpers
            .classPrivateFieldGet(this, _application)
            .use(babelHelpers.classPrivateFieldGet(this, _store));
          babelHelpers
            .classPrivateFieldGet(this, _application)
            .mount(babelHelpers.classPrivateFieldGet(this, _rootNode));
        },
      },
      {
        key: 'initStorageBeforeStartApplication',
        value: function initStorageBeforeStartApplication() {
          ui_vue3_pinia.setActivePinia(
            babelHelpers.classPrivateFieldGet(this, _store)
          );
        },
      },
      {
        key: 'getOrderStore',
        value: function getOrderStore() {
          return orderStore;
        },
      },
    ]);
    return OrderMake;
  })();

  exports.OrderMake = OrderMake;
})((this.BX = this.BX || {}), BX.Vue3, BX, BX.Controls, BX.Vue3.Pinia); //# sourceMappingURL=application.bundle.js.map
