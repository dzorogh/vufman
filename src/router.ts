import AppFolderLayout from "@/components/AppFolderLayout.vue";
import AppFileLayout from "@/components/AppFileLayout.vue";
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
    component: AppFileLayout,
  },
  {
    name: 'trash',
    path: '/trash',
    component: AppFolderLayout,
    props: {
      isTrashed: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});


export default router;
