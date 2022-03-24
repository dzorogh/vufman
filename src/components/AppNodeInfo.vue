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
        v-if="!node.isTrashed"
        @click="showEditComment = true"
      >
        Изменить комментарий
      </n-button>

      <n-modal
        v-model:show="showEditComment"
        class="custom-card"
        preset="card"
        style="width: 800px"
        title="Комментарий"
        :bordered="false"
        size="huge"
      >
        <div
          v-if="!showCommentEditor"
          v-html="props.node.comment ? linkifyHtml(newComment.replace('\n', '<br>'), {target: '_blank'}) : '—'"
        />
        <div v-else>
          <n-input
            v-model:value="newComment"
            type="textarea"
            placeholder="Комментарий"
            :autosize="{
              minRows: 3
            }"
          />
        </div>

        <template #footer>
          <div class="flex gap-4">
            <n-button
              v-if="!showCommentEditor"
              @click="showCommentEditor = true"
            >
              Редактировать
            </n-button>
            <n-button
              v-else
              @click="showCommentEditor = false"
            >
              Предпросмотр
            </n-button>
            <n-button @click="saveComment">
              Сохранить
            </n-button>
            <n-button @click="showEditComment = false">
              Закрыть
            </n-button>
          </div>
        </template>
      </n-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@/formatters/formatTimestamp';
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { INodeModel } from "@/types/INodeModel";
import linkifyHtml from 'linkify-html';
import { ref } from "vue";
import { useMessages } from "@/composables/useMessages";

const messages = useMessages();

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

const showCommentEditor = ref(false);
const showEditComment = ref(false);
const newComment = ref(props.node.comment);
const saveComment = () => {
  console.log('saveComment',);
  // TODO: api - save comment

  messages.commentSaved();
  showEditComment.value = false;
};

</script>

<style scoped>

</style>
