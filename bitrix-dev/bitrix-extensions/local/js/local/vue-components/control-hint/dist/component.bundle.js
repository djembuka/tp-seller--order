/* eslint-disable */
this.BX = this.BX || {};
(function (exports) {
  'use strict';

  var ControlHint = {
    data: function data() {
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
        compare: this.controlValue
      };
    },
    props: ['control', 'id', 'name'],
    // language=Vue
    template: "\n\t\t<div\n      :class=\"{\n        'twpx-form-control': true,\n        'twpx-form-control--hint': true,\n        'twpx-form-control--active': active,\n        'twpx-form-control--invalid': invalid,\n        'twpx-form-control--disabled': disabled,\n      }\"\n        @mouseenter=\"mouseenter\"\n        @mouseleave=\"mouseleave\"\n    >\n      <img\n        :src=\"disabled\"\n        class=\"twpx-form-control__disabled-icon\"\n        v-if=\"false\"\n      />\n\n      <div class=\"twpx-form-control__label\">{{ control.label }}</div>\n      \n      <input\n        type=\"text\"\n        :id=\"controlId\"\n        :name=\"controlName\"\n        v-model=\"controlValue\"\n        @focus=\"focus\"\n        @blur=\"blur\"\n        @keydown.enter.prevent=\"enterInput\"\n        @keydown.up.prevent=\"upArrow()\"\n        @keydown.down.prevent=\"downArrow()\"\n        :disabled=\"disabled\"\n        ref=\"input\"\n        autocomplete=\"off\"\n        :placeholder=\"placeholder\"\n        class=\"twpx-form-control__input\"\n      />\n\n      <div class=\"twpx-form-control-clear\" @click.prevent=\"clearInput()\" v-show=\"isClearable\"></div>\n      <div class=\"twpx-form-control-loader\" v-show=\"isLoading\"></div>\n\n      <div class=\"b-input-hint\" v-if=\"hintItems.length\">\n        <div v-for=\"(hint, index) in hintItems\" :data-id=\"hint.id\" :data-value=\"hint.value\" :class=\"{active: activeHintArray[index]}\" class=\"b-input-hint__item\" @click.prevent=\"clickHint(hint)\">{{ hint.value }}</div>\n      </div>\n\n      <div\n        class=\"twpx-form-control__warning\"\n        v-html=\"warning\"\n        v-if=\"warning\"\n      ></div>\n\n      <div class=\"twpx-form-control__hint\" v-html=\"hint\" v-if=\"hint\"></div>\n    </div>\n\t",
    emits: ['input', 'focus', 'blur', 'enter', 'hints'],
    computed: {
      hintItems: function hintItems() {
        return this.control.hints || [];
      },
      placeholder: function placeholder() {
        if (this.focused && (!this.controlValue || !this.controlValue.trim())) {
          return this.control.hint_internal;
        } else {
          return '';
        }
      },
      active: function active() {
        return this.focused || !!this.controlValue.trim();
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
      },
      isClearable: function isClearable() {
        return this.controlValue !== '' && this.hover && !this.isLoading ? true : false;
      },
      isLoading: function isLoading() {
        return this.control.loading;
      },
      controlValue: {
        get: function get() {
          if (babelHelpers["typeof"](this.control.value) === 'object') {
            return this.control.value.value;
          }
          return this.control.value;
        },
        set: function set(value) {
          this.$emit('input', {
            value: value
          });
          if (this.controlValue.length >= this.control.count) {
            this.$emit('hints', {
              type: 'get',
              action: this.control.action
            });
          } else {
            this.$emit('hints', {
              type: 'set',
              value: []
            });
          }
        }
      }
    },
    watch: {
      hintItems: function hintItems() {
        this.activeHintArray = this.hintItems.map(function () {
          return null;
        });
      },
      validateWatcher: function validateWatcher() {
        this.blured = true;
      },
      focusWatcher: function focusWatcher() {
        this.$refs.input.focus();
      }
    },
    methods: {
      mouseenter: function mouseenter() {
        this.hover = true;
      },
      mouseleave: function mouseleave() {
        this.hover = false;
      },
      clearInput: function clearInput() {
        this.$emit('input', {
          value: ''
        });
      },
      enterInput: function enterInput() {
        this.$emit('input', {
          value: this.activeHintItem
        });
        this.$emit('hints', {
          type: 'set',
          value: []
        });
        this.$emit('enter');
      },
      clickHint: function clickHint(hint) {
        this.activeHintItem = hint || {};
        this.$emit('input', {
          value: this.activeHintItem
        });
        this.$emit('hints', {
          type: 'set',
          value: []
        });
        this.mouseleave();

        // this.validate();
      },
      upArrow: function upArrow() {
        var activeIndex = this.activeHintArray.indexOf(true);
        var arr = this.activeHintArray.map(function (elem) {
          return null;
        });
        if (--activeIndex < 0) {
          activeIndex = this.activeHintArray.length - 1;
        }
        arr[activeIndex] = true;
        this.activeHintArray = arr;
        this.activeHintItem = this.hintItems[activeIndex] || {};
      },
      downArrow: function downArrow() {
        var activeIndex = this.activeHintArray.indexOf(true);
        var arr = this.activeHintArray.map(function (elem) {
          return null;
        });
        if (++activeIndex > this.activeHintArray.length - 1) {
          activeIndex = 0;
        }
        arr[activeIndex] = true;
        this.activeHintArray = arr;
        this.activeHintItem = this.hintItems[activeIndex] || {};
      },
      focus: function focus() {
        this.focused = true;
        this.blured = false;
        this.compare = this.controlValue;
        this.$emit('focus');
      },
      blur: function blur() {
        var _this = this;
        this.focused = false;
        this.blured = true;
        setTimeout(function () {
          if (babelHelpers["typeof"](_this.control.value) !== 'object') {
            _this.controlValue = '';
          }
          _this.$emit('hints', {
            type: 'set',
            value: []
          });
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
    }
  };

  exports.ControlHint = ControlHint;

}((this.BX.Controls = this.BX.Controls || {})));
//# sourceMappingURL=component.bundle.js.map
