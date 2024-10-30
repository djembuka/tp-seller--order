import './component.css';
import { ControlHint } from 'local.vue-components.control-hint';

export const LocationComponent = {
  data() {
    return {};
  },
  props: ['control'],
  components: { ControlHint },
  template: `
    <ControlHint :key="control.id" :control="control" @input="input" @hints="hints" />
	`,
  emits: ['input', 'hints'],
  computed: {},
  watch: {},
  methods: {
    input({ value }) {
      this.$emit('input', { value, control: this.control });
    },
    hints(attrs) {
      this.$emit('hints', { ...attrs, control: this.control });
    },
  },
  mounted() {
    this.control.label = 'Местоположение';
  },
};
