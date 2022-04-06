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
        {{ nodesStore.selectedNodes ? nodesStore.selectedNodes.length : '' }}
      </div>
    </div>
  </Teleport>

  <template v-if="nodesStore.selectedNodes && nodesStore.sortedNodes.length > 0">
    <div
      v-if="['grid', 'list'].includes(nodesStore.layout)"
      :class="{
        'cursor-grabbing': nodesStore.dragging,
        'grid lg:grid-cols-2 gap-2' : nodesStore.layout === 'list',
        'grid xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4' : nodesStore.layout === 'grid'
      }"
      class="overflow-x-hidden p-4"
      @click.self="nodesStore.deselect()"
    >
      <AppNode
        v-for="(child) in nodesStore.sortedNodes"

        :key="child.id"

        :node="child"

        :class="{
          'bg-slate-100': nodesStore.selectedNodes.includes(child),
          ...droppableClass(child),
        }"
        @click.ctrl="nodesStore.selectNodeAdd(child)"
        @click.meta="nodesStore.selectNodeAdd(child)"
        @click.shift="nodesStore.selectNodeRange(child)"
        @click.exact="nodesStore.selectNodeSingle(child)"

        @mousedown.exact="handleDragStart(child)"
        @mouseup.exact="handleDrop(child)"

        @contextmenu="contextMenu.handleContextMenu(child, $event)"
        @dblclick="handleDoubleClick(child)"
        @doubletap="handleDoubleClick(child)"
      />
    </div>

    <table
      v-if="nodesStore.layout === 'table'"
      class="w-full border-t-0 table border-x-0 border-collapse	"
    >
      <thead class="bg-slate-50 sticky top-0 ">
        <AppFolderTableHeader />
      </thead>
      <tbody class="divide-y">
        <AppFolderTableRow
          v-for="(child) in nodesStore.sortedNodes"
          :key="child.id"
          :node="child"

          :class="{
            'bg-slate-100': nodesStore.selectedNodes.includes(child),
            ...droppableClass(child),
          }"

          @click.ctrl="nodesStore.selectNodeAdd(child)"
          @click.meta="nodesStore.selectNodeAdd(child)"
          @click.shift="nodesStore.selectNodeRange(child)"
          @click.exact="nodesStore.selectNodeSingle(child)"

          @mousedown.exact="handleDragStart(child)"
          @mouseup.exact="handleDrop(child)"

          @contextmenu="contextMenu.handleContextMenu(child, $event)"
          @dblclick="handleDoubleClick(child)"
          @doubletap="handleDoubleClick(child)"
        />
      </tbody>
    </table>

    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :options="contextMenu.options.value"
      :x="contextMenu.x.value"
      :y="contextMenu.y.value"
      :show="contextMenu.show.value"
      @clickoutside="contextMenu.handleClickOutside"
      @select="contextMenu.handleSelect"
    />
  </template>

  <div
    v-else
    class="p-12 h-full flex items-center justify-center text-neutral-400 text-center text-2xl"
  >
    Папка пуста
  </div>
</template>

<script setup lang="ts">
import { Component, computed, h, nextTick, ref } from "vue";

import AppNode from "@/components/AppNode.vue";
import { useNodesStore } from "@/store/nodes";

import { INodeModel } from "@/types/INodeModel";
import { useRoute, useRouter } from "vue-router";
import { useMouse } from "@vueuse/core";
import IconFile from "@/components/IconFile.vue";
import { useMessages } from "@/composables/useMessages";
import AppFolderTableRow from "@/components/AppFolderTableRow.vue";
import AppFolderTableHeader from "@/components/AppFolderTableHeader.vue";
import { DropdownOption, NIcon } from "naive-ui";
import {
  ArrowDownload16Filled as IconDownload,
  Delete16Filled as IconDelete,
  DeleteDismiss20Filled as IconDestroy,
  DocumentCopy16Filled as IconCopy,
  FolderArrowRight16Filled as IconMove,
  Rename16Filled as IconRename,
  ArrowReset20Filled as IconRestore,
  Cut20Filled as IconCut
} from "@vicons/fluent";
import { useNodesActions } from "@/composables/useNodesActions";

const props = defineProps<{
  isTrash: boolean;
}>();

const nodesStore = useNodesStore();
const router = useRouter();
const route = useRoute();
const nodesActions = useNodesActions();


const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const contextMenu = {
  show: ref(false),
  x: ref(0),
  y: ref(0),
  handleContextMenu: async (node: INodeModel, e: MouseEvent) => {
    e.preventDefault();
    contextMenu.show.value = false;

    await nextTick();

    if (!nodesStore.isNodeSelected(node)) {
      nodesStore.selectNodeSingle(node);
    }

    contextMenu.show.value = true;
    contextMenu.x.value = e.clientX;
    contextMenu.y.value = e.clientY;
  },
  handleClickOutside: () => {
    contextMenu.show.value = false;
  },
  handleSelect: (key: string | number, option: DropdownOption) => {
    console.log('handleSelect', option);
    contextMenu.show.value = false;
    return typeof option.command === 'function' ? option.command() : null;
  },
  options: computed(() => {
    const result = [] as DropdownOption[];

    result.push({
      key: 'title',
      label: nodesStore.selectedNodesLabel,
      icon: renderIcon(nodesStore.selectedNodesIcon),
      disabled: true,
      class: 'context-menu-title',
    });

    result.push({
      type: 'divider',
      key: 'd1'
    });

    result.push({
      key: 'move',
      label: 'Переместить',
      icon: renderIcon(IconMove),
      command: nodesStore.moveNodes,
    });

    if (props.isTrash) {
      result.push({
        key: 'destroy',
        label: 'Удалить навсегда',
        icon: renderIcon(IconDestroy),
        command: nodesStore.deleteNodes,
      });

      result.push({
        key: 'restore',
        label: 'Восстановить',
        icon: renderIcon(IconRestore),
        command: nodesStore.untrashNodes,
      });
    } else {
      result.push({
        key: 'copy',
        label: 'Скопировать',
        icon: renderIcon(IconCopy),
        command: nodesStore.copyNodes,
      });

      result.push({
        key: 'cut',
        label: 'Вырезать',
        icon: renderIcon(IconCut),
        command: nodesStore.cutNodes,
      });

      if (nodesStore.selectedNodes && nodesStore.selectedNodes.length === 1) {
        result.push({
          key: 'rename',
          label: 'Переименовать',
          icon: renderIcon(IconRename),
          command: nodesStore.renameNode,
        });
      }

      result.push({
        key: 'trash',
        label: 'В корзину',
        icon: renderIcon(IconDelete),
        command: nodesStore.trashNodes,
      });
    }

    if (nodesStore.selectedNodes && nodesStore.selectedNodes.length === 1 && !nodesStore.selectedNodes[0].isFolder) {
      result.push({
        type: 'divider',
        key: 'd1'
      });

      result.push({
        key: 'download',
        label: 'Скачать',
        icon: renderIcon(IconDownload),
        command: nodesStore.downloadNodes,
      });
    }


    return result;
  })
};

// console.log(route.params);

const handleDoubleClick = (node: INodeModel) => {
  // navigate to folder or file

  if (node.isFolder) {
    router.push({
      name: 'folder',
      params: {
        folderId: node.id
      },
      query: {
        trash: props.isTrash ? null : undefined
      }
    });
  } else {
    router.push({
      name: 'file',
      params: {
        fileId: node.id
      },
      query: {
        trash: props.isTrash ? null : undefined
      }
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

const handleDragStart = async (node: INodeModel) => {
  if (nodesStore.selectedNodes.indexOf(node) >= 0) {
    // Dragging selected nodex
  } else {
    nodesStore.selectNodeSingle(node);
  }

  draggingTimeout = setTimeout(() => {
    nodesStore.dragging = true;
  }, 150);
};

document.addEventListener('mouseup', () => {
  clearTimeout(draggingTimeout);
  nodesStore.dragging = false;
});

const handleDrop = async (destination: INodeModel) => {
  if (dropAvailable(destination)) {
    console.log('drop to', destination);

    await nodesActions.moveTo(nodesStore.selectedNodes, destination.id);

    nodesStore.removeNodes(nodesStore.selectedNodes);
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
</script>

<style scoped>
</style>
