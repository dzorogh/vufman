<template>
  <div
    v-if="!mediaLoadingFailed"
    class="flex items-center h-full bg-black overflow-hidden justify-center"
  >
    <audio
      ref="player"
      controls
    >
      <source
        ref="source"
        :src="file.src"
        type="audio/mp3"
      >
    </audio>
  </div>
  <div
    v-if="mediaLoadingFailed"
    class="flex items-center justify-center h-full gap-12"
  >
    <IconAudio
      class="fill-gray-200 w-64 h-64"
    />

    <div class="text-white">
      Аудио не воспроизводится в браузере
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
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import { INodeModel } from "@/types/INodeModel";
import { onMounted, ref } from "vue";
import IconAudio from "@/components/IconAudio.vue";


const props = defineProps<{
  file: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
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
  @apply rounded;
}
</style>
