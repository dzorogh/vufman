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
        component: AppFolderLayout,
        props: route => ({
          isTrashed: false,
          folderId: null
        })
      },
      {
        name: 'folder',
        path: '/folder/:folderId',
        component: AppFolderLayout,
        props: route => ({
          isTrashed: false,
          folderId: route.params.folderId || null
        })
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
        props: route => ({
          isTrashed: true,
          folderId: null
        })
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});


export default router;
