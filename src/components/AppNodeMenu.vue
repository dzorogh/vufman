<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="node.isFolder"
      class="opacity-50 font-bold"
    >
      Действия над текущей папкой:
    </div>

    <div
      v-else
      class="opacity-50 font-bold"
    >
      Действия над файлом:
    </div>

    <div class="flex gap-2 flex-wrap">
      <div
        v-for="(item, index) in items.filter(item => item.show ? item.show() : true)"
        :key="index"
        class="grid"
      >
        <n-tooltip>
          <template #trigger>
            <n-button
              @click="item.command"
            >
              <template #icon>
                <n-icon :component="item.icon" />
              </template>
            </n-button>
          </template>

          {{ item.label }}
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import { Component } from "vue";

import {
  ArrowDownload16Filled as IconDownload,
  Delete16Filled as IconDelete,
  DeleteDismiss20Filled as IconDestroy,
  DocumentCopy16Filled as IconCopy,
  FolderArrowRight16Filled as IconMove,
  Rename16Filled as IconRename,
  ArrowReset20Filled as IconRestore
} from "@vicons/fluent";
import { useNodesActions } from "@/composables/useNodesActions";
import { useNodesStore } from "@/store/nodes";

const nodesActions = useNodesActions();
const nodesStore = useNodesStore();

const props = defineProps<{
  node: INodeModel;
}>();

const items: {
  label: string;
  icon: Component;
  command: () => void;
  show?: () => boolean;
}[] = [
  {
    label: 'Скачать',
    icon: IconDownload,
    command: async () => {
      await nodesActions.download(props.node);
    }
  },
  {
    label: 'Переместить',
    icon: IconMove,
    command: async () => {
      await nodesActions.move([ props.node ]);
    }
  },
  {
    label: 'Скопировать',
    icon: IconCopy,
    command: () => {
      nodesStore.selectedNodes = [ props.node ];
      nodesStore.copyNodes();
    },
    show: () => !props.node.isTrashed,
  },
  {
    label: 'Переименовать',
    icon: IconRename,
    command: async () => {
      await nodesActions.move([ props.node ]);
    },
    show: () => !props.node.isTrashed,

  },
  {
    label: 'В корзину',
    icon: IconDelete,
    command: async () => {
      await nodesActions.delete([ props.node ]);
    },
    show: () => !props.node.isTrashed,
  },
  {
    show: () => !!props.node.isTrashed,
    label: 'Удалить навсегда',
    icon: IconDestroy,
    command: async () => {
      await nodesActions.destroy([ props.node ]);
    }
  },
  {
    show: () => !!props.node.isTrashed,
    label: 'Восстановить',
    icon: IconRestore,
    command: async () => {
      await nodesActions.restore([ props.node ]);
    }
  },
];

</script>

<style scoped>

</style>
