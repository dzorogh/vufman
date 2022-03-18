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
        meta: {
          isRoot: true
        }
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
        meta: {
          isRoot: true,
          isTrash: true
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(settings.basePath),
  routes,
});


export default router;
