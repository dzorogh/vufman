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
import { useRouter } from "vue-router";

const router = useRouter();
const nodesActions = useNodesActions();
const nodesStore = useNodesStore();

const props = defineProps<{
  node: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'nodeChange', node: INodeModel): void;
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
    },
    show: () => !props.node.isFolder,
  },
  {
    label: 'Переместить',
    icon: IconMove,
    command: async () => {
      const result = await nodesActions.move([ props.node ]);
      if (result) {
        emit('nodeChange', result[0]);
      }
    },
    show: () => !!props.node.canWrite,
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
      const result = await nodesActions.rename(props.node);

      if (result) {
        emit('nodeChange', result);
      }
    },
    show: () => !props.node.isTrashed && !!props.node.canWrite,

  },
  {
    label: 'В корзину',
    icon: IconDelete,
    command: async () => {
      const result = await nodesActions.trash([ props.node ]);

      if (result) {
        emit('nodeChange', result[0]);
      }
    },
    show: () => !props.node.isTrashed && !!props.node.canWrite,
  },
  {
    label: 'Удалить навсегда',
    icon: IconDestroy,
    command: async () => {
      const result = await nodesActions.delete([ props.node ]);

      if (result) {
        await router.push('/trash');
      }
    },
    show: () => !!props.node.isTrashed && !!props.node.canWrite,

  },
  {
    show: () => !!props.node.isTrashed && !!props.node.canWrite,
    label: 'Восстановить',
    icon: IconRestore,
    command: async () => {
      const result = await nodesActions.untrash([ props.node ]);

      if (result) {
        emit('nodeChange', result[0]);
      }
    }
  },
];

</script>

<style scoped>

</style>
