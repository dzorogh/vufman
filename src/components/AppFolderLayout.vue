<template>
  <div class="grid grid-cols-5 h-full min-h-full grow rounded-xl overflow-hidden bg-gray-300">
    <suspense>
      <div class="col-span-1 flex flex-col px-4 py-6">
        <h3 class="text-slate-900 mb-2 font-bold px-4">
          Разделы
        </h3>

        <AppNavigator />
      </div>

      <template #fallback>
        <ProgressSpinner class="!w-12 !h-12 !my-10" />
      </template>
    </suspense>

    <div class="col-span-4 h-full overflow-hidden rounded-xl flex flex-col">
      <div class="bg-white rounded-t-xl p-4 border-b flex items-center">
        <template v-if="!nodesStore.nodesLoading">
          <AppBreadCrumbs />

          <div class="ml-auto">
            <AppFolderMenu />
          </div>
        </template>
        <ProgressSpinner
          v-else
          class="!w-12 !h-12 !m-0 !ml-2"
        />
      </div>

      <div class="grow bg-white shadow-sm rounded-b-xl p-4 overflow-auto">
        <AppFolderView v-if="!nodesStore.nodesLoading" />
        <ProgressSpinner
          v-else
          class="!w-12 !h-12 !m-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavigator from "@/components/AppNavigator.vue";
import AppFolderView from "@/components/AppFolderList.vue";
import AppBreadCrumbs from "@/components/AppBreadCrumbs.vue";
import AppFolderMenu from "@/components/AppFolderMenu.vue";
import { useNodesStore } from "@/store/nodes";
import ProgressSpinner from 'primevue/progressspinner';
import api from "@/services/api";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const nodesStore = useNodesStore();

watch(() => {
  return route.params.folderId;
}, async (folderId) => {
  nodesStore.nodesLoading = true;

  [
    nodesStore.currentFolder,
    nodesStore.nodes
  ] = await Promise.all([
    api.getFolder({ id: folderId as string }),
    api.getNodes({ folderId: folderId as string || null })
  ]);

  nodesStore.nodesLoading = false;
}, {
  immediate: true
});


</script>

<style scoped>
</style>
