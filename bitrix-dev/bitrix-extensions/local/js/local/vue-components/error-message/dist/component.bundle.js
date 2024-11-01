/* eslint-disable */
(function (exports) {
  'use strict';

  var ErrorMessage = {
    // language=Vue
    template: "\n    <div v-if=\"error\" class=\"vue2-component-error\" @click=\"clickError($event)\">\n      <div class=\"vue2-component-error__content\">\n        <div class=\"vue2-component-error__text\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n            <path d=\"M0,0V5\" transform=\"translate(12 9)\" fill=\"none\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"/>\n            <path d=\"M10,18.817H3.939c-3.47,0-4.92-2.48-3.24-5.51l3.12-5.62,2.94-5.28c1.78-3.21,4.7-3.21,6.48,0l2.94,5.29,3.12,5.62c1.68,3.03.22,5.51-3.24,5.51H10Z\" transform=\"translate(2 2.592)\" fill=\"none\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"/>\n            <path d=\"M0,0H.009\" transform=\"translate(11.995 17)\" fill=\"none\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n            <path d=\"M0,0H24V24H0Z\" fill=\"none\" opacity=\"0\"/>\n          </svg>\n          <span v-html=\"error\"></span>\n        </div>\n        <div class=\"btn btn-md\" @click=\"clickError\">\u041F\u043E\u043D\u044F\u0442\u043D\u043E</div>\n      </div>\n    </div>\n  ",
    props: ['error'],
    emits: ['hideError'],
    methods: {
      clickError: function clickError(event) {
        if (event.target.classList.contains('vue2-component-error') || event.target.classList.contains('btn')) {
          this.$emit('hideError');
        }
      }
    }
  };

  exports.ErrorMessage = ErrorMessage;

}((this.BX = this.BX || {})));
//# sourceMappingURL=component.bundle.js.map
