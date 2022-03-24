<template>
  <div
    v-if="nodesStore.currentFolder"
    class="flex gap-4 items-center"
  >
    <n-tooltip>
      <template #trigger>
        <n-button
          round
          @click="handleClickBack"
        >
          <template #icon>
            <n-icon>
              <ArrowEnterUp24Filled />
            </n-icon>
          </template>
        </n-button>
      </template>

      В родительскую папку
    </n-tooltip>

    <div class="font-bold">
      {{ nodesStore.currentFolder.name }}
    </div>
  </div>

  <div v-else-if="!nodesStore.currentFolder && !props.isTrashed">
    <div class="font-bold ">
      Диск
    </div>
  </div>

  <div v-else>
    <div class="font-bold">
      Корзина
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowEnterUp24Filled } from "@vicons/fluent";
import { useRouter } from "vue-router";
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();
const router = useRouter();

const props = defineProps<{
  isTrashed?: boolean;
}>();

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
