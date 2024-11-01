/* eslint-disable */
(function (exports,ui_vue3,local_vueComponents_locationComponent,local_vueComponents_controlComponent,local_vueComponents_loaderCircle,local_vueComponents_buttonComponent,local_vueComponents_errorMessage,ui_vue3_pinia) {
  'use strict';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var orderStore = ui_vue3_pinia.defineStore('order', {
    state: function state() {
      return {
        OPTIONS: {},
        controls: {},
        result: {},
        location: {},
        personTypeOld: '',
        loading: false,
        error: '',
        sessid: window.BX.bitrix_sessid()
      };
    },
    getters: {
      formData: function formData(state) {
        var result = {};
        Object.entries(state.controls).forEach(function (entry) {
          entry[1].forEach(function (control) {
            if (entry[0] === 'location' && babelHelpers["typeof"](control.value) === 'object') {
              result[control.name] = control.value.id;
            } else {
              result[control.name] = control.value;
            }
          });
        });
        return result;
      }
    },
    actions: {
      showError: function showError(_ref) {
        var message = _ref.message;
        this.error = message;
      },
      hideError: function hideError() {
        this.showError({
          message: ''
        });
      },
      getSaveData: function getSaveData() {
        return _objectSpread(_objectSpread({}, this.formData), {}, {
          sessid: this.sessid,
          via_ajax: 'Y',
          action: 'saveOrderAjax',
          SITE_ID: this.OPTIONS.siteID,
          signedParamsString: this.OPTIONS.signedParamsString
        });
      },
      sendForm: function sendForm() {
        var _this = this;
        BX.ajax({
          method: 'POST',
          dataType: 'json',
          url: this.OPTIONS.ajaxUrl,
          data: this.getSaveData(),
          onsuccess: function onsuccess(result) {
            console.log('success', result);
            if (result && result.order) {
              if (result.order.REDIRECT_URL) {
                location.href = result.order.REDIRECT_URL;
              } else if (result.order.ERROR && result.order.ERROR.PROPERTY) {
                _this.showError({
                  message: result.order.ERROR.PROPERTY.join('<br>')
                });
              }
            }
          },
          onfailure: function onfailure(error) {
            console.log('failure', error);
          }
        });
      },
      loadData: function loadData() {
        var _this2 = this;
        this.loading = true;
        var self = this;
        BX.ajax({
          method: 'POST',
          dataType: 'json',
          url: this.OPTIONS.ajaxUrl,
          data: this.getData(),
          onsuccess: function onsuccess(result) {
            self.loading = false;
            self.setLoadResult({
              result: result
            });
            self.setPersonTypeOld(self.result.order);
            _this2.createLocation({
              data: self.result.order,
              locations: self.result.locations
            });
            self.createControls(self.result.order);
          },
          onfailure: function onfailure(error) {}
        });
      },
      getData: function getData() {
        return {
          order: this.formData,
          sessid: this.sessid,
          via_ajax: 'Y',
          SITE_ID: this.OPTIONS.siteID,
          signedParamsString: this.OPTIONS.signedParamsString,
          'soa-action': 'refreshOrderAjax'
        };
      },
      changeControlValue: function changeControlValue(_ref2) {
        var control = _ref2.control,
          value = _ref2.value,
          checked = _ref2.checked;
        switch (control.property) {
          case 'text':
          case 'textarea':
            this.changeTextControlValue({
              control: control,
              value: value
            });
            break;
          case 'hint':
            this.changeHintControlValue({
              control: control,
              value: value
            });
            break;
          case 'multiselect':
            this.changeMultiselectValue({
              control: control,
              value: value,
              checked: checked
            });
            break;
          case 'checkbox':
            this.changeCheckboxValue({
              control: control,
              checked: checked
            });
            break;
          case 'select':
            this["changeSelect".concat(control.type.substring(0, 1).toUpperCase()).concat(control.type.substring(1).toLowerCase(), "Value")]({
              control: control,
              value: value
            });
            break;
          case 'file':
            this.changeFileValue({
              control: control,
              value: value
            });
            break;
          case 'date':
            this.changeDateValue({
              control: control,
              value: value
            });
            break;
          case 'color':
            this.changeColorValue({
              control: control,
              value: value
            });
            break;
        }
      },
      changeTextControlValue: function changeTextControlValue(_ref3) {
        var control = _ref3.control,
          value = _ref3.value;
        control.value = value;
      },
      changeHintControlValue: function changeHintControlValue(_ref4) {
        var control = _ref4.control,
          value = _ref4.value;
        control.value = value;
        if (babelHelpers["typeof"](value) === 'object') {
          this.location.last = value;
        }
      },
      changeSelectRadioValue: function changeSelectRadioValue(_ref5) {
        var control = _ref5.control,
          value = _ref5.value;
        control.value = value;
      },
      setLoadResult: function setLoadResult(_ref6) {
        var result = _ref6.result;
        this.result = result;
      },
      setPersonTypeOld: function setPersonTypeOld(data) {
        this.personTypeOld = Object.entries(data.PERSON_TYPE).find(function (entry) {
          return entry[1].CHECKED === 'Y';
        })[0];
      },
      createData: function createData() {
        this.setPersonTypeOld(this.OPTIONS.result);
        this.createLocation({
          data: this.OPTIONS.result,
          locations: this.OPTIONS.locations
        });
        this.createControls();
      },
      createLocation: function createLocation(_ref7) {
        var data = _ref7.data,
          locations = _ref7.locations;
        var id = Object.keys(locations)[0];
        var orderProp = data.ORDER_PROP.properties.find(function (p) {
          return p.IS_LOCATION === 'Y';
        });

        //get location name
        var string = Object.values(locations)[0].output[0];
        var index1 = string.indexOf('pathNames');
        var index2 = string.indexOf('}', index1);
        var sub = string.substring(index1 - 1, index2 + 1);
        var obj = JSON.parse("{".concat(sub.replace(/'/gi, "\""), "}"));
        var name = Object.values(obj.pathNames)[1];
        this.location = {
          label: orderProp.NAME,
          inputId: id,
          last: {
            id: orderProp.VALUE[0],
            value: name
          }
        };
      },
      createControls: function createControls() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.OPTIONS.result;
        //location
        var location = [{
          property: 'hint',
          id: 'twpxOrderLocationId',
          name: "ORDER_PROP_".concat(this.location.inputId),
          value: this.location.last || '',
          count: 3,
          action: 'twinpx:location-hint',
          required: false,
          disabled: false
        }];

        //person type
        var personType = [{
          property: 'select',
          type: 'radio',
          id: 'radioID',
          name: 'PERSON_TYPE',
          label: 'Person types'
        }];
        if (data) {
          personType[0].options = Object.values(data.PERSON_TYPE).map(function (p) {
            return {
              label: p.NAME,
              code: p.ID
            };
          });
        }
        personType[0].value = Object.values(data.PERSON_TYPE).find(function (p) {
          return p.CHECKED === 'Y';
        }).ID;

        //delivery
        var delivery = [{
          property: 'select',
          type: 'radio',
          id: 'ID_DELIVERY_ID_',
          name: 'DELIVERY_ID',
          label: 'Delivery'
        }];
        if (data) {
          delivery[0].options = Object.values(data.DELIVERY).map(function (d) {
            return {
              label: d.NAME,
              code: d.ID
            };
          });
        }
        delivery[0].value = Object.values(data.DELIVERY).find(function (d) {
          return d.CHECKED === 'Y';
        }).ID;

        //paysystem
        var paysystem = [{
          property: 'select',
          type: 'radio',
          id: 'ID_PAY_SYSTEM_ID_',
          name: 'PAY_SYSTEM_ID',
          label: 'Pay system'
        }];
        if (data) {
          paysystem[0].options = Object.values(data.PAY_SYSTEM).map(function (p) {
            return {
              label: p.NAME,
              code: p.ID
            };
          });
        }
        paysystem[0].value = Object.values(data.PAY_SYSTEM).find(function (p) {
          return p.CHECKED === 'Y';
        }).ID;

        //order prors
        var orderProps = [];
        if (data) {
          orderProps = data.ORDER_PROP.properties.map(function (p) {
            var property = 'text';
            if (p.IS_ADDRESS === 'Y') {
              property = 'textarea';
            }
            return {
              property: property,
              id: p.ID,
              name: "ORDER_PROP_".concat(p.ID),
              label: p.NAME,
              value: p.VALUE[0],
              required: p.REQUIRED === 'Y',
              disabled: false
            };
          });
        }
        this.controls = {
          hidden: [{
            property: 'text',
            id: 'sessid',
            name: 'sessid',
            label: 'sessid',
            value: window.BX.bitrix_sessid(),
            required: false,
            disabled: false
          }, {
            property: 'text',
            id: 'soaAction',
            name: 'soa-action',
            label: 'soa-action',
            value: 'saveOrderAjax',
            required: false,
            disabled: false
          }, {
            property: 'text',
            id: 'locationType',
            name: 'location_type',
            label: 'location_type',
            value: 'code',
            required: false,
            disabled: false
          }, {
            property: 'text',
            id: 'BUYER_STORE',
            name: 'BUYER_STORE',
            label: 'BUYER_STORE',
            value: String(data.BUYER_STORE),
            required: false,
            disabled: false
          }, {
            property: 'text',
            id: 'RECENT_DELIVERY_VALUE',
            name: 'RECENT_DELIVERY_VALUE',
            label: 'RECENT_DELIVERY_VALUE',
            value: this.location.last.id,
            required: false,
            disabled: false
          }, {
            property: 'text',
            id: 'PERSON_TYPE_OLD',
            name: 'PERSON_TYPE_OLD',
            label: 'PERSON_TYPE_OLD',
            value: this.personTypeOld,
            required: false,
            disabled: false
          }],
          personType: personType,
          delivery: delivery,
          paysystem: paysystem,
          orderProps: orderProps,
          location: location
        };
      },
      loadLocationHints: function loadLocationHints(_ref8) {
        var control = _ref8.control,
          action = _ref8.action;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        control.loading = true;
        var data = {
          select: {
            1: 'CODE',
            2: 'TYPE_ID',
            VALUE: 'ID',
            DISPLAY: 'NAME.NAME'
          },
          additionals: {
            1: 'PATH'
          },
          filter: {
            '=PHRASE': control.value.forEach ? control.value.value : control.value,
            '=NAME.LANGUAGE_ID': 'ru',
            '=SITE_ID': 's1'
          },
          version: '2',
          PAGE_SIZE: '10',
          PAGE: '0'
        };
        BX.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/bitrix/components/bitrix/sale.location.selector.search/get.php',
          data: data,
          onsuccess: function onsuccess(result) {
            control.loading = false;
            resultFn(result);
          },
          onfailure: function onfailure(error) {
            console.log(error);
          }
        });
        function resultFn(result) {
          if (!result.data || !result.data.ITEMS || !result.data.ITEMS.map) {
            return;
          }
          control.hints = result.data.ITEMS.map(function (obj) {
            return {
              id: obj.CODE,
              value: obj.DISPLAY
            };
          });
          if (callback) {
            callback();
          }
        }
      },
      setLocationHints: function setLocationHints(_ref9) {
        var control = _ref9.control,
          value = _ref9.value;
        control.hints = value;
      }
    }
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var Application = {
    data: function data() {
      return {
        locations: undefined
      };
    },
    components: {
      LocationComponent: local_vueComponents_locationComponent.LocationComponent,
      ControlComponent: local_vueComponents_controlComponent.ControlComponent,
      LoaderCircle: local_vueComponents_loaderCircle.LoaderCircle,
      ButtonComponent: local_vueComponents_buttonComponent.ButtonComponent,
      ErrorMessage: local_vueComponents_errorMessage.ErrorMessage
    },
    // language=Vue

    template: "\n  <LoaderCircle :show=\"loading\" />\n  <ErrorMessage :error=\"error\" @hideError=\"hideError\" />\n  <form id=\"bx-soa-order-form\" ref=\"form\">\n\n    <fieldset>\n      <legend>Person type</legend>\n      <div v-for=\"control in controls.personType\" :key=\"control.id\">\n        <ControlComponent :control=\"control\" @input=\"input\" @hints=\"hints\" />\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Delivery</legend>\n      <div v-for=\"control in controls.delivery\" :key=\"control.id\">\n        <ControlComponent  :control=\"control\" @input=\"input\" @hints=\"hints\" />\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Location</legend>\n      <hr>\n      <div v-for=\"control in controls.location\" :key=\"control.id\">\n        <LocationComponent :control=\"control\" @input=\"input\" @hints=\"locationHints\" />\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Paysystem</legend>\n      <div v-for=\"control in controls.paysystem\" :key=\"control.id\">\n        <ControlComponent :control=\"control\" @input=\"input\" @hints=\"hints\" />\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Order props</legend>\n      <hr>\n      <div v-for=\"(control, index) in controls.orderProps\" :key=\"control.id\">\n        <ControlComponent :control=\"control\" @input=\"input\" @hints=\"hints\" />\n        <hr v-if=\"index + 1 < controls.orderProps.length\">\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Comment</legend>\n      <ControlComponent :control=\"{\n            property: 'textarea',\n            id: 'orderDescription',\n            name: 'ORDER_DESCRIPTION',\n            label: 'Comment',\n            value: '',\n            required: false,\n            disabled: false,\n          }\" @input=\"input\" @hints=\"hints\" />\n    </fieldset>\n\n    <hr>\n\n    <fieldset>\n      <legend>Hidden</legend>\n      <hr>\n      <div style=\"display: grid; gap: 16px; grid-template-columns: repeat(4, 1fr);\">\n        <ControlComponent v-for=\"control in controls.hidden\" :key=\"control.id\" :control=\"control\" @input=\"input\" @hints=\"hints\" />\n      </div>\n    </fieldset>\n\n    <hr>\n\n    <ButtonComponent name=\"\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\" @clickButton=\"clickButton\" />\n\n    <hr>\n    \n  </form>\n  ",
    computed: _objectSpread$1(_objectSpread$1({}, ui_vue3_pinia.mapState(orderStore, ['OPTIONS', 'controls', 'loading', 'error'])), {}, {
      LOCATION: function LOCATION() {
        if (this.OPTIONS.locations) {
          return Object.values(this.OPTIONS.locations)[0].lastValue;
        }
      }
    }),
    methods: _objectSpread$1(_objectSpread$1({}, ui_vue3_pinia.mapActions(orderStore, ['changeControlValue', 'loadData', 'loadLocationHints', 'setLocationHints', 'sendForm', 'hideError'])), {}, {
      clickButton: function clickButton() {
        this.sendForm();
      },
      input: function input(attrs) {
        this.changeControlValue(attrs);
        if (attrs.control.type === 'radio' || attrs.control.property === 'hint' && babelHelpers["typeof"](attrs.control.value) === 'object') {
          this.loadData();
        }
      },
      locationHints: function locationHints(_ref) {
        var type = _ref.type,
          control = _ref.control,
          action = _ref.action,
          value = _ref.value;
        switch (type) {
          case 'get':
            this.loadLocationHints({
              control: control,
              action: action
            });
            break;
          case 'set':
            this.setLocationHints({
              control: control,
              value: value
            });
            break;
        }
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
                orderStore()[key] = self.options[key] || '';
              });
            }
            orderStore().createData();
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
      key: "getOrderStore",
      value: function getOrderStore() {
        return orderStore;
      }
    }]);
    return OrderMake;
  }();

  exports.OrderMake = OrderMake;

}((this.BX = this.BX || {}),BX,BX,BX.Controls,BX.Loaders,BX.Buttons,BX.AAS,BX));
//# sourceMappingURL=application.bundle.js.map
