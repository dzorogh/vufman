<template>
  <embed
    v-if="file.mimetype === 'application/pdf'"
    :src="file.src"
    type="application/pdf"
    width="100%"
    height="100%"
  >
  <div
    v-else
    class="flex items-center justify-center h-full"
  >
    <IconDocument
      :extension="file.extension"
      class="fill-gray-200 w-64 h-64"
    />
  </div>
</template>

<script setup lang="ts">
import { INodeClass } from "@/types/INodeClass";
import IconDocument from "@/components/IconDocument.vue";

// TODO: And some better PDF api
// Like abobe pdf or mozilla pdf.js

defineProps<{
  file: INodeClass;
}>();
</script>

<style scoped>

</style>
