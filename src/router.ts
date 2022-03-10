import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: '/', component: App },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
