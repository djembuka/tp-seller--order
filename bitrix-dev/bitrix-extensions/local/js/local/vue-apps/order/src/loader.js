import { BitrixVue } from 'ui.vue3';
import { Application } from './components/application';
import { createPinia, setActivePinia } from 'ui.vue3.pinia';
import { orderStore } from './stores/order';

export class OrderMake {
  #store;
  #rootNode;
  #application;

  constructor(rootNode, options): void {
    this.#store = createPinia();
    this.#rootNode = document.querySelector(rootNode);
    this.options = options;
  }

  run(): void {
    const self = this;

    this.#application = BitrixVue.createApp({
      name: 'Order Application',
      components: {
        Application,
      },
      template: '<Application/>',
      mounted() {
        if (self.options && typeof self.options === 'object') {
          Object.keys(self.options).forEach((key) => {
            orderStore()[key] = self.options[key] || '';
          });
        }

        orderStore().createData();
      },
    });

    this.#application.use(this.#store);
    this.#application.mount(this.#rootNode);
  }

  initStorageBeforeStartApplication(): void {
    setActivePinia(this.#store);
  }

  getOrderStore(): Object {
    return orderStore;
  }
}
