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

      <div class="grid grid-cols-4 grow overflow-hidden">
        <div class="col-span-3 flex flex-col overflow-hidden">
          <div class="text-lg font-bold border-b h-16 flex items-center shrink-0 px-4">
            {{ file.getFullName() }}
          </div>

          <div class="overflow-hidden grow bg-gray-800">
            <component
              :is="fileContentComponents[file.getFileType()]"
              :file="file"
            />
          </div>
        </div>

        <div class="border-l p-4 ">
          <AppFileInfo :file="file" />
        </div>
      </div>
    </template>
    <ProgressSpinner
      v-else
      class="!w-7 !h-7 !m-6"
    />
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import api from "@/services/api";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import AppFileBreadCrumbs from "@/components/AppFileBreadCrumbs.vue";
import AppFileContentImage from "@/components/AppFileContentImage.vue";
import AppFileContentVideo from "@/components/AppFileContentVideo.vue";
import AppFileContentDocument from "@/components/AppFileContentDocument.vue";
import AppFileContentArchive from "@/components/AppFileContentArchive.vue";
import AppFileContentAudio from "@/components/AppFileContentAudio.vue";
import AppFileInfo from "@/components/AppFileInfo.vue";
import AppFileClose from "@/components/AppFileClose.vue";
import { INodeClass } from "@/types/INodeClass";

const route = useRoute();

const file = ref<INodeClass | null>();
const isLoading = ref(false);

onBeforeMount(async () => {
  isLoading.value = true;

  file.value = await api.getFile({ id: route.params.fileId as string });

  // console.log(file.value);

  isLoading.value = false;
});


const fileContentComponents = {
  image: AppFileContentImage,
  video: AppFileContentVideo,
  document: AppFileContentDocument,
  archive: AppFileContentArchive,
  audio: AppFileContentAudio
};

</script>

