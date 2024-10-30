/* eslint-disable */
(function (exports,local_vueComponents_controlHint) {
  'use strict';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var LocationComponent = {
    data: function data() {
      return {};
    },
    props: ['control'],
    components: {
      ControlHint: local_vueComponents_controlHint.ControlHint
    },
    template: "\n    <ControlHint :key=\"control.id\" :control=\"control\" @input=\"input\" @hints=\"hints\" />\n\t",
    emits: ['input', 'hints'],
    computed: {},
    watch: {},
    methods: {
      input: function input(_ref) {
        var value = _ref.value;
        this.$emit('input', {
          value: value,
          control: this.control
        });
      },
      hints: function hints(attrs) {
        this.$emit('hints', _objectSpread(_objectSpread({}, attrs), {}, {
          control: this.control
        }));
      }
    },
    mounted: function mounted() {
      this.control.label = 'Местоположение';
    }
  };

  exports.LocationComponent = LocationComponent;

}((this.BX = this.BX || {}),BX.Controls));
//# sourceMappingURL=component.bundle.js.map
