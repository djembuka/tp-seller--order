import { defineStore } from 'ui.vue3.pinia';

export const orderStore = defineStore('order', {
  state: () => ({
    OPTIONS: {},
    controls: {},
    result: {},
    loading: false,
    sessid: window.BX.bitrix_sessid(),
  }),
  getters: {
    formData(state) {
      const result = {};

      Object.entries(state.controls).forEach((entry) => {
        entry[1].forEach((control) => {
          if (entry[0] === 'location' && typeof control.value === 'object') {
            result[control.name] = control.value.id;
          } else {
            result[control.name] = control.value;
          }
        });
      });

      return result;
    },
  },
  actions: {
    loadData() {
      this.loading = true;

      const self = this;

      BX.ajax({
        method: 'POST',
        dataType: 'json',
        url: this.OPTIONS.ajaxUrl,
        data: this.getData(),
        onsuccess: (result) => {
          self.loading = false;
          self.setLoadResult({ result });
        },
        onfailure: (error) => {},
      });
    },
    getData() {
      return {
        order: this.formData,
        sessid: this.sessid,
        via_ajax: 'Y',
        SITE_ID: this.OPTIONS.siteID,
        signedParamsString: this.OPTIONS.signedParamsString,
        'soa-action': 'refreshOrderAjax',
      };
    },
    changeControlValue({ control, value, checked }) {
      switch (control.property) {
        case 'text':
        case 'textarea':
        case 'hint':
          this.changeTextControlValue({ control, value });
          break;
        case 'multiselect':
          this.changeMultiselectValue({ control, value, checked });
          break;
        case 'checkbox':
          this.changeCheckboxValue({ control, checked });
          break;
        case 'select':
          this[
            `changeSelect${control.type
              .substring(0, 1)
              .toUpperCase()}${control.type.substring(1).toLowerCase()}Value`
          ]({ control, value });
          break;
        case 'file':
          this.changeFileValue({ control, value });
          break;
        case 'date':
          this.changeDateValue({ control, value });
          break;
        case 'color':
          this.changeColorValue({ control, value });
          break;
      }
    },
    changeTextControlValue({ control, value }) {
      control.value = value;
    },
    changeSelectRadioValue({ control, value }) {
      control.value = value;
    },
    setLoadResult({ result }) {
      this.result = result;
      this.createControls(this.result.order);
    },
    createControls(data = this.OPTIONS.result) {
      //location
      const location = [
        {
          property: 'hint',
          id: 'twpxOrderLocationId',
          name: 'ORDER_PROP_6',
          value: '',
          count: 3,
          action: 'twinpx:location-hint',
          required: false,
          disabled: false,
        },
      ];

      //person type
      const personType = [
        {
          property: 'select',
          type: 'radio',
          id: 'radioID',
          name: 'PERSON_TYPE',
          label: 'Person types',
        },
      ];
      if (data) {
        personType[0].options = Object.values(data.PERSON_TYPE).map((p) => {
          return {
            label: p.NAME,
            code: p.ID,
          };
        });
      }
      personType[0].value = Object.values(data.PERSON_TYPE).find(
        (p) => p.CHECKED === 'Y'
      ).ID;

      //delivery
      const delivery = [
        {
          property: 'select',
          type: 'radio',
          id: 'ID_DELIVERY_ID_',
          name: 'DELIVERY_ID',
          label: 'Delivery',
        },
      ];
      if (data) {
        delivery[0].options = Object.values(data.DELIVERY).map((d) => {
          return {
            label: d.NAME,
            code: d.ID,
          };
        });
      }
      delivery[0].value = Object.values(data.DELIVERY).find(
        (d) => d.CHECKED === 'Y'
      ).ID;

      //paysystem
      const paysystem = [
        {
          property: 'select',
          type: 'radio',
          id: 'ID_PAY_SYSTEM_ID_',
          name: 'PAY_SYSTEM_ID',
          label: 'Pay system',
        },
      ];
      if (data) {
        paysystem[0].options = Object.values(data.PAY_SYSTEM).map((p) => {
          return {
            label: p.NAME,
            code: p.ID,
          };
        });
      }
      paysystem[0].value = Object.values(data.PAY_SYSTEM).find(
        (p) => p.CHECKED === 'Y'
      ).ID;

      //order prors
      let orderProps = [];

      if (data) {
        orderProps = data.ORDER_PROP.properties.map((p) => {
          let property = 'text';
          if (p.IS_ADDRESS === 'Y') {
            property = 'textarea';
          }
          return {
            property,
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
        personType,
        delivery,
        paysystem,
        orderProps,
        location,
      };
    },
    loadLocationHints({ control, action }, callback = () => {}) {
      control.loading = true;

      const data = {
        select: {
          1: 'CODE',
          2: 'TYPE_ID',
          VALUE: 'ID',
          DISPLAY: 'NAME.NAME',
        },
        additionals: {
          1: 'PATH',
        },
        filter: {
          '=PHRASE': control.value.forEach
            ? control.value.value
            : control.value,
          '=NAME.LANGUAGE_ID': 'ru',
          '=SITE_ID': 's1',
        },
        version: '2',
        PAGE_SIZE: '10',
        PAGE: '0',
      };

      BX.ajax({
        method: 'POST',
        dataType: 'json',
        url: '/bitrix/components/bitrix/sale.location.selector.search/get.php',
        data,
        onsuccess: (result) => {
          control.loading = false;
          resultFn(result);
        },
        onfailure: (error) => {
          console.log(error);
        },
      });

      function resultFn(result) {
        if (!result.data || !result.data.ITEMS || !result.data.ITEMS.map) {
          return;
        }

        control.hints = result.data.ITEMS.map((obj) => {
          return {
            id: obj.CODE,
            value: obj.DISPLAY,
          };
        });

        if (callback) {
          callback();
        }
      }
    },
    setLocationHints({ control, value }) {
      control.hints = value;
    },
  },
});
