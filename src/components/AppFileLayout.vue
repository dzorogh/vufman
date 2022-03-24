<template>
  <div class="rounded-xl bg-white flex flex-col overflow-hidden">
    <template v-if="!isLoading">
      <div class="flex items-center border-b p-4 col-span-4">
        <AppFileBreadCrumbs :file="file" />
        <AppFileClose
          class="ml-auto"
          :file="file"
        />
      </div>

      <div class="grid grid-cols-4 grow overflow-auto">
        <div class="col-span-3 flex flex-col overflow-hidden">
          <div class="overflow-hidden grow bg-gray-800">
            <component
              :is="fileContentComponents[file.getFileType()]"
              :file="file"
            />
          </div>
        </div>

        <div class="border-l p-4 flex flex-col gap-10">
          <AppNodeInfo
            :node="file"
          />
          <AppNodeMenu
            :node="file"
            class="mt-auto"
          />
        </div>
      </div>
    </template>
    <div
      v-else
      class="flex grow items-center justify-center"
    >
      <n-spin size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/services/api";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import AppFileBreadCrumbs from "@/components/AppFileBreadCrumbs.vue";
import AppFileContentImage from "@/components/AppFileContentImage.vue";
import AppFileContentVideo from "@/components/AppFileContentVideo.vue";
import AppFileContentDocument from "@/components/AppFileContentDocument.vue";
import AppFileContentText from "@/components/AppFileContentText.vue";
import AppFileContentArchive from "@/components/AppFileContentArchive.vue";
import AppFileContentAudio from "@/components/AppFileContentAudio.vue";
import AppNodeInfo from "@/components/AppNodeInfo.vue";
import AppFileClose from "@/components/AppFileClose.vue";
import { INodeModel } from "@/types/INodeModel";
import AppNodeMenu from "@/components/AppNodeMenu.vue";
import { useNodesStore } from "@/store/nodes";

const route = useRoute();
const nodesStore = useNodesStore();

const file = ref<INodeModel | null>();
const isLoading = ref(false);

onBeforeMount(async () => {
  isLoading.value = true;

  file.value = await api.getFile({ id: route.params.fileId as string });

  if (file.value && file.value.ancestors && file.value.ancestors[0]) {
    nodesStore.currentFolder = file.value.ancestors[0] as INodeModel;
  }

  isLoading.value = false;
});


const fileContentComponents = {
  image: AppFileContentImage,
  video: AppFileContentVideo,
  document: AppFileContentDocument,
  text: AppFileContentText,
  archive: AppFileContentArchive,
  audio: AppFileContentAudio
};

</script>

