import AppLayout from "@/components/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { settings } from "./setup";

const routes = [
  {
    name: 'root',
    path: '/',
    component: AppLayout,
  },
  {
    name: 'folder',
    path: '/folder/:folderId',
    component: AppLayout
  },
  {
    name: 'file',
    path: '/file/:fileId',
    component: AppLayout
  },
  {
    name: 'trash',
    path: '/trash',
    component: AppLayout
  },
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});

export default router;
