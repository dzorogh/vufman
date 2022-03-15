<template>
  <div class="grid grid-cols-4">
    <div
      class="h-full overflow-hidden rounded-l-xl flex flex-col col-span-3"
    >
      <AppFolderHeading :is-trashed="props.isTrashed" />

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
import { watch } from "vue";
import AppFolderHeading from "@/components/AppFolderHeading.vue";

const route = useRoute();
const nodesStore = useNodesStore();

const props = defineProps<{
  isTrashed?: boolean;
}>();

watch(() => {
  return [
    route.params.folderId,
    props.isTrashed
  ];
}, async ([ folderId, isTrashed ]) => {
  nodesStore.nodesLoading = true;

  [
    nodesStore.currentFolder,
    nodesStore.nodes
  ] = await Promise.all([
    api.getFolder({ id: folderId as string }),
    api.getNodes({
      folderId: folderId as string || null,
      isTrashed: isTrashed ? true : undefined
    })
  ]);

  nodesStore.nodesLoading = false;
}, {
  immediate: true
});


</script>

<style scoped>
</style>
