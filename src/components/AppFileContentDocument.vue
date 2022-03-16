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
    class="flex flex-col items-center justify-center h-full"
  >
    <IconDocument
      :extension="file.extension"
      class="fill-gray-200 w-64 h-64"
    />

    <div class="text-white">
      Документ не поддерживается в браузере
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
import { INodeModel } from "@/types/INodeModel";
import IconDocument from "@/components/IconDocument.vue";

// TODO: And some better PDF api
// Like abobe pdf or mozilla pdf.js

defineProps<{
  file: INodeModel;
}>();
</script>

<style scoped>

</style>
