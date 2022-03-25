<template>
  <div
    class="h-full min-h-full relative"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <n-upload
      v-model:file-list="fileList"
      :abstract="true"
      :multiple="true"
      :custom-request="api.upload"
      :show-remove-button="false"
    >
      <div
        class="grid grid-cols-5 h-full min-h-full grow rounded-xl overflow-hidden bg-gray-200"
      >
        <div class="col-span-1 flex flex-col px-4 py-6 gap-12 overflow-auto">
          <AppNavigator />

          <n-card
            v-if="fileList.length"
            title="Загрузка файлов"
          >
            <n-upload-file-list />
          </n-card>
        </div>

        <router-view class="col-span-4 h-full min-h-full bg-white" />
      </div>
    </n-upload>

    <n-upload
      v-show="showDropArea"
      v-model:file-list="fileList"
      :multiple="true"
      :custom-request="api.upload"
      :show-remove-button="false"
    >
      <n-upload-dragger
        class="absolute right-6 bottom-6 left-6 top-6 w-auto flex items-center justify-center"
        @dragleave="handleDragLeave"
        @dragover="handleDragOver"
        @drop="handleDrop"
      >
        Перетащите файлы, чтобы загрузить
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { UploadFileInfo } from "naive-ui";
import { useApi } from "@/composables/api";
import AppNavigator from "@/components/AppNavigator.vue";

const fileList = ref<Array<UploadFileInfo>>([]);
const showDropArea = ref(false);

const api = useApi();

const handleDragEnter = (e: DragEvent) => {
  // e.preventDefault();
  // console.log('dragEnter', e);
  showDropArea.value = true;
};

const handleDragOver = (e: DragEvent) => {
  // e.preventDefault();
  // console.log('dragOver', e);
  showDropArea.value = true;
};

const handleDragLeave = async (e: DragEvent) => {
  // e.preventDefault();
  // console.log('dragLeave', e);
  showDropArea.value = false;
};

const handleDrop = async (e: DragEvent) => {
  e.preventDefault();
  // console.log('drop', e);
  showDropArea.value = false;
};

</script>

<style scoped>

</style>
