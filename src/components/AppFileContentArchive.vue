<template>
  <div class="flex flex-col items-center justify-center h-full gap-12">
    <IconArchive
      :extension="file.extension"
      class="fill-gray-200 w-64 h-64"
    />

    <div>
      <n-button
        class="bg-white"
        size="large"
        @click="emit('download')"
      >
        Скачать архив
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import IconArchive from "@/components/IconArchive.vue";

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
  (e: 'download'): void;
}>();

const props = defineProps<{
  file: INodeModel;
}>();


</script>

<style scoped>

</style>
