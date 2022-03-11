<template>
  <AppBreadCrumbs />

  <div class="grid grid-cols-1 overflow-x-hidden">
    <TransitionGroup
      name="list"
    >
      <AppNode
        v-for="(child) in nodesStore.sortedNodes"
        :key="child.id"
        :node="child"
        class="border border-transparent hover:bg-slate-50"
        :class="{'!bg-slate-100': nodesStore.selectedNodes.includes(child)}"
        @click.ctrl="nodesStore.selectNodeAdd(child)"
        @click.meta="nodesStore.selectNodeAdd(child)"
        @click.shift="nodesStore.selectNodeRange(child)"
        @click.exact="nodesStore.selectNodeSingle(child)"
        @contextmenu="showContextMenu(child, $event)"
      />
    </TransitionGroup>

    <ContextMenu
      ref="menu"
      :model="menuItems"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ContextMenu from 'primevue/contextmenu';
import { MenuItem } from 'primevue/menuitem';

import Api from '@/services/Api';
import AppNode from "@/components/AppNode.vue";
import AppBreadCrumbs from "@/components/AppBreadCrumbs.vue";
import { useNodesStore } from "@/store/nodes";

import { Node } from "@/types/Node";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";

const nodesStore = useNodesStore();


nodesStore.nodes = await Api.getNodes({ id: null });

// const selectedNodes = ref<Node[]>([]);
// const selectNodeSingle = (node: Node) => {
//   selectedNodes.value = [ node ];
// };
// const selectNodeControl = (node: Node) => {
//   selectedNodes.value.push(node);
// };
// const selectNodeShift = (node: Node) => {
//   if (selectedNodes.value.length <= 0) {
//     selectedNodes.value = [ node ];
//   } else {
//     if (nodes.value) {
//
//       const firstNodeIndex = nodes.value.indexOf(selectedNodes.value[0]);
//       const lastNodeIndex = firstNodeIndex + selectedNodes.value.length - 1;
//       const selectedNodeIndex = nodes.value.indexOf(node);
//
//       selectedNodes.value = [];
//
//       // Select all nodes between first and selected node
//       // Including edge items
//       nodes.value.forEach((item, index) => {
//         if (index >= firstNodeIndex && index <= selectedNodeIndex) {
//           selectedNodes.value.push(item);
//         }
//
//         if (index >= selectedNodeIndex && index <= lastNodeIndex) {
//           selectedNodes.value.push(item);
//         }
//       });
//     }
//   }
// };

const menu = ref();
const showContextMenu = (node: Node, event: unknown) => {
  if (nodesStore.selectedNodes.indexOf(node) < 0) {
    nodesStore.selectNodeSingle(node);
  }

  menu.value.show(event);
};
const menuItems = computed<object[]>(() => {
  const result = [] as MenuItem[];

  result.push({
    label: nodesStore.selectedNodesLabel,
    icon: nodesStore.selectedNodesIcon,
    disabled: true,
    class: 'context-menu-title',
  });

  result.push({
    separator: true,
  });

  result.push({
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open'
  });

  result.push({
    label: 'Скопировать',
    icon: 'pi pi-fw pi-copy'
  });

  if (nodesStore.selectedNodes.length === 1) {
    result.push({
      label: 'Переименовать',
      icon: 'pi pi-fw pi-pencil',
      command: nodesStore.renameNode
    });
  }

  result.push({
    label: 'Скачать',
    icon: 'pi pi-fw pi-download',
    command() {
      alert('Скачивание');
    }
  });

  result.push({
    label: 'Удалить',
    icon: 'pi pi-fw pi-trash text-danger',
    command: nodesStore.deleteNodes
  });

  return result;
});

</script>

<style scoped>
</style>
