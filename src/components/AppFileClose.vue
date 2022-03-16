<template>
  <div>
    <router-link
      v-slot="{ navigate }"
      :to="file.ancestors.length ? { name: 'folder', params: { folderId: file.ancestors[0].id }} : { name: 'root' }"
      custom
    >
      <Button
        class="p-button-text p-button-secondary p-button-plain p-button-rounded"
        icon="pi pi-times"
        @click="navigate"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { INodeModel } from "@/types/INodeModel";

defineProps<{
  file: INodeModel;
}>();

</script>

<style scoped>

</style>
