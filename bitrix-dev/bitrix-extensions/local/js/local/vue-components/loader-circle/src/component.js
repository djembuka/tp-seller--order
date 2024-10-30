import './component.css';

export const LoaderCircle = {
  // language=Vue
  template: `<div class="vue-loader-circle" v-if="show"></div>`,
  props: ['show'],
};
