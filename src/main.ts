import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import VueClick from 'vue-click';

import App from './App.vue';
import PrimeVue from 'primevue/config';

import './index.css'; // tailwind
import 'primevue/resources/themes/lara-light-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';

import "vue-toastification/dist/index.css";


import { settings } from "./setup";
import router from "./router";
import VueLazyLoad from 'vue3-lazyload';

const app = createApp(App);
const pinia = createPinia();

app.use(Toast, { position: POSITION.TOP_RIGHT } as PluginOptions);
app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(VueLazyLoad);
app.use(VueClick);

app.mount(settings.mountContainer);

console.log(`env.mode = ${import.meta.env.MODE}`);
