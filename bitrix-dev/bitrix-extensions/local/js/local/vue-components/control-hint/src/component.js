import './component.css';

export const ControlHint = {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      focused: false,
      blured: false,
      warning: '',
      hint: this.control.hint_external,

      activeHintItem: {},
      activeHintArray: [],
      hover: false,
      compare: this.controlValue,
    };
  },
  props: ['control', 'id', 'name'],
  // language=Vue
  template: `
		<div
      :class="{
        'twpx-form-control': true,
        'twpx-form-control--hint': true,
        'twpx-form-control--active': active,
        'twpx-form-control--invalid': invalid,
        'twpx-form-control--disabled': disabled,
      }"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
    >
      <img
        :src="disabled"
        class="twpx-form-control__disabled-icon"
        v-if="false"
      />

      <div class="twpx-form-control__label">{{ control.label }}</div>
      
      <input
        type="text"
        :id="controlId"
        :name="controlName"
        v-model="controlValue"
        @focus="focus"
        @blur="blur"
        @keydown.enter.prevent="enterInput"
        @keydown.up.prevent="upArrow()"
        @keydown.down.prevent="downArrow()"
        :disabled="disabled"
        ref="input"
        autocomplete="off"
        :placeholder="placeholder"
        class="twpx-form-control__input"
      />

      <div class="twpx-form-control-clear" @click.prevent="clearInput()" v-show="isClearable"></div>
      <div class="twpx-form-control-loader" v-show="isLoading"></div>

      <div class="twpx-form-control__list" v-if="hintItems.length">
        <div v-for="(hint, index) in hintItems" :data-id="hint.id" :data-value="hint.value" :class="{active: activeHintArray[index]}" class="twpx-form-control__list__item" @click.prevent="clickHint(hint)">{{ hint.value }}</div>
      </div>

      <div
        class="twpx-form-control__warning"
        v-html="warning"
        v-if="warning"
      ></div>

      <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
    </div>
	`,
  emits: ['input', 'focus', 'blur', 'enter', 'hints'],
  computed: {
    hintItems() {
      return this.control.hints || [];
    },
    placeholder() {
      if (this.focused && (!this.controlValue || !this.controlValue.trim())) {
        return this.control.hint_internal;
      } else {
        return '';
      }
    },
    active() {
      return this.focused || !!this.controlValue.trim();
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
    isClearable() {
      return this.controlValue !== '' && this.hover && !this.isLoading
        ? true
        : false;
    },
    isLoading() {
      return this.control.loading;
    },
    controlValue: {
      get() {
        if (typeof this.control.value === 'object') {
          return this.control.value.value;
        }
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });

        if (this.controlValue.length >= this.control.count) {
          this.$emit('hints', { type: 'get', action: this.control.action });
        } else {
          this.$emit('hints', { type: 'set', value: [] });
        }
      },
    },
  },
  watch: {
    hintItems() {
      this.activeHintArray = this.hintItems.map(() => null);
    },
    validateWatcher() {
      this.blured = true;
    },
    focusWatcher() {
      this.$refs.input.focus();
    },
  },
  methods: {
    mouseenter() {
      this.hover = true;
    },
    mouseleave() {
      this.hover = false;
    },
    clearInput() {
      this.$emit('input', { value: '' });
    },
    enterInput() {
      this.$emit('input', { value: this.activeHintItem });
      this.$emit('hints', { type: 'set', value: [] });
      this.$emit('enter');
    },
    clickHint(hint) {
      this.activeHintItem = hint || {};
      this.$emit('input', { value: this.activeHintItem });
      this.$emit('hints', { type: 'set', value: [] });
      this.mouseleave();

      // this.validate();
    },
    upArrow() {
      let activeIndex = this.activeHintArray.indexOf(true);
      let arr = this.activeHintArray.map((elem) => null);

      if (--activeIndex < 0) {
        activeIndex = this.activeHintArray.length - 1;
      }
      arr[activeIndex] = true;
      this.activeHintArray = arr;
      this.activeHintItem = this.hintItems[activeIndex] || {};
    },
    downArrow() {
      let activeIndex = this.activeHintArray.indexOf(true);
      let arr = this.activeHintArray.map((elem) => null);

      if (++activeIndex > this.activeHintArray.length - 1) {
        activeIndex = 0;
      }
      arr[activeIndex] = true;
      this.activeHintArray = arr;
      this.activeHintItem = this.hintItems[activeIndex] || {};
    },
    focus() {
      this.focused = true;
      this.blured = false;

      this.compare = this.controlValue;
      this.$emit('focus');
    },
    blur() {
      this.focused = false;
      this.blured = true;

      setTimeout(() => {
        if (typeof this.control.value !== 'object') {
          this.controlValue = '';
        }
        this.$emit('hints', { type: 'set', value: [] });
      }, 200);

      this.$emit('blur');

      // setTimeout(() => {
      //   this.validate();
      // }, 100);

      // if (this.controlValue !== this.compare) {
      //   this.$emit('autosave');
      //   bitrixLogs(6, `${this.formControl.label}: ${this.controlValue}`);
      // }
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
};
