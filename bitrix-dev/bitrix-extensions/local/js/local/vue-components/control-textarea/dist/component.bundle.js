/* eslint-disable */
this.BX = this.BX || {};
(function (exports) {
  'use strict';

  var ControlTextarea = {
    data: function data() {
      return {
        controlId: this.id || this.control.id || null,
        controlName: this.name || this.control.name || null,
        focused: false,
        blured: false,
        warning: '',
        hint: this.control.hint_external
      };
    },
    props: ['control', 'id', 'name'],
    // language=Vue
    template: "\n\t\t<div\n    :class=\"{\n      'twpx-form-control': true,\n      'twpx-form-control--textarea': true,\n      'twpx-form-control--active': active,\n      'twpx-form-control--focused': focused,\n      'twpx-form-control--invalid': invalid,\n      'twpx-form-control--disabled': disabled,\n    }\"\n  >\n    <img\n      :src=\"disabled\"\n      class=\"twpx-form-control__disabled-icon\"\n      v-if=\"false\"\n    />\n    <div class=\"twpx-form-control__label\">{{ control.label }}</div>\n    <div class=\"twpx-form-control__textarea\">\n      <textarea\n        :id=\"controlId\"\n        :name=\"controlName\"\n        v-model=\"value\"\n        @focus=\"focus\"\n        @blur=\"blur\"\n        :disabled=\"disabled\"\n        ref=\"textarea\"\n        contenteditable=\"true\"\n        class=\"twpx-form-control__textarea-content\"\n      ></textarea>\n    </div>\n    <div\n      class=\"twpx-form-control__warning\"\n      v-html=\"warning\"\n      v-if=\"warning\"\n    ></div>\n    <div class=\"twpx-form-control__hint\" v-html=\"hint\" v-if=\"hint\"></div>\n  </div>\n\t",
    emits: ['input', 'focus', 'blur', 'enter'],
    computed: {
      value: {
        get: function get() {
          return this.control.value;
        },
        set: function set(value) {
          this.$emit('input', {
            value: value
          });
          //autoheight
          this.$refs.textarea.style.height = 'auto';
          var height = this.$refs.textarea.scrollHeight;
          this.$refs.textarea.style.height = "".concat(height > 100 ? height : 100, "px");
        }
      },
      placeholder: function placeholder() {
        if (this.focused && !this.value.trim()) {
          return this.control.hint_internal;
        } else {
          return '';
        }
      },
      active: function active() {
        return this.focused || !!this.control.value.trim();
      },
      invalid: function invalid() {
        return this.blured && !this.validate();
      },
      disabled: function disabled() {
        return this.control.disabled;
      },
      validateWatcher: function validateWatcher() {
        return this.control.validateWatcher;
      },
      focusWatcher: function focusWatcher() {
        return this.control.focusWatcher;
      }
    },
    watch: {
      validateWatcher: function validateWatcher() {
        this.blured = true;
      },
      focusWatcher: function focusWatcher() {
        this.$refs.input.focus();
      }
    },
    methods: {
      focus: function focus() {
        this.focused = true;
        this.blured = false;
        this.$emit('focus');
      },
      blur: function blur() {
        this.focused = false;
        this.blured = true;
        this.$emit('blur');
      },
      enter: function enter() {
        this.$emit('enter');
      },
      validate: function validate() {
        if (this.control.required && this.value.trim() || !this.control.required) {
          if (this.control.regexp) {
            var match = String(this.value.trim()).match(RegExp(this.control.regexp));
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
      }
    },
    mounted: function mounted() {
      var height = this.$refs.textarea.scrollHeight;
      this.$refs.textarea.style.height = "".concat(height > 100 ? height : 100, "px");
    }
  };

  exports.ControlTextarea = ControlTextarea;

}((this.BX.Controls = this.BX.Controls || {})));
//# sourceMappingURL=component.bundle.js.map