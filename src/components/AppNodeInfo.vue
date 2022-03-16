<template>
  <div class="flex flex-col gap-4">
    <AppNodeInfoItem
      v-if="node.isFolder"
      title="Текущая папка"
      :content="node.name"
    />

    <AppNodeInfoItem
      v-else
      title="Название файла"
      :content="node.name"
    />

    <AppNodeInfoItem
      v-if="!node.isFolder"
      title="Расширение файла"
      :content="node.extension"
    />

    <AppNodeInfoItem
      v-if="!node.isFolder"
      title="Тип данных"
      :content="node.mimetype"
    />

    <AppNodeInfoItem
      title="Родительская папка"
      :content="node.getParentName()"
    />

    <AppNodeInfoItem
      title="Размер"
      :content="`${node.getSize()}`"
      :description="node.size >= 1000 ?`${node.size} B` : null"
    />

    <AppNodeInfoItem
      title="Дата создания"
      :content="formatTimestamp(node.createdAt)"
    />

    <AppNodeInfoItem
      v-if="node.author"
      title="Создал"
      :content="node.author.fullName"
    />
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@/formatters/formatTimestamp';
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { INodeModel } from "@/types/INodeModel";


const props = defineProps<{
  node: INodeModel;
}>();

</script>

<style scoped>

</style>
