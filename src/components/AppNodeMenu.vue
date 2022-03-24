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
              :class="item.class"
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
import router from "@/router";
import { INodeModel } from "@/types/INodeModel";
import { useMessages } from "@/composables/useMessages";
import { useMoveAction } from "@/composables/useMoveAction";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";
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

const messages = useMessages();

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
      // TODO: Api download

      messages.downloadStarted();
    }
  },
  {
    label: 'Переместить',
    icon: IconMove,
    command: async () => {
      const moveAction = useMoveAction();

      const result = await moveAction.show([ props.node ]);

      if (result) {
        messages.moved('folder');
        console.log('Moved to ', result);

        router.go(0);
        // TODO: api move
      }

    }
  },
  {
    label: 'Скопировать',
    icon: IconCopy,
    command: () => {
      // TODO: copy
    },
    show: () => !props.node.isTrashed,
  },
  {
    label: 'Переименовать',
    icon: IconRename,
    command: async () => {
      const renameAction = useRenameAction();

      const result = await renameAction.show(props.node);

      if (result) {
        // TODO: api - rename file
        router.go(0);
        // props.node.name = result;
      }
    },
    show: () => !props.node.isTrashed,

  },
  {
    label: 'В корзину',
    icon: IconDelete,
    command: async () => {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show([ props.node ]);

      if (result) {
        // TODO: api - delete file
        router.go(0);
      }
    },
    show: () => !props.node.isTrashed,
  },
  {
    show: () => !!props.node.isTrashed,
    label: 'Удалить навсегда',
    icon: IconDestroy,
    command: async () => {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show([ props.node ], true);

      if (result) {
        // TODO: api - destroy file
        await router.push({ name: 'trash' });
      }
    }
  },
  {
    show: () => !!props.node.isTrashed,
    label: 'Восстановить',
    icon: IconRestore,
    command: async () => {
      // TODO: api - restore file
      messages.nodesRestored();
    }
  },
];

</script>

<style scoped>

</style>
