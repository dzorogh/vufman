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

    <div
      v-for="(item, index) in listItems"
      :key="index"
      class="grid"
    >
      <Button
        class="!text-left p-button-outlined"
        :class="item.class"
        :label="item.label"
        :icon="item.icon"
        @click="item.command"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import { useNodesStore } from "@/store/nodes";
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps<{
  node: INodeModel;
}>();

const nodesStore = useNodesStore();

const listItems = computed<{
  label: string;
  icon: string;
  class?: string;
  command: () => void;
}[]>(() => {
  const result = [];

  result.push({
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open',
    command: () => {
      // TODO: move
    }
  });

  if (props.node.isTrashed) {
    result.push({
      label: 'Удалить навсегда',
      icon: 'pi pi-fw pi-times',
      class: 'p-button-danger',
      command: () => {
        // TODO: destroy
      }
    });
  } else {
    result.push({
      label: 'Скопировать',
      icon: 'pi pi-fw pi-copy',
      command: () => {
        // TODO: copy
      }
    });

    result.push({
      label: 'Переименовать',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        // TODO: rename
      }
    });

    result.push({
      label: 'Скачать',
      icon: 'pi pi-fw pi-download',
      command: () => {
        // TODO: download
      }
    });

    result.push({
      label: 'В корзину',
      icon: 'pi pi-fw pi-trash',
      class: 'p-button-danger',
      command: () => {
        // TODO: delete
      }
    });
  }


  return result;
});

</script>

<style scoped>

</style>
