import './application.css';

import { LocationComponent } from 'local.vue-components.location-component';
import { ControlComponent } from 'local.vue-components.control-component';
import { LoaderCircle } from 'local.vue-components.loader-circle';

import { mapState, mapActions } from 'ui.vue3.pinia';
import { orderStore } from '../stores/order';

export const Application = {
  data() {
    return {
      locations: undefined,
    };
  },
  components: { LocationComponent, ControlComponent, LoaderCircle },
  // language=Vue

  template: `
  <LoaderCircle :show="loading" />
  <form id="bx-soa-order-form" ref="form">

    <fieldset>
      <legend>Person type</legend>
      <div v-for="control in controls.personType" :key="control.id">
        <ControlComponent :control="control" @input="input" @hints="hints" />
      </div>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Delivery</legend>
      <div v-for="control in controls.delivery" :key="control.id">
        <ControlComponent  :control="control" @input="input" @hints="hints" />
      </div>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Location</legend>
      <hr>
      <div v-for="control in controls.location" :key="control.id">
        <LocationComponent :control="control" @input="input" @hints="locationHints" />
      </div>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Paysystem</legend>
      <div v-for="control in controls.paysystem" :key="control.id">
        <ControlComponent :control="control" @input="input" @hints="hints" />
      </div>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Order props</legend>
      <hr>
      <div v-for="(control, index) in controls.orderProps" :key="control.id">
        <ControlComponent :control="control" @input="input" @hints="hints" />
        <hr v-if="index + 1 < controls.orderProps.length">
      </div>
    </fieldset>

    <hr>

    <fieldset>
      <legend>Comment</legend>
      <ControlComponent :control="{
            property: 'textarea',
            id: 'orderDescription',
            name: 'ORDER_DESCRIPTION',
            label: 'Comment',
            value: '',
            required: false,
            disabled: false,
          }" @input="input" @hints="hints" />
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
    ...mapState(orderStore, ['OPTIONS', 'controls', 'loading']),
    LOCATION() {
      if (this.OPTIONS.locations) {
        return Object.values(this.OPTIONS.locations)[0].lastValue;
      }
    },
  },
  methods: {
    ...mapActions(orderStore, [
      'changeControlValue',
      'loadData',
      'loadLocationHints',
      'setLocationHints',
    ]),
    input(attrs) {
      this.changeControlValue(attrs);

      if (
        attrs.control.type === 'radio' ||
        (attrs.control.property === 'hint' &&
          typeof attrs.control.value === 'object')
      ) {
        this.loadData();
      }
    },
    locationHints({ type, control, action, value }) {
      switch (type) {
        case 'get':
          this.loadLocationHints({
            control,
            action,
          });
          break;
        case 'set':
          this.setLocationHints({
            control,
            value,
          });
          break;
      }
    },
  },
};
