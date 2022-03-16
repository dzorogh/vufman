<template>
  <div class="flex items-center h-full bg-black overflow-hidden justify-center">
    <audio
      ref="player"
      controls
    >
      <source
        :src="file.src"
        type="audio/mp3"
      >
    </audio>
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
  @apply rounded;
}
</style>
