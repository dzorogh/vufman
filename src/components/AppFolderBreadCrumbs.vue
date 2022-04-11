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
        <div
          class="font-bold flex items-center gap-2"
        >
          <div>
            {{ nodesStore.currentFolder.name }}
          </div>

          <div
            v-if="!nodesStore.currentFolder.canWrite"
            class="opacity-50"
          >
            <IconReadOnly class="w-3 h-3" />
          </div>
        </div>

        <n-tag
          v-if="nodesStore.currentFolder.isTrashed || props.isTrash"
          type="error"
        >
          В корзине
        </n-tag>
      </div>
    </div>

    <div v-else-if="!nodesStore.currentFolder && !props.isTrash && !route.query.search">
      <div class="font-bold ">
        Диск
      </div>
    </div>

    <div
      v-else-if="route.query.search"
      class="flex items-center gap-6"
    >
      <div class="font-bold">
        Поиск: {{ route.query.search }}
      </div>

      <n-button
        size="small"
        @click="resetSearch"
      >
        Сбросить поиск
      </n-button>
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
import { useRoute, useRouter } from "vue-router";
import { useNodesStore } from "@/store/nodes";
import AppFolderMenuSorting from "@/components/AppFolderMenuSorting.vue";
import AppFolderMenuLayoutSelection from "@/components/AppFolderMenuLayoutSelection.vue";
import {
  EditOff16Filled as IconReadOnly
} from "@vicons/fluent";

const nodesStore = useNodesStore();
const router = useRouter();
const route = useRoute();

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

const resetSearch = () => {

};

</script>

<style scoped>

</style>
