import AppLayout from "@/components/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { settings } from "./setup";
import api from "@/services/api";
import { useNodesStore } from "@/store/nodes";


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


router.afterEach(async (to, from) => {
  const nodesStore = useNodesStore();

  if (to.name === 'folder') {
    nodesStore.currentFolder = await api.getFolder({ id: to.params.folderId as string });
  }
  if (to.name === 'root') {
    nodesStore.currentFolder = null;
  }
});

export default router;
