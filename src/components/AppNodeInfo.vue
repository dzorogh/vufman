<template>
  <div class="flex flex-col gap-4">
    <AppNodeInfoItem
      v-for="(item, index) in items"
      v-show="item.show ? item.show() : true"
      :key="index"
      :title="item.title"
      :content="item.content"
      :description="item.description"
      :html="item.html"
    />

    <div>
      <n-button
        @click="handleEditComment"
      >
        Изменить комментарий
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@/formatters/formatTimestamp';
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { INodeModel } from "@/types/INodeModel";
import linkifyHtml from 'linkify-html';

const props = defineProps<{
  node: INodeModel;
}>();

const items: {
  title: string;
  content: string;
  description?: string;
  html?: boolean;
  show?: () => boolean;
}[] = [
  {
    title: props.node.isFolder ? 'Текущая папка' : 'Название файла',
    content: props.node.name as string,
  },
  {
    title: 'Расширение файла',
    content: props.node.extension || '(нет)',
    show: () => !props.node.isFolder
  },
  {
    title: 'Тип данных',
    content: props.node.mimetype || 'Неизвестно',
    show: () => !props.node.isFolder
  },
  {
    title: 'Путь',
    content: props.node.getPath()
  },
  {
    title: 'Размер',
    content: props.node.size ? props.node.getSize() : '0 B',
    description: props.node.size && props.node.size >= 1000 ? `${props.node.size} B` : ''
  },
  {
    title: 'Дата создания',
    content: props.node.createdAt ? formatTimestamp(props.node.createdAt) : "Неизвестно"
  },
  {
    title: 'Создал',
    content: props.node.author ? props.node.author.fullName : 'Неизвестно'
  },
  {
    title: 'Комментарий',
    html: true,
    content: props.node.comment ? linkifyHtml(props.node.comment.replace('\n', '<br>')) : '—'
  },
];

const handleEditComment = () => {
  //
};

</script>

<style scoped>

</style>
