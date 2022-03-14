<template data-label="AppNavigator">
  <Tree
    :selection-keys="selectedFolderKey"
    selection-mode="single"

    :selectable="false"
    :value="tree"
    :meta-key-selection="false"
    :expanded-keys="expandedKeys"
    @node-select="onNodeSelect"
  />
</template>

<script setup lang="ts">
import Tree, { TreeNode } from "primevue/tree";
import Api from "@/services/Api";
import { Node } from "@/types/Node";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navigator = await Api.getNavigator();
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

function updateNavigator(nodes: Node[] | undefined) {
  if (nodes && nodes.length) {
    let result = [] as TreeNode[];

    for (let node of nodes) {
      result.push(
        {
          label: node.name,
          icon: 'pi pi-folder',
          key: node.id + '',
          children: updateNavigator(node.children)
        }
      );
    }

    return result;
  }

  return [];
}

tree.value[0].children = updateNavigator(navigator);

function onNodeSelect(treeNode: TreeNode) {
  console.log(treeNode);

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

const expandedKeys = ref({
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
