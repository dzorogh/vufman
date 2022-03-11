<template>
  <div class="p-buttonset">
    <Button
      v-tooltip.bottom="'Новая папка'"
      class="p-button-success p-button-text"
      icon="pi pi-folder"
      @click="nodesStore.makeFolder"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Переместить'"
      class="p-button-secondary p-button-text"
      icon="pi pi-folder-open"
      @click="nodesStore.moveNodes"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Копировать'"
      class="p-button-secondary p-button-text"
      icon="pi pi-copy"
      @click="nodesStore.copyNodes"
    />

    <Button
      v-if="nodesStore.copiedNodes.length"
      v-tooltip.bottom="'Вставить'"
      class="p-button-text"
      icon="pi pi-copy"
      @click="nodesStore.pasteNodes"
    />

    <Button
      v-if="nodesStore.selectedNodes.length === 1"
      v-tooltip.bottom="'Переименовать'"
      class="p-button-secondary  p-button-text"
      icon="pi pi-pencil"
      @click="nodesStore.renameNode"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Скачать'"
      class="p-button-secondary  p-button-text"
      icon="pi pi-download"
      @click="nodesStore.downloadNodes"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Переместить в корзину'"
      class="p-button-secondary p-button-text"
      icon="pi pi-trash"
      @click="nodesStore.deleteNodes"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Удалить навсегда'"
      class="p-button-danger p-button-text"
      icon="pi pi-times"
      @click="nodesStore.destroyNodes"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import vTooltip from 'primevue/tooltip';
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();
</script>

<style scoped>

</style>
