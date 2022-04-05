<template>
  <div
    v-if="!mediaLoadingFailed"
    class="h-full max-h-full flex items-center justify-center"
  >
    <img
      ref="mediaElement"
      class="object-scale-down max-h-full max-w-full"
      :src="props.file.src"
      :alt="props.file.name"
    >
  </div>
  <div
    v-if="mediaLoadingFailed"
    class="flex flex-col items-center justify-center h-full gap-12"
  >
    <IconImage
      class="fill-gray-200 w-64 h-64"
    />

    <div class="text-white">
      Изображение нельзя показать в браузере
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
import { INodeModel } from "@/types/INodeModel";
import IconImage from "@/components/IconImage.vue";
import { onMounted, ref } from "vue";


const props = defineProps<{
  file: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
}>();

const mediaElement = ref();
const mediaLoadingFailed = ref(false);

onMounted(() => {
  mediaElement.value.addEventListener('error', () => {
    mediaLoadingFailed.value = true;
  });
});

</script>

<style scoped>

</style>
