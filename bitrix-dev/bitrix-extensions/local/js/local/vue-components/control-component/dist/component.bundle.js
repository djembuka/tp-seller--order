/* eslint-disable */
this.BX = this.BX || {};
(function (exports,local_vueComponents_controlText,local_vueComponents_controlTextarea,local_vueComponents_controlHint,local_vueComponents_controlSelectDropdown,local_vueComponents_controlSelectRadio,local_vueComponents_controlDatepicker,local_vueComponents_controlDateSingle,local_vueComponents_controlDateRange) {
  'use strict';

  var ControlComponent = {
    data: function data() {
      return {
        id: "PROPERTY_".concat(this.control.id),
        name: "PROPERTY_".concat(this.control.id),
        componentType: "".concat(this.control.property).concat(this.control.type ? '-' + this.control.type : '')
      };
    },
    components: {
      ControlText: local_vueComponents_controlText.ControlText,
      ControlTextarea: local_vueComponents_controlTextarea.ControlTextarea,
      ControlHint: local_vueComponents_controlHint.ControlHint,
      ControlSelectDropdown: local_vueComponents_controlSelectDropdown.ControlSelectDropdown,
      ControlSelectRadio: local_vueComponents_controlSelectRadio.ControlSelectRadio,
      ControlDatepicker: local_vueComponents_controlDatepicker.ControlDatepicker,
      ControlDateSingle: local_vueComponents_controlDateSingle.ControlDateSingle,
      ControlDateRange: local_vueComponents_controlDateRange.ControlDateRange
    },
    props: ['control'],
    // language=Vue
    template: "\n\t\t<component\n      :is=\"componentName()\"\n      :control=\"control\"\n      :id=\"id\"\n      :name=\"name\"\n      @input=\"inputAddControl\"\n      @focus=\"focusAddControl\"\n      @blur=\"blurAddControl\"\n      @enter=\"enterAddControl\"\n      @hints=\"hintsAddControl\"\n    ></component>\n\t",
    emits: ['input', 'focus', 'blur', 'hints'],
    methods: {
      componentName: function componentName() {
        return "control-".concat(this.componentType);
      },
      inputAddControl: function inputAddControl(_ref) {
        var value = _ref.value,
          checked = _ref.checked;
        this.$emit('input', {
          control: this.control,
          value: value,
          checked: checked
        });
      },
      focusAddControl: function focusAddControl() {
        this.$emit('focus', {
          control: this.control
        });
      },
      blurAddControl: function blurAddControl() {
        this.$emit('blur', {
          control: this.control
        });
      },
      enterAddControl: function enterAddControl() {
        this.$emit('enter', {
          control: this.control
        });
      },
      hintsAddControl: function hintsAddControl(_ref2) {
        var type = _ref2.type,
          action = _ref2.action,
          value = _ref2.value;
        this.$emit('hints', {
          type: type,
          control: this.control,
          action: action,
          value: value
        });
      }
    }
  };

  exports.ControlComponent = ControlComponent;

}((this.BX.Controls = this.BX.Controls || {}),BX.Controls,BX.Controls,BX.Controls,BX,BX.Controls,BX,BX,BX));
//# sourceMappingURL=component.bundle.js.map
