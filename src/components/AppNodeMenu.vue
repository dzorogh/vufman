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
import { INodeModel } from "@/types/INodeModel";
import { useNodesStore } from "@/store/nodes";
import Button from "primevue/button";
import { computed } from "vue";
import vTooltip from 'primevue/tooltip';


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
    command: () => {
      // TODO: download
    }
  },
  {
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open',
    command: () => {
      // TODO: move
    }
  },
  {
    show: () => !!props.node.isTrashed,
    label: 'Удалить навсегда',
    icon: 'pi pi-fw pi-times',
    class: 'p-button-danger',
    command: () => {
      // TODO: destroy
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
    command: () => {
      // TODO: rename
    },
    show: () => !props.node.isTrashed,

  },
  {
    label: 'В корзину',
    icon: 'pi pi-fw pi-trash',
    class: 'p-button-danger',
    command: () => {
      // TODO: delete
    },
    show: () => !props.node.isTrashed,
  }
];

</script>

<style scoped>

</style>
