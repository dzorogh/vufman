<template>
  <router-link
    v-if="file.ancestors.length"
    v-slot="{ navigate }"
    :to="{ name: 'folder', params: { folderId: file.ancestors[0].id }}"
    custom
  >
    <Button
      class=" p-button-text"
      icon="pi pi-arrow-left"
      :label="file.ancestors[0].name"
      @click="navigate"
    />
  </router-link>

  <router-link
    v-else
    v-slot="{ navigate }"
    :to="{ name: 'root' }"
    custom
  >
    <Button
      class=" p-button-text"
      icon="pi pi-arrow-left"
      :label="`Диск`"
      @click="navigate"
    />
  </router-link>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import { INodeModel } from "@/types/INodeModel";

defineProps<{
  file: INodeModel;
}>();
</script>
