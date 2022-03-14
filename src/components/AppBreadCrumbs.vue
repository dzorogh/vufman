<template>
  <div class="">
    <div
      v-if="nodesStore.currentFolder"
      class="flex gap-4 items-center"
    >
      <Button
        class=" p-button-text"
        icon="pi pi-arrow-left"
        @click="handleClickBack"
      />

      <div class="font-bold opacity-50">
        {{ nodesStore.currentFolder.name }}
      </div>
    </div>
    <div v-else>
      <div class="font-bold opacity-50 px-4">
        Диск
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNodesStore } from "@/store/nodes";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const nodesStore = useNodesStore();
const router = useRouter();

const handleClickBack = function () {
  if (nodesStore.currentFolder) {
    if (nodesStore.currentFolder.folderId) {
      router.push({
        name: 'folder',
        params: {
          folderId: nodesStore.currentFolder.folderId
        }
      });
    } else {
      router.push({
        name: 'root',
      });
    }
  }
};

</script>

<style scoped>

</style>
