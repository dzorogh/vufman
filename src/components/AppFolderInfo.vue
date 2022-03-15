<template>
  <div class="flex flex-col gap-4">
    <AppNodeInfoItem
      title="Текущая папка"
      :content="nodesStore.currentFolder.name"
    />

    <AppNodeInfoItem
      title="Дата создания"
      :content="formatTimestamp(nodesStore.currentFolder.createdAt)"
    />

    <AppNodeInfoItem
      v-if="nodesStore.currentFolder.author"
      title="Создал"
      :content="nodesStore.currentFolder.author.fullName"
    />

    <AppNodeInfoItem
      v-if="nodesStore.currentFolder.author"
      title="Размер"
      :content="filesize(nodesStore.currentFolder.size || 0, {locale: 'ru-RU'})"
    />
  </div>
</template>

<script setup lang="ts">
import filesize from 'filesize';
import { formatTimestamp } from '@/formatters/formatTimestamp';
import { useNodesStore } from "@/store/nodes";
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";

const nodesStore = useNodesStore();

</script>

<style scoped>

</style>
