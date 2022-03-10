import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import './index.css' // tailwind

import 'primevue/resources/themes/lara-light-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';
import { settings } from "./setup";
import router from "./router";
import VueLazyLoad from 'vue3-lazyload'
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(PrimeVue);
app.use(ConfirmationService);
app.use(createPinia());
app.use(router);
app.use(VueLazyLoad);

app.mount(settings.mountContainer);
