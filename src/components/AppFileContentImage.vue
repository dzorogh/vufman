<template>
  <div class="h-full max-h-full p-6 flex items-center justify-center">
    <img
      class="object-scale-down max-h-full max-w-full"
      :src="props.file.src"
      :alt="props.file.name"
    >
  </div>
</template>

<script setup lang="ts">
import { INodeClass } from "@/types/INodeClass";

const props = defineProps<{
  file: INodeClass;
}>();
</script>

<style scoped>

</style>
