import AppFolderLayout from "@/components/AppFolderLayout.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { settings } from "./setup";
import api from "@/services/api";
import { useNodesStore } from "@/store/nodes";


const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    component: AppFolderLayout,
  },
  {
    name: 'folder',
    path: '/folder/:folderId',
    component: AppFolderLayout,
  },
  {
    name: 'file',
    path: '/file/:fileId',
    component: AppFolderLayout,
  },
  {
    name: 'trash',
    path: '/trash',
    component: AppFolderLayout,
  },
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});


export default router;
