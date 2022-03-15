<template>
  <h3 class="text-slate-900 mb-2 font-bold">
    Текущая папка
  </h3>

  {{ nodesStore.currentFolder.name }}

  <h3 class="text-slate-900 mb-2 mt-4 font-bold">
    Дата создания
  </h3>

  {{ formatTimestamp(nodesStore.currentFolder.createdAt) }}

  <template v-if="nodesStore.currentFolder.author">
    <h3 class="text-slate-900 mb-2 mt-4 font-bold">
      Создал
    </h3>

    {{ nodesStore.currentFolder.author.fullName }}
  </template>

  <h3 class="text-slate-900 mb-2 mt-4 font-bold">
    Объем
  </h3>

  {{ filesize(nodesStore.currentFolder.size || 0, {locale: 'ru-RU'}) }}
</template>

<script setup lang="ts">
import filesize from 'filesize';
import { formatTimestamp } from '@/formatters/formatTimestamp';
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();

</script>

<style scoped>

</style>
