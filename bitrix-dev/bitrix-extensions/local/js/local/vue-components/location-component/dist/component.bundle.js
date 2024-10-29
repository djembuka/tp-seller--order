/* eslint-disable */
(function (exports,local_vueComponents_controlHint) {
  'use strict';

  var LocationComponent = {
    data: function data() {
      return {
        control: {
          property: 'hint',
          id: 'twpxOrderLocationId',
          name: 'LOCATION',
          label: this.label,
          value: '',
          count: 3,
          action: 'twinpx:location-hint',
          required: false,
          disabled: false
        }
      };
    },
    props: ['label'],
    components: {
      ControlHint: local_vueComponents_controlHint.ControlHint
    },
    template: "\n    <ControlHint :key=\"control.id\" :control=\"control\" @input=\"input\" @hints=\"hints\" />\n\t",
    emits: ['inputLocation', 'hints'],
    computed: {},
    watch: {},
    methods: {
      input: function input(_ref) {
        var value = _ref.value;
        this.$emit('inputLocation', {
          value: value
        });
      },
      hints: function hints() {
        var result = {
          status: 'success',
          data: [{
            name: "\u0422\u0432\u0435\u0440\u044C",
            code: '0000230626',
            type: 'CITY',
            type_name: "\u0413\u043E\u0440\u043E\u0434",
            label: "\u0422\u0432\u0435\u0440\u044C, \u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C, \u0420\u043E\u0441\u0441\u0438\u044F",
            parts: {
              CITY: {
                name: "\u0422\u0432\u0435\u0440\u044C",
                code: '0000230626',
                type: 'CITY',
                type_name: "\u0413\u043E\u0440\u043E\u0434"
              },
              REGION: {
                name: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",
                code: '0000028036',
                type: 'REGION',
                type_name: "\u041E\u0431\u043B\u0430\u0441\u0442\u044C"
              },
              COUNTRY: {
                name: "\u0420\u043E\u0441\u0441\u0438\u044F",
                code: '0000028023',
                type: 'COUNTRY',
                type_name: "\u0421\u0442\u0440\u0430\u043D\u0430"
              }
            }
          }],
          errors: []
        };
        this.control.hints = result.data;
      }
    }
  };

  exports.LocationComponent = LocationComponent;

}((this.BX = this.BX || {}),BX.Controls));
//# sourceMappingURL=component.bundle.js.map
