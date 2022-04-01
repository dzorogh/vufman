<template>
  <div
    v-if="file.mimetype === 'text/plain'"
    class="h-full flex flex-col bg-white"
  >
    <n-input
      ref="editor"
      v-model:value="content"
      class="w-full grow p-6 shadow-inner font-mono resize-none rounded-none"
      type="textarea"
    />

    <div class="p-6">
      <n-button
        size="large"
        :loading="loading"
        @click="saveContent"
      >
        Сохранить
      </n-button>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center h-full gap-12"
  >
    <IconText
      :extension="file.extension"
      class="fill-gray-200 w-64 h-64"
    />

    <div class="text-white">
      Документ не поддерживается в браузере
    </div>

    <div>
      <n-button
        class="bg-white"
        size="large"
        @click="file.download()"
      >
        Скачать
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import { onMounted, ref } from "vue";
import { useMessages } from "@/composables/useMessages";
import IconText from "@/components/IconText.vue";
import { useNodesActions } from "@/composables/useNodesActions";

const nodesActions = useNodesActions();

const props = defineProps<{
  file: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
}>();

const loading = ref(false);
const content = ref(props.file.content);
const saveContent = async () => {
  loading.value = true;

  const result = await nodesActions.saveContent(props.file, content.value || '');

  if (result) {
    // content.value = result.content || '';
    emit('fileChange', result);
  }

  loading.value = false;
};

const editor = ref();

onMounted(() => {
  if (editor.value) {
    editor.value.focus();
  }
});

</script>

<style scoped>

</style>
