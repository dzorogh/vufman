<template>
  <template v-if="!isLoading">
    <Teleport to="body">
      <div
        class="z-10 py-0.5 pr-2 pl-1 shadow-2xl rounded bg-red-800 text-white hidden absolute opacity-0 transition-all ease-linear font-bold text-sm flex items-center gap-1"
        :style="dragIconStyle"
      >
        <IconFile
          class="w-3 h-3 text-white"
        />

        <div>
          {{ nodesStore.selectedNodes.length }}
        </div>
      </div>
    </Teleport>
    <div
      v-if="nodesStore.sortedNodes.length > 0"
      :class="{'cursor-grabbing': dragging}"
      class="grid grid-cols-1 overflow-x-hidden"
    >
      <AppNode
        v-for="(child) in nodesStore.sortedNodes"

        :key="child.id"
        :node="child"

        class="border border-transparent"
        :class="{'bg-slate-100': nodesStore.selectedNodes.includes(child), ...droppableClass(child)}"

        @click.ctrl="nodesStore.selectNodeAdd(child)"
        @click.meta="nodesStore.selectNodeAdd(child)"
        @click.shift="nodesStore.selectNodeRange(child)"
        @click.exact="nodesStore.selectNodeSingle(child)"
        @mousedown.exact="handleDragStart(child, $event)"
        @mouseup.exact="handleDrop(child, $event)"

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
import { computed, ref } from "vue";
import ContextMenu from 'primevue/contextmenu';
import ProgressSpinner from 'primevue/progressspinner';

import AppNode from "@/components/AppNode.vue";
import { useNodesStore } from "@/store/nodes";

import { INodeModel } from "@/types/INodeModel";
import { useRouter } from "vue-router";
import { promiseTimeout, useDebounceFn, useMouse, useTimeout } from "@vueuse/core";
import IconFile from "@/components/IconFile.vue";
import { MenuItem } from "primevue/menuitem";
import { useToast } from "primevue/usetoast";

const nodesStore = useNodesStore();
const router = useRouter();
const toast = useToast();

// console.log(route.params.folderId);

const isLoading = ref(false);

// console.log(nodesStore.nodes);

const menu = ref();
const showContextMenu = (node: INodeModel, event: unknown) => {
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
    icon: 'pi pi-fw pi-trash text-red-500',
    command: nodesStore.deleteNodes
  });

  result.push({
    label: 'Удалить навсегда',
    icon: 'pi pi-fw pi-trash text-red-500',
    command: nodesStore.destroyNodes
  });

  return result;
});

// console.log(route.params);

const handleDoubleClick = (node: INodeModel) => {
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

const dragging = ref(false);


const dropAvailable = (destination: INodeModel) => {
  if (dragging.value && destination.isFolder) {
    return nodesStore.selectedNodes.indexOf(destination) < 0;
  }

  return false;
};

const droppableClass = (node: INodeModel) => {
  if (dropAvailable(node)) {
    return { 'hover:bg-amber-50': true };
  }
  return {};
};

let draggingTimeout: ReturnType<typeof setTimeout>;

const handleDragStart = async (node: INodeModel, event: DragEvent) => {
  if (nodesStore.selectedNodes.indexOf(node) >= 0) {
    // Dragging selected nodex
  } else {
    nodesStore.selectNodeSingle(node);
  }

  draggingTimeout = setTimeout(() => {
    dragging.value = true;
  }, 150);
};

document.addEventListener('mouseup', (event) => {
  clearTimeout(draggingTimeout);
  dragging.value = false;
});

const handleDrop = (destination: INodeModel, event: DragEvent) => {
  if (dropAvailable(destination)) {
    console.log('drop to', destination);

    nodesStore.selectedNodes.forEach((selectedNode) => {
      const index = nodesStore.nodes.indexOf(selectedNode);
      if (index >= 0) {
        nodesStore.nodes.splice(index, 1);
      }
    });

    toast.add({ severity: 'success', summary: 'Перемещено', life: 2000, });
  }
};

const { x: mouseX, y: mouseY } = useMouse();

const dragIconStyle = computed(() => {
  return {
    top: mouseY.value + 10 + 'px',
    left: mouseX.value + 10 + 'px',
    display: dragging.value ? 'flex !important' : 'none',
    opacity: dragging.value ? '1' : '0'
  };
});

</script>

<style scoped>
</style>
