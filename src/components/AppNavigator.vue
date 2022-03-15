<template data-label="AppNavigator">
  <Tree
    v-if="!isLoading"
    v-model:expanded-keys="expandedKeys"
    :selection-keys="selectedFolderKey"

    selection-mode="single"
    :selectable="false"
    :value="tree"

    :meta-key-selection="false"

    @node-select="handleSelect"
  />
  <ProgressSpinner
    v-else
    class="!w-12 !h-12 !my-10"
  />
</template>

<script setup lang="ts">
import Tree, { TreeNode } from "primevue/tree";
import api from "@/services/api";
import { INodeClass } from "@/types/INodeClass";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import ProgressSpinner from 'primevue/progressspinner';

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);

onBeforeMount(async () => {
  const nodes = await api.getNodes({ isFolder: true });
  tree.value[0].children = makeTree(nodes, null);
  isLoading.value = false;
});

const tree = ref<TreeNode[]>(
  [
    {
      label: 'Диск',
      icon: 'pi pi-home',
      key: 'root',
      children: []
    },
    {
      label: 'Корзина',
      icon: 'pi pi-trash',
      key: 'trash',
      children: []
    }
  ]
);

function makeTree(nodes: INodeClass[] | undefined, folderId: INodeClass['folderId']) {
  if (nodes && nodes.length) {
    let result = [] as TreeNode[];

    for (let node of nodes.filter((item) => item.folderId === folderId)) {
      result.push(
        {
          label: node.name,
          icon: 'pi pi-folder',
          key: node.id + '',
          children: makeTree(nodes, node.id)
        }
      );
    }

    return result;
  }

  return [];
}

// console.log(nodes, makeTree(nodes, null));


function handleSelect(treeNode: TreeNode) {
  // console.log(treeNode);

  if (treeNode.key === 'root') {
    return router.push({ name: 'root' });
  }

  if (treeNode.key === 'trash') {
    return router.push({ name: 'trash' });
  }

  return router.push({ name: 'folder', params: { folderId: treeNode.key } });
}

const selectedFolderKey = computed(() => {
  if (!route.params.folderId) {
    return 'root';
  }

  if (!route.params.isTrash) {
    return 'trash';
  }
});

const expandedKeys = useStorage('my-flag', {
  root: true,
});

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

::v-deep(.p-treenode) {
  /*@apply p-0 !important;*/
}

::v-deep(.p-treenode-content:hover) {
  @apply bg-gray-200 !important
}

::v-deep(.p-treenode-icon) {
  @apply text-inherit !important;
}

::v-deep(.p-tree-toggler) {
  @apply bg-transparent shadow-none !important;
}
</style>
