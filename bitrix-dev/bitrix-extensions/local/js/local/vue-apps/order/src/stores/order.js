import { defineStore } from 'ui.vue3.pinia';

export const orderStore = defineStore('order', {
  state: () => ({
    OPTIONS: {},
    controls: {},
  }),
  actions: {
    changeControlValue({ control, value, checked }) {
      switch (control.property) {
        case 'text':
        case 'textarea':
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
      console.log(control, value);
      control.value = value;
    },
    setOptions({ options }) {
      this.OPTIONS = options;
    },
    createControls() {
      //person type
      const personType = {
        property: 'select',
        type: 'radio',
        id: 'radioID',
        name: 'PERSON_TYPE',
        label: 'Person types',
      };
      if (this.OPTIONS.result) {
        personType.options = Object.values(this.OPTIONS.result.PERSON_TYPE).map(
          (p) => {
            return {
              label: p.NAME,
              code: p.ID,
            };
          }
        );
      }
      personType.value = Object.values(this.OPTIONS.result.PERSON_TYPE).find(
        (p) => p.CHECKED === 'Y'
      ).ID;

      //delivery
      const delivery = {
        property: 'select',
        type: 'radio',
        id: 'ID_DELIVERY_ID_',
        name: 'DELIVERY_ID',
        label: 'Delivery',
      };
      if (this.OPTIONS.result) {
        delivery.options = Object.values(this.OPTIONS.result.DELIVERY).map(
          (d) => {
            return {
              label: d.NAME,
              code: d.ID,
            };
          }
        );
      }
      delivery.value = Object.values(this.OPTIONS.result.DELIVERY).find(
        (d) => d.CHECKED === 'Y'
      ).ID;

      //paysystem
      const paysystem = {
        property: 'select',
        type: 'radio',
        id: 'ID_PAY_SYSTEM_ID_',
        name: 'PAY_SYSTEM_ID',
        label: 'Pay system',
      };
      if (this.OPTIONS.result) {
        paysystem.options = Object.values(this.OPTIONS.result.PAY_SYSTEM).map(
          (p) => {
            return {
              label: p.NAME,
              code: p.ID,
            };
          }
        );
      }
      paysystem.value = Object.values(this.OPTIONS.result.PAY_SYSTEM).find(
        (p) => p.CHECKED === 'Y'
      ).ID;

      //order prors
      let orderProps = [];

      if (this.OPTIONS.result) {
        orderProps = this.OPTIONS.result.ORDER_PROP.properties.map((p) => {
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
        personType,
        delivery,
        paysystem,
        orderProps,
      };

      console.log(this.controls);
    },
  },
});
