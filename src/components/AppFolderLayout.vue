<template>
  <div class="grid grid-cols-4">
    <div
      class="h-full overflow-hidden rounded-l-xl flex flex-col col-span-3"
    >
      <AppFolderHeading :is-trashed="!!route.meta.isTrash" />

      <div class="grow bg-white shadow-sm rounded-bl-xl p-4 overflow-auto">
        <AppFolderView v-if="!nodesStore.nodesLoading" />

        <div
          v-else
          class="flex item-center justify-center h-full min-h-full"
        >
          <div class="flex items-center justify-center">
            <ProgressSpinner
              class="!w-24 !h-24 !m-4"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white flex flex-col border-l p-6 gap-10 overflow-auto">
      <template v-if="!nodesStore.nodesLoading">
        <AppNodeInfo
          v-if="nodesStore.currentFolder"
          :node="nodesStore.currentFolder"
        />
        <AppNodeMenu
          v-if="nodesStore.currentFolder"
          class="mt-auto"
          :node="nodesStore.currentFolder"
        />
      </template>

      <ProgressSpinner
        v-else
        class="!w-7 !h-7 !m-0 !ml-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFolderView from "@/components/AppFolderList.vue";
import AppNodeInfo from "@/components/AppNodeInfo.vue";
import AppNodeMenu from "@/components/AppNodeMenu.vue";
import { useNodesStore } from "@/store/nodes";
import ProgressSpinner from 'primevue/progressspinner';
import api from "@/services/api";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import AppFolderHeading from "@/components/AppFolderHeading.vue";
import { useStorage } from "@vueuse/core";
import { FolderLayoutType } from "@/types/FolderLayoutType";

const nodesStore = useNodesStore();
const route = useRoute();

watch(() => [ route.meta.isRoot, route.meta.isTrash, route.params.folderId ],
  async ([ isRoot, isTrash, folderId ]) => {

    nodesStore.nodesLoading = true;
    nodesStore.selectedNodes = [];

    const [ currentFolder, nodes ] = await Promise.all([
      api.getFolder({ id: folderId as string }),
      api.getNodes({
        folderId: folderId as string || null,
        isTrashed: isTrash ? true : undefined
      }, true)
    ]);

    if (currentFolder) {
      nodesStore.currentFolder = currentFolder;
    }

    nodesStore.nodes = nodes;

    nodesStore.nodesLoading = false;
  }, {
    immediate: true
  });

</script>

<style scoped>
</style>
