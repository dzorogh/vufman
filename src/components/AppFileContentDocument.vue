<template>
  <embed
    v-if="file.mimetype === 'application/pdf'"
    :src="file.src"
    type="application/pdf"
    width="100%"
    height="100%"
  >
  <div
    v-else
    class="flex flex-col items-center justify-center h-full gap-12"
  >
    <IconDocument
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
        @click="emit('download')"
      >
        Скачать
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import IconDocument from "@/components/IconDocument.vue";
import { onMounted, ref } from "vue";
import { useMessages } from "@/composables/useMessages";

const messages = useMessages();


// TODO: And some better PDF api
// Like abobe pdf or mozilla pdf.js

const props = defineProps<{
  file: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
  (e: 'download'): void;
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
