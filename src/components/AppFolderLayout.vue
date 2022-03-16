<template>
  <div class="grid grid-cols-4">
    <div
      class="h-full overflow-hidden rounded-l-xl flex flex-col col-span-3"
    >
      <AppFolderHeading :is-trashed="isTrashed" />

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

    <div

      class="bg-white border-l p-6"
    >
      <template v-if="!nodesStore.nodesLoading">
        <AppFolderInfo v-if="nodesStore.currentFolder" />
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
import AppFolderInfo from "@/components/AppFolderInfo.vue";
import { useNodesStore } from "@/store/nodes";
import ProgressSpinner from 'primevue/progressspinner';
import api from "@/services/api";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import AppFolderHeading from "@/components/AppFolderHeading.vue";

const nodesStore = useNodesStore();

const props = defineProps<{
  isTrashed: boolean;
  folderId: string | null;
}>();

watch(() => [ props.isTrashed, props.folderId ],
  async ([ isTrashed, folderId ]) => {
    console.log(isTrashed, folderId);

    nodesStore.nodesLoading = true;
    nodesStore.selectedNodes = [];

    [
      nodesStore.currentFolder,
      nodesStore.nodes
    ] = await Promise.all([
      api.getFolder({ id: folderId as string }),
      api.getNodes({
        folderId: folderId as string || null,
        isTrashed: isTrashed ? true : undefined
      }, true)
    ]);

    nodesStore.nodesLoading = false;
  }, {
    immediate: true
  });


</script>

<style scoped>
</style>
