<template>
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

  <template v-if="nodesStore.sortedNodes.length > 0">
    <div
      v-if="['grid', 'list'].includes(nodesStore.layout)"
      :class="{'cursor-grabbing': nodesStore.dragging, 'grid lg:grid-cols-2 gap-2 ' : nodesStore.layout === 'list', 'grid xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4' : nodesStore.layout === 'grid'}"
      class="overflow-x-hidden p-4"
      @click.self="nodesStore.deselect()"
    >
      <AppNode
        v-for="(child) in nodesStore.sortedNodes"

        :key="child.id"

        :node="child"

        :class="{'bg-slate-100': nodesStore.selectedNodes.includes(child), ...droppableClass(child), ...cutClass(child)}"
        @click.ctrl="nodesStore.selectNodeAdd(child)"
        @click.meta="nodesStore.selectNodeAdd(child)"
        @click.shift="nodesStore.selectNodeRange(child)"
        @click.exact="nodesStore.selectNodeSingle(child)"

        @mousedown.exact="handleDragStart(child, $event)"
        @mouseup.exact="handleDrop(child, $event)"

        @contextmenu="showContextMenu(child, $event)"
        @dblclick="handleDoubleClick(child)"
        @doubletap="handleDoubleClick(child)"
      />

      <ContextMenu
        ref="menu"
        :model="menuItems"
      />
    </div>
    <table
      v-if="nodesStore.layout === 'table'"
      class="w-full border-t-0 table border-x-0"
    >
      <thead>
        <AppFolderTableHeader />
      </thead>
      <tbody>
        <AppFolderTableRow
          v-for="(child) in nodesStore.sortedNodes"
          :key="child.id"
          :node="child"

          :class="{'bg-slate-100': nodesStore.selectedNodes.includes(child), ...droppableClass(child), ...cutClass(child)}"
          
          @click.ctrl="nodesStore.selectNodeAdd(child)"
          @click.meta="nodesStore.selectNodeAdd(child)"
          @click.shift="nodesStore.selectNodeRange(child)"
          @click.exact="nodesStore.selectNodeSingle(child)"

          @mousedown.exact="handleDragStart(child, $event)"
          @mouseup.exact="handleDrop(child, $event)"

          @contextmenu="showContextMenu(child, $event)"
          @dblclick="handleDoubleClick(child)"
          @doubletap="handleDoubleClick(child)"
        />
      </tbody>
    </table>
  </template>

  <div
    v-else
    class="p-4"
  >
    Папка пуста. Перетащите файлы, чтобы загрузить.
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ContextMenu from 'primevue/contextmenu';

import AppNode from "@/components/AppNode.vue";
import { useNodesStore } from "@/store/nodes";

import { INodeModel } from "@/types/INodeModel";
import { useRouter } from "vue-router";
import { promiseTimeout, useDebounceFn, useMouse, useTimeout } from "@vueuse/core";
import IconFile from "@/components/IconFile.vue";
import { MenuItem } from "primevue/menuitem";
import { useMessages } from "@/composables/useMessages";
import AppFolderTableRow from "@/components/AppFolderTableRow.vue";
import AppFolderTableHeader from "@/components/AppFolderTableHeader.vue";

const nodesStore = useNodesStore();
const router = useRouter();
const messages = useMessages();

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

const dropAvailable = (destination: INodeModel) => {
  if (nodesStore.dragging && destination.isFolder) {
    return nodesStore.selectedNodes.indexOf(destination) < 0;
  }

  return false;
};

const droppableClass = (node: INodeModel) => {
  if (dropAvailable(node)) {
    return { 'hover:bg-amber-50': true, 'bg-gray-50': true, 'node-drop-available': true };
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
    nodesStore.dragging = true;
  }, 150);
};

document.addEventListener('mouseup', (event) => {
  clearTimeout(draggingTimeout);
  nodesStore.dragging = false;
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

    messages.moved('folder', nodesStore.selectedNodes);

  }
};

const { x: mouseX, y: mouseY } = useMouse();

const dragIconStyle = computed(() => {
  return {
    top: mouseY.value + 10 + 'px',
    left: mouseX.value + 10 + 'px',
    display: nodesStore.dragging ? 'flex !important' : 'none',
    opacity: nodesStore.dragging ? '1' : '0'
  };
});

const cutClass = (node) => {
  return 'opacity-50';
};

</script>

<style scoped>
</style>
