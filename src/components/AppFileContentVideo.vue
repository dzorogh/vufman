<template>
  <div class="flex items-center h-full bg-black overflow-hidden justify-center">
    <video
      ref="player"
      playsinline
      controls
    >
      <source
        :src="props.file.src"
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script setup lang="ts">
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import { INodeClass } from "@/types/INodeClass";
import { onMounted, ref } from "vue";

const props = defineProps<{
  file: INodeClass;
}>();

const player = ref();

onMounted(() => {
  const plyr = new Plyr(player.value);
});
</script>

<style scoped>
::v-deep(.plyr) {
  height: 100%;
}
</style>
