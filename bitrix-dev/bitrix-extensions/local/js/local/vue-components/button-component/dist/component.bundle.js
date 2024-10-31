/* eslint-disable */
this.BX = this.BX || {};
(function (exports) {
  'use strict';

  var ButtonComponent = {
    // language=Vue
    template: "<div class=\"twpx-button\" @click.prevent=\"clickButton\">{{ name }}</div>",
    props: ['name'],
    emits: ['clickButton'],
    methods: {
      clickButton: function clickButton() {
        this.$emit('clickButton');
      }
    }
  };

  exports.ButtonComponent = ButtonComponent;

}((this.BX.Buttons = this.BX.Buttons || {})));
//# sourceMappingURL=component.bundle.js.map
