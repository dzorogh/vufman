<template>
  <div class="col-span-4 h-full bg-white">
    <template v-if="isLoading">
      <div class="flex items-center justify-center h-full">
        <n-spin size="large" />
      </div>
    </template>
    <template v-else>
      <div
        v-if="file"
        class="flex flex-col overflow-hidden divide-y h-full"
      >
        <AppFileHeading :file="file" />
        <div class="grid grid-cols-4 grow overflow-hidden">
          <div class="col-span-3 flex flex-col overflow-auto">
            <div
              v-if="file.getFileType()"
              class="overflow-hidden grow bg-gray-800"
            >
              <component
                :is="getFileContentComponent(file.getFileType())"
                :file="file"
              />
            </div>
          </div>

          <div class="border-l p-4 flex flex-col gap-10 overflow-auto">
            <AppNodeMenu
              :node="file"
              class="mb-auto"
            />
            <AppNodeInfo
              :node="file"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import AppFileContentImage from "@/components/AppFileContentImage.vue";
import AppFileContentVideo from "@/components/AppFileContentVideo.vue";
import AppFileContentDocument from "@/components/AppFileContentDocument.vue";
import AppFileContentText from "@/components/AppFileContentText.vue";
import AppFileContentArchive from "@/components/AppFileContentArchive.vue";
import AppFileContentAudio from "@/components/AppFileContentAudio.vue";
import AppNodeInfo from "@/components/AppNodeInfo.vue";
import { INodeModel } from "@/types/INodeModel";
import AppNodeMenu from "@/components/AppNodeMenu.vue";
import { useNodesStore } from "@/store/nodes";
import AppFileHeading from "@/components/AppFileHeading.vue";

const api = useApi();
const route = useRoute();
const nodesStore = useNodesStore();

const file = ref<INodeModel | null>();
const isLoading = ref(false);

onBeforeMount(async () => {
  isLoading.value = true;

  file.value = await api.file({ id: route.params.fileId as string });

  if (file.value && file.value.ancestors && file.value.ancestors[0]) {
    nodesStore.currentFolder = file.value.ancestors[0] as INodeModel;
  }

  isLoading.value = false;
});

const getFileContentComponent = (type: keyof typeof fileContentComponents | null) => {
  if (type !== null) {
    return fileContentComponents[type];
  }
};

const fileContentComponents = {
  image: AppFileContentImage,
  video: AppFileContentVideo,
  document: AppFileContentDocument,
  text: AppFileContentText,
  archive: AppFileContentArchive,
  audio: AppFileContentAudio
};

</script>

