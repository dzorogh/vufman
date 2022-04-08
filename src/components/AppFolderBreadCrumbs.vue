<template>
  <div class="flex gap-4 items-center">
    <div
      v-if="nodesStore.currentFolder"
      class="flex gap-4 items-center"
    >
      <n-tooltip v-if="haveAccessToParent">
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

      <div class="font-bold flex gap-4 items-center">
        {{ nodesStore.currentFolder.name }}

        <n-tag
          v-if="nodesStore.currentFolder.isTrashed || props.isTrash"
          type="error"
        >
          В корзине
        </n-tag>
      </div>
    </div>

    <div v-else-if="!nodesStore.currentFolder && !props.isTrash">
      <div class="font-bold ">
        Диск
      </div>
    </div>

    <div v-else>
      <div class="font-bold">
        Корзина
      </div>
    </div>

    <AppFolderMenuSorting class="ml-auto" />
    <AppFolderMenuLayoutSelection />
  </div>
</template>

<script setup lang="ts">
import { ArrowEnterUp24Filled } from "@vicons/fluent";
import { useRouter } from "vue-router";
import { useNodesStore } from "@/store/nodes";
import AppFolderMenuSorting from "@/components/AppFolderMenuSorting.vue";
import AppFolderMenuLayoutSelection from "@/components/AppFolderMenuLayoutSelection.vue";

const nodesStore = useNodesStore();
const router = useRouter();

const props = defineProps<{
  isTrash?: boolean;
}>();

const handleClickBack = () => {
  if (nodesStore.currentFolder) {
    router.push({
      name: 'folder',
      params: {
        folderId: nodesStore.currentFolder.folderId
      },
      query: {
        trash: props.isTrash ? null : undefined
      }
    });
  }
};

const haveAccessToParent = () => {
  if (nodesStore.currentFolder) {
    const parent = nodesStore.currentFolder.getParent();
    
    if (parent) {
      return parent.canRead;
    }
  }

  return true;
};

</script>

<style scoped>

</style>
