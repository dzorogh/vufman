<template>
  <div class="flex flex-col gap-4">
    <AppNodeInfoItem
      title="Название файла"
      :content="file.name"
    />

    <AppNodeInfoItem
      title="Расширение файла"
      :content="file.extension"
    />

    <AppNodeInfoItem
      title="Тип данных"
      :content="file.mimetype"
    />

    <AppNodeInfoItem
      title="Папка"
      :content="file.ancestors[0] ? file.ancestors[0].name : '—'"
    />

    <AppNodeInfoItem
      title="Размер"
      :content="`${file.getSize()}`"
      :description="file.size >= 1000 ?`${file.size} B` : null"
    />
  </div>
</template>

<script setup lang="ts">
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { defineProps } from "vue";
import { INodeModel } from "@/types/INodeModel";

defineProps<{
  file: INodeModel;
}>();

</script>

<style scoped>

</style>
