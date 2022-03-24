import { createApp, markRaw } from 'vue';
import { createPinia, PiniaPluginContext } from 'pinia';
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import { useMessages } from "@/composables/useMessages";

import App from './App.vue';

import './index.css'; // tailwind

import { settings } from "./setup";
import router from "./router";
import VueLazyLoad from 'vue3-lazyload';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }: PiniaPluginContext) => {
  store.router = markRaw(router);
  store.messages = markRaw(useMessages());
});

app.use(Toast, { position: POSITION.TOP_RIGHT } as PluginOptions);
app.use(router);
app.use(pinia);
app.use(VueLazyLoad);

app.mount(settings.mountContainer);

console.log(`env.mode = ${import.meta.env.MODE}`);


