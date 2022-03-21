<template data-label="AppNavigator">
  <Tree
    v-if="!isLoading"
    v-model:expanded-keys="expandedKeys"
    :selection-keys="selectedFolderKey"

    selection-mode="single"
    :selectable="false"
    :value="tree"

    :meta-key-selection="false"

    :drop-available-by-key="dropAvailableByKey"
    @node-select="handleSelect"

    @node-mouseup="handleDrop"
  />
  <ProgressSpinner
    v-else
    class="!w-12 !h-12 !my-10"
  />
</template>

<script setup lang="ts">
import Tree from "@/components/tree/AppTree.vue";
import api from "@/services/api";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import ProgressSpinner from 'primevue/progressspinner';
import { makeNavigatorTree } from "@/services/makeNavigatorTree";
import { useNodesStore } from "@/store/nodes";
import { useMessages } from "@/composables/useMessages";

const route = useRoute();
const router = useRouter();
const nodesStore = useNodesStore();
const messages = useMessages();

const nodes = ref();
const isLoading = ref(true);

onBeforeMount(async () => {
  nodes.value = await api.getNodes({ isFolder: true });
  tree.value[0].children = makeNavigatorTree(nodes.value, null);
  isLoading.value = false;
});

type TreeNode = {
  label?: string;
  icon?: string;
  key?: string;
  children?: TreeNode[];
}

const tree = ref<TreeNode[]>(
  [
    {
      label: 'Диск',
      icon: 'pi pi-home',
      key: 'root',
      children: [],
    },
    {
      label: 'Корзина',
      icon: 'pi pi-trash',
      key: 'trash',
      children: [],
    }
  ]
);

// console.log(nodes, makeTree(nodes, null));


const handleSelect = (treeNode: TreeNode) => {
  // console.log(treeNode);

  if (treeNode.key === 'root') {
    return router.push({ name: 'root' });
  }

  if (treeNode.key === 'trash') {
    return router.push({ name: 'trash' });
  }

  return router.push({ name: 'folder', params: { folderId: treeNode.key } });
};

const selectedFolderKey = computed<{ [key: string]: true | unknown }>(() => {

  // console.log(route.meta.isRoot, route.params.folderId, nodesStore.currentFolder);
  if (route.meta.isTrash) {
    return { 'trash': true };
  }

  if (route.meta.isRoot) {
    return { 'root': true };
  }

  if (route.params.folderId && typeof route.params.folderId === "string") {
    return { [route.params.folderId]: true };
  }

  if (nodesStore.currentFolder && typeof nodesStore.currentFolder.id === 'string') {
    return { [nodesStore.currentFolder.id]: true };
  }

  return { 'root': true };
});

const expandedKeys = useStorage('my-flag', {
  root: true,
});

const dropAvailableByKey = (key: string) => {
  if (nodesStore.dragging) {

    // console.log(key);

    if (key === 'root') {
      return !!nodesStore.currentFolder;
    }

    if (key === 'trash') {
      return !route.meta.isTrash;
    }

    if (nodesStore.selectedNodes.find(item => item.id === key || item.folderId === key)) {
      return false;
    }

    // TODO: Check to move selected files in self subfoldrers

    return true;
  }

  return false;
};

const handleDrop = (destination: TreeNode) => {
  if (destination && destination.key && dropAvailableByKey(destination.key)) {

    messages.moved(destination.key === 'trash' ? 'trash' : destination.key === 'root' ? 'root' : 'folder', nodesStore.selectedNodes);

    nodesStore.removeNodes(nodesStore.selectedNodes);
  }
};

</script>

<style scoped>

::v-deep(.p-treenode-label) {
  user-select: none;
}

.p-tree {
  padding: 0 !important;
  border: none !important;
  background: none;
  font-weight: 600;
}

::v-deep(.p-treenode-content) {
  @apply shadow-none !important;
}

::v-deep(.p-treenode-content:hover) {
  @apply bg-inherit !important;
}

::v-deep(.p-treenode-content.p-highlight) {
  @apply bg-gray-100 !important;
}

::v-deep(.p-treenode-icon) {
  @apply text-inherit !important;
}

::v-deep(.p-tree-toggler) {
  @apply bg-transparent shadow-none !important;
}

::v-deep(.drop-available) {
  @apply bg-gray-200 hover:bg-amber-50 cursor-grabbing !important;
}
</style>
