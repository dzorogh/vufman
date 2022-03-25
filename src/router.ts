import AppFolderLayout from "@/components/AppFolderLayout.vue";
import AppFileLayout from "@/components/AppFileLayout.vue";
import AppLayout from "@/components/AppLayout.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { settings } from "./setup";


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // components: {
    //   default: Home,
    //   short for LeftSidebar: LeftSidebar
    // LeftSidebar,
    // they match the `name` attribute on `<router-view>`
    // RightSidebar,
    // },
    component: AppLayout,
    children: [
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
        name: 'folder',
        path: '/folder/:folderId?',
        component: AppFolderLayout,
      },
      {
        name: 'file',
        path: '/file/:fileId',
        component: AppFileLayout,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});


export default router;
