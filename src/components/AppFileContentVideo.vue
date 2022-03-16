<template>
  <div
    v-if="!mediaLoadingFailed"
    class="flex items-center h-full bg-black overflow-hidden justify-center"
  >
    <video
      ref="player"
      playsinline
      controls
    >
      <source
        ref="source"
        :src="props.file.src"
        :type="props.file.mimetype"
      >
    </video>
  </div>
  <div
    v-if="mediaLoadingFailed"
    class="flex items-center justify-center h-full flex-col gap-12"
  >
    <IconVideo
      class="fill-gray-200 w-64 h-64"
      @click="handleDownloadClick"
    />

    <div class="text-white">
      Видео не воспроизводится в браузере
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
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import { INodeClass } from "@/types/INodeClass";
import { onMounted, ref } from "vue";
import IconVideo from "@/components/IconVideo.vue";
import Button from "primevue/button";

const props = defineProps<{
  file: INodeClass;
}>();

const mediaLoadingFailed = ref(false);
const player = ref();
const source = ref();

onMounted(() => {
  source.value.addEventListener('error', () => {
    // When source file is not supported in browser
    mediaLoadingFailed.value = true;
  });

  const plyr = new Plyr(player.value);
});
</script>

<style scoped>
::v-deep(.plyr) {
  height: 100%;
}
</style>
