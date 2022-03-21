<template>
  <div
    v-if="file.mimetype === 'text/plain'"
    class="h-full flex flex-col bg-white"
  >
    <textarea
      ref="editor"
      class="w-full grow p-6 bg-gray-50"
      :value="content"
    />

    <div class="p-6">
      <Button
        label="Сохранить"
        @click="saveContent"
      />
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
      <Button
        label="Скачать"
        @click="file.download()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { useMessages } from "@/composables/useMessages";
import IconText from "@/components/IconText.vue";

const messages = useMessages();

const props = defineProps<{
  file: INodeModel;
}>();

const content = ref(props.file.content);
const saveContent = () => {
  // TODO: api - save content
  messages.fileSaved();
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
