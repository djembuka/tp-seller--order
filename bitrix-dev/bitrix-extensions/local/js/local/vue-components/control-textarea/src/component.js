import './component.css';

export const ControlTextarea = {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      focused: false,
      blured: false,
      warning: '',
      hint: this.control.hint_external,
    };
  },
  props: ['control', 'id', 'name'],
  // language=Vue
  template: `
		<div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--textarea': true,
      'twpx-form-control--active': active,
      'twpx-form-control--focused': focused,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <img
      :src="disabled"
      class="twpx-form-control__disabled-icon"
      v-if="false"
    />
    <div class="twpx-form-control__label">{{ control.label }}</div>
    <div class="twpx-form-control__textarea">
      <textarea
        :id="controlId"
        :name="controlName"
        v-model="value"
        @focus="focus"
        @blur="blur"
        :disabled="disabled"
        ref="textarea"
        contenteditable="true"
        class="twpx-form-control__textarea-content"
      ></textarea>
    </div>
    <div
      class="twpx-form-control__warning"
      v-html="warning"
      v-if="warning"
    ></div>
    <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
  </div>
	`,
  emits: ['input', 'focus', 'blur', 'enter'],
  computed: {
    value: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });
        //autoheight
        this.$refs.textarea.style.height = 'auto';
        let height = this.$refs.textarea.scrollHeight;
        this.$refs.textarea.style.height = `${height > 100 ? height : 100}px`;
      },
    },
    placeholder() {
      if (this.focused && !this.value.trim()) {
        return this.control.hint_internal;
      } else {
        return '';
      }
    },
    active() {
      return this.focused || !!this.control.value.trim();
    },
    invalid() {
      return this.blured && !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
    validateWatcher() {
      return this.control.validateWatcher;
    },
    focusWatcher() {
      return this.control.focusWatcher;
    },
  },
  watch: {
    validateWatcher() {
      this.blured = true;
    },
    focusWatcher() {
      this.$refs.input.focus();
    },
  },
  methods: {
    focus() {
      this.focused = true;
      this.blured = false;
      this.$emit('focus');
    },
    blur() {
      this.focused = false;
      this.blured = true;
      this.$emit('blur');
    },
    enter() {
      this.$emit('enter');
    },
    validate() {
      if (
        (this.control.required && this.value.trim()) ||
        !this.control.required
      ) {
        if (this.control.regexp) {
          const match = String(this.value.trim()).match(
            RegExp(this.control.regexp)
          );
          if (!match) {
            this.warning = this.control.regexp_description;
          } else {
            this.warning = '';
          }
          return match;
        } else {
          return true;
        }
      } else if (this.control.required && !this.value) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    let height = this.$refs.textarea.scrollHeight;
    this.$refs.textarea.style.height = `${height > 100 ? height : 100}px`;
  },
};
