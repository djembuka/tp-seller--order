import './component.css';
import { ControlHint } from 'local.vue-components.control-hint';

export const LocationComponent = {
  data() {
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
        disabled: false,
      },
    };
  },
  props: ['label'],
  components: { ControlHint },
  template: `
    <ControlHint :key="control.id" :control="control" @input="input" @hints="hints" />
	`,
  emits: ['input', 'hints'],
  computed: {},
  watch: {},
  methods: {
    input() {},
    hints() {
      let result = {
        status: 'success',
        data: [
          {
            name: '\u0422\u0432\u0435\u0440\u044c',
            code: '0000230626',
            type: 'CITY',
            type_name: '\u0413\u043e\u0440\u043e\u0434',
            label:
              '\u0422\u0432\u0435\u0440\u044c, \u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c, \u0420\u043e\u0441\u0441\u0438\u044f',
            parts: {
              CITY: {
                name: '\u0422\u0432\u0435\u0440\u044c',
                code: '0000230626',
                type: 'CITY',
                type_name: '\u0413\u043e\u0440\u043e\u0434',
              },
              REGION: {
                name: '\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
                code: '0000028036',
                type: 'REGION',
                type_name: '\u041e\u0431\u043b\u0430\u0441\u0442\u044c',
              },
              COUNTRY: {
                name: '\u0420\u043e\u0441\u0441\u0438\u044f',
                code: '0000028023',
                type: 'COUNTRY',
                type_name: '\u0421\u0442\u0440\u0430\u043d\u0430',
              },
            },
          },
        ],
        errors: [],
      };

      this.control.hints = result.data;
    },
  },
};
