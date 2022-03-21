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

    <div class="flex gap-2">
      <div
        v-for="(item, index) in items"
        v-show="item.show ? item.show() : true"
        :key="index"
        class="grid"
      >
        <Button
          v-tooltip.top="item.label"
          class="!text-left  p-button-sm"
          :class="item.class"
          :icon="item.icon"
          @click="item.command"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import vTooltip from 'primevue/tooltip';
import router from "@/router";
import { INodeModel } from "@/types/INodeModel";
import { useMessages } from "@/composables/useMessages";
import { useMoveAction } from "@/composables/useMoveAction";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";

const messages = useMessages();

const props = defineProps<{
  node: INodeModel;
}>();

const items: {
  label: string;
  icon: string;
  class?: string;
  command: () => void;
  show?: () => boolean;
}[] = [
  {
    label: 'Скачать',
    icon: 'pi pi-fw pi-download',
    command: async () => {
      // TODO: Api download

      messages.downloadStarted();
    }
  },
  {
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open',
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
    icon: 'pi pi-fw pi-copy',
    command: () => {
      // TODO: copy
    },
    show: () => !props.node.isTrashed,
  },
  {
    label: 'Переименовать',
    icon: 'pi pi-fw pi-pencil',
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
    icon: 'pi pi-fw pi-trash',
    class: 'p-button-danger',
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
    icon: 'pi pi-fw pi-times',
    class: 'p-button-danger',
    command: async () => {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show([ props.node ], true);

      if (result) {
        // TODO: api - destroy file
        await router.push({ name: 'trash' });
      }
    }
  },
];

</script>

<style scoped>

</style>
