<template>
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
import { useNodesStore } from "@/store/nodes";

import { Node } from "@/types/Node";
import { useRoute } from "vue-router";

const nodesStore = useNodesStore();


nodesStore.nodes = await Api.getNodes({ id: null });

const menu = ref();
const showContextMenu = (node: Node, event: unknown) => {
  if (!nodesStore.isNodeSelected(node)) {
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
    icon: 'pi pi-fw pi-folder-open',
    command: nodesStore.moveNodes
  });

  result.push({
    label: 'Скопировать',
    icon: 'pi pi-fw pi-copy',
    command: nodesStore.copyNodes
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
    command: nodesStore.downloadNodes
  });

  result.push({
    label: 'В корзину',
    icon: 'pi pi-fw pi-trash text-danger',
    command: nodesStore.deleteNodes
  });

  result.push({
    label: 'Удалить навсегда',
    icon: 'pi pi-fw pi-trash !text-red-500',
    command: nodesStore.destroyNodes
  });

  return result;
});

const route = useRoute();

console.log(route.params);

</script>

<style scoped>
</style>
