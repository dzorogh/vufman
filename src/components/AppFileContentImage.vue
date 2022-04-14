<template>
  <div class="h-full relative">
    <div
      v-if="!mediaLoadingFailed"
      class="h-full max-h-full flex items-center justify-center"
    >
      <img
        ref="mediaElement"
        class="object-scale-down max-h-full max-w-full select-none"
        :src="props.file.src"
        :alt="props.file.name"
        draggable="false"
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
          @click="emit('download')"
        >
          Скачать
        </n-button>
      </div>
    </div>

    <div
      v-if="prevSibling"
      class="w-12 absolute left-0 h-full top-0 flex items-center opacity-20 hover:opacity-100 cursor-pointer bg-gray-900/10 hover:bg-gray-900/30"
      @click="goToPrev"
    >
      <IconLeft class="w-12 text-black" />
    </div>

    <div
      v-if="nextSibling"
      class="w-12 absolute right-0 h-full top-0 flex items-center opacity-20 hover:opacity-100 cursor-pointer bg-gray-900/10 hover:bg-gray-900/30"
      @click="goToNext"
    >
      <IconRight class="w-12 text-black" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import IconImage from "@/components/IconImage.vue";
import { computed, onMounted, ref } from "vue";
import { useApi } from "@/composables/useApi";
import { useNodesStore } from "@/store/nodes";
import { sortNodes } from "@/services/sortNodes";
import { ArrowCircleLeft12Filled as IconLeft, ArrowCircleRight12Filled as IconRight } from "@vicons/fluent";
import { useRouter } from "vue-router";

const api = useApi();
const nodesStore = useNodesStore();
const router = useRouter();

const props = defineProps<{
  file: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
  (e: 'download'): void;
}>();

const mediaElement = ref();
const mediaLoadingFailed = ref(false);
const siblings = ref<INodeModel[]>([]);

onMounted(async () => {
  mediaElement.value.addEventListener('error', () => {
    mediaLoadingFailed.value = true;
  });

  siblings.value = await api.nodes({
    folderId: props.file.folderId,
    isTrashed: props.file.isTrashed
  });
});

const siblingsSorted = computed(() => {
  return sortNodes(siblings.value, nodesStore.sorting, nodesStore.sortingDirection).filter(item => item.getFileType() === 'image');
});

const currentIndex = computed(() => {
  return siblingsSorted.value.findIndex(node => props.file.id === node.id);
});

const nextSibling = computed(() => {
  if (currentIndex.value === -1) {
    return null;
  }

  if (currentIndex.value < siblingsSorted.value.length - 1) {
    return siblingsSorted.value[currentIndex.value + 1];
  } else {
    return siblingsSorted.value[0];
  }
});

const prevSibling = computed(() => {
  console.log(currentIndex, siblingsSorted.value, props.file);

  if (currentIndex.value === -1) {
    return null;
  }

  if (currentIndex.value > 0) {
    return siblingsSorted.value[currentIndex.value - 1];
  } else {
    return siblingsSorted.value[siblingsSorted.value.length - 1];
  }
});

const goToPrev = () => {
  if (prevSibling.value) {
    router.push({
      name: 'file',
      params: {
        fileId: prevSibling.value.id
      }
    });
  }
};

const goToNext = () => {
  if (nextSibling.value) {
    router.push({
      name: 'file',
      params: {
        fileId: nextSibling.value.id
      }
    });
  }
};

</script>

<style scoped>

</style>
