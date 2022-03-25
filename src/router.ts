import AppFolderLayout from "@/components/AppFolderLayout.vue";
import AppFileLayout from "@/components/AppFileLayout.vue";
import AppLayout from "@/components/AppLayout.vue";
import AppLog from "@/components/AppLog.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { settings } from "./setup";


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        name: 'folder',
        path: '/folder/:folderId?',
        component: AppFolderLayout,
      },
      {
        name: 'root',
        path: '/',
        redirect: '/folder'
      },
      {
        name: 'trash',
        path: '/trash',
        redirect: '/folder?trash'
      },
      {
        name: 'file',
        path: '/file/:fileId',
        component: AppFileLayout,
      },
      {
        name: 'log',
        path: '/log',
        component: AppLog
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});

export default router;
