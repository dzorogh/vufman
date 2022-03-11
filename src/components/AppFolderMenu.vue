<template>
  <div class="flex gap-2">
    <Button
      v-tooltip.bottom="'Новая папка'"
      class="p-button-raised p-button-success p-button-text"
      icon="pi pi-folder"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Переместить'"
      class="p-button-raised p-button-secondary p-button-text"
      icon="pi pi-folder-open"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Копировать'"
      class="p-button-raised p-button-secondary p-button-text"
      icon="pi pi-copy"
      @click="nodesStore.copyNodes"
    />

    <Button
      v-if="nodesStore.copiedNodes.length"
      v-tooltip.bottom="'Вставить'"
      class="p-button-raised p-button-text"
      icon="pi pi-copy"
      @click="nodesStore.pasteNodes"
    />

    <Button
      v-if="nodesStore.selectedNodes.length === 1"
      v-tooltip.bottom="'Переименовать'"
      class="p-button-raised p-button-secondary  p-button-text"
      icon="pi pi-pencil"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Скачать'"
      class="p-button-raised p-button-secondary  p-button-text"
      icon="pi pi-download"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Переместить в корзину'"
      class="p-button-raised p-button-secondary p-button-text"
      icon="pi pi-trash"
    />

    <Button
      v-if="nodesStore.selectedNodes.length"
      v-tooltip.bottom="'Удалить навсегда'"
      class="p-button-raised p-button-danger p-button-text"
      icon="pi pi-times"
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
