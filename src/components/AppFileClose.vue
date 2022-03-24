<template>
  <div>
    <router-link
      v-slot="{ navigate }"
      :to="file.ancestors.length ? { name: 'folder', params: { folderId: file.ancestors[0].id }} : { name: 'root' }"
      custom
    >
      <n-button
        circle
        @click="navigate"
      >
        <template #icon>
          <n-icon>
            <Dismiss24Filled />
          </n-icon>
        </template>
      </n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import {
  Dismiss24Filled
} from "@vicons/fluent";
import { INodeModel } from "@/types/INodeModel";

defineProps<{
  file: INodeModel;
}>();

</script>

<style scoped>

</style>
