<template>
  <div class="flex flex-col gap-4">
    <AppNodeInfoItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :content="item.content"
      :description="item.description"
    />
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@/formatters/formatTimestamp';
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { INodeModel } from "@/types/INodeModel";
import { computed } from "vue";

const props = defineProps<{
  node: INodeModel;
}>();

const items = computed(() => {
  const result = [] as {
    title: string;
    content: string;
    description?: string;
  }[];

  result.push({
    title: props.node.isFolder ? 'Текущая папка' : 'Название файла',
    content: props.node.name as string
  });

  if (!props.node.isFolder) {
    result.push({
      title: 'Расширение файла',
      content: props.node.extension || '(нет)'
    });

    result.push({
      title: 'Тип данных',
      content: props.node.mimetype || 'Неизвестно'
    });
  }

  result.push({
    title: 'Родительская папка',
    content: props.node.getParentName()
  });

  result.push({
    title: 'Путь',
    content: props.node.getPath()
  });

  result.push({
    title: 'Размер',
    content: props.node.size ? props.node.getSize() : '0 B',
    description: props.node.size && props.node.size >= 1000 ? `${props.node.size} B` : ''
  });

  result.push({
    title: 'Дата создания',
    content: props.node.createdAt ? formatTimestamp(props.node.createdAt) : "Неизвестно"
  });

  result.push({
    title: 'Создал',
    content: props.node.author ? props.node.author.fullName : 'Неизвестно'
  });

  return result;
});

</script>

<style scoped>

</style>
