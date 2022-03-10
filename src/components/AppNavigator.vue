<template data-label="AppNavigator">
  <Tree
    v-model:selection-keys="selectedFolderKey"
    :selectable="false"
    :value="navigator"
    selection-mode="single"
    :meta-key-selection="false"
    @node-select="onNodeSelect"
  />
</template>

<script setup lang="ts">
import Tree from "primevue/tree";
import Api from "../service/Api";

const navigator = await Api.getNavigator();

function updateNavigator(nodes: any) {
  if (nodes && nodes.length) {
    for (let node of nodes) {
      // add icon
      node.label = node.name;
      node.icon = 'pi pi-folder';
      node.key = node.id;

      updateNavigator(node.children);
    }
  }
}

updateNavigator(navigator);

function onNodeSelect(node) {
  console.log(node)
}

const selectedFolderKey = null;

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
