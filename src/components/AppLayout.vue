<template>
  <n-config-provider
    :theme="darkTheme"
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
        class="grid grid-cols-5 h-full min-h-full grow border rounded-xl overflow-hidden"
      >
        <div
          class="col-span-1 flex flex-col px-4 pb-4 py-6 gap-6 overflow-auto grow bg-slate-700"
        >
          <AppNavigator />

          <router-link
            v-slot="{ isActive, navigate }"
            :to="{name: 'log'}"
            custom
          >
            <n-button
              v-if="userIsAdmin"
              tertiary
              type="primary"
              :disabled="isActive"
              @click="navigate"
            >
              <template #icon>
                <n-icon>
                  <IconLog />
                </n-icon>
              </template>
              Лог действий
            </n-button>
          </router-link>

          <n-card
            v-if="fileList.length"
            class="bg-slate-600"
            title="Загрузка файлов"
          >
            <n-upload-file-list />
          </n-card>
        </div>

        <n-config-provider
          :theme="lightTheme"
          class="col-span-4 h-full min-h-full"
        >
          <router-view class="h-full min-h-full bg-white" />
        </n-config-provider>
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
  </n-config-provider>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { UploadFileInfo } from "naive-ui";
import { useApi } from "@/composables/useApi";
import AppNavigator from "@/components/AppNavigator.vue";
import { ClipboardBulletListRtl16Regular as IconLog } from "@vicons/fluent";
import { darkTheme, lightTheme } from 'naive-ui';

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

const userIsAdmin = () => {
  return true;
  // TODO: Get current user
};

</script>

<style scoped>

</style>
