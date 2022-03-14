<template>
  <template v-if="!isLoading">
    <div
      v-if="nodesStore.sortedNodes.length > 0"
      class="grid grid-cols-1 overflow-x-hidden"
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
        @dblclick="handleDoubleClick(child)"
      />

      <ContextMenu
        ref="menu"
        :model="menuItems"
      />
    </div>

    <div
      v-else
      class="p-4"
    >
      Папка пуста. Перетащите файлы, чтобы загрузить.
    </div>
  </template>

  <ProgressSpinner
    v-else
    class="w-10 h-10 m-10"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ContextMenu from 'primevue/contextmenu';
import { MenuItem } from 'primevue/menuitem';
import ProgressSpinner from 'primevue/progressspinner';

import Api from '@/services/api';
import AppNode from "@/components/AppNode.vue";
import { useNodesStore } from "@/store/nodes";

import { Node } from "@/types/Node";
import { useRoute, useRouter } from "vue-router";

const nodesStore = useNodesStore();
const router = useRouter();

// console.log(route.params.folderId);

const isLoading = ref(false);

// console.log(nodesStore.nodes);

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

// console.log(route.params);

const handleDoubleClick = function (node: Node) {
  // navigate to folder or file

  if (node.isFolder) {
    router.push({
      name: 'folder',
      params: {
        folderId: node.id
      },
    });
  } else {
    router.push({
      name: 'file',
      params: {
        fileId: node.id
      },
    });
  }
};

</script>

<style scoped>
</style>
