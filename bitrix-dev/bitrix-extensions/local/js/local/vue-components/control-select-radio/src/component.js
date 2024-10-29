import './component.css';

export const ControlSelectRadio = {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      hint: this.control.hint_external,
    };
  },
  props: ['control', 'id', 'name'],
  // language=Vue
  template: `
		<div
      :class="{
        'twpx-form-control': true,
        'twpx-form-control--radio': true,
        'twpx-form-control--invalid': invalid,
        'twpx-form-control--disabled': disabled,
      }"
    >
      <label
        class="twpx-form-control__radio"
        v-for="option in control.options"
        :key="option.code"
      >
        <input
          class="with-gap"
          :name="controlName"
          type="radio"
          :value="option.code"
          v-model="checked"
        />
        <span>{{ option.label || '' }}</span>
      </label>
      <div class="twpx-form-control-hint" v-if="hint" v-html="hint"></div>
    </div>
	`,
  emits: ['input'],
  computed: {
    checked: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });
      },
    },
    invalid() {
      return !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    validate() {
      if (
        !this.control.required ||
        (this.control.required && this.control.value)
      ) {
        return true;
      }
      return false;
    },
  },
};
