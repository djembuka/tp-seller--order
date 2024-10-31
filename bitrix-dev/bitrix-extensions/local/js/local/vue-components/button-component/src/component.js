import './component.css';

export const ButtonComponent = {
  // language=Vue
  template: `<div class="twpx-button" @click.prevent="clickButton">{{ name }}</div>`,
  props: ['name'],
  emits: ['clickButton'],
  methods: {
    clickButton() {
      this.$emit('clickButton');
    },
  },
};
