import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import PrimeVue from 'primevue/config';

import './index.css'; // tailwind
import 'primevue/resources/themes/lara-light-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';

import { settings } from "./setup";
import router from "./router";
import VueLazyLoad from 'vue3-lazyload';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueLazyLoad);

app.mount(settings.mountContainer);
