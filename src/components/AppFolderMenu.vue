<template>
  <div class="flex items-center gap-4">
    <div class="flex">
      <Button
        v-for="(item, index) in list"
        v-show="item.show()"
        :key="index"
        v-tooltip.bottom="item.tooltip"
        :class="item.class"
        :icon="item.icon"
        @click="item.action"
      />
    </div>

    <span class="p-buttonset flex">
      <Button
        v-for="(item, index) in layoutOptions"
        :key="index"
        v-tooltip.bottom="item.title"
        :icon="item.icon"
        class="p-button-secondary p-button-sm	"
        :class="{'p-button-outlined' : item.value !== nodesStore.layout}"
        @click="selectLayout(item.value)"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import vTooltip from 'primevue/tooltip';
import { useNodesStore } from "@/store/nodes";
import { ref } from "vue";
import { FolderLayoutType } from "@/types/FolderLayoutType";
import { useRoute } from "vue-router";

const route = useRoute();

const nodesStore = useNodesStore();
const list = [
  {
    show: () => true,
    tooltip: 'Новая папка',
    icon: 'pi pi-folder',
    class: 'p-button-success p-button-text',
    action: nodesStore.makeFolder,
  },
  {
    show: () => true,
    tooltip: 'Создать текстовый файл',
    icon: 'pi pi-file',
    class: 'p-button-success p-button-text',
    action: nodesStore.makeFile,
  },
  {
    show: () => nodesStore.nodes.length,
    tooltip: 'Выделить все',
    icon: 'pi pi-check-square',
    class: 'p-button-secondary p-button-text',
    action: nodesStore.selectAllNodes,
  },
  {
    show: () => nodesStore.selectedNodes.length,
    tooltip: 'Переместить',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-folder-open',
    action: nodesStore.moveNodes
  },
  {
    show: () => nodesStore.selectedNodes.length,
    tooltip: 'Копировать',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-copy',
    action: nodesStore.copyNodes
  },
  {
    show: () => nodesStore.copiedNodes.length,
    tooltip: 'Вставить',
    class: 'p-button-text',
    icon: 'pi pi-copy',
    action: nodesStore.pasteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length === 1,
    tooltip: 'Переименовать',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-pencil',
    action: nodesStore.renameNode
  },
  {
    show: () => nodesStore.selectedNodes.length,
    tooltip: 'Скачать',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-download',
    action: nodesStore.downloadNodes
  },
  {
    show: () => nodesStore.selectedNodes.length,
    tooltip: 'Переместить в корзину',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-trash',
    action: nodesStore.deleteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && route.meta.isTrash,
    tooltip: 'Удалить навсегда',
    class: 'p-button-secondary p-button-text',
    icon: 'pi pi-times',
    action: nodesStore.destroyNodes
  }
];

const layoutOptions = ref<{
  icon: string;
  value: FolderLayoutType;
  title: string;
}[]>([
  { icon: 'pi pi-list', value: 'list', title: 'В виде списка' },
  { icon: 'pi pi-th-large', value: 'grid', title: 'В виде сетки' },
  { icon: 'pi pi-table', value: 'table', title: 'В виде таблицы' },
]);

const selectLayout = (value: FolderLayoutType) => {
  nodesStore.layout = value;
};

</script>

<style scoped>

</style>
