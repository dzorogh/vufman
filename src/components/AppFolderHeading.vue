<template>
  <div class="bg-white rounded-tl-xl p-4 border-b flex items-center h-20">
    <template v-if="!nodesStore.nodesLoading">
      <AppBreadCrumbs :is-trashed="props.isTrashed" />

      <div class="ml-auto">
        <AppFolderMenu />
      </div>
    </template>

    <ProgressSpinner
      v-else
      class="!w-7 !h-7 !m-0 !ml-2"
    />
  </div>
</template>

<script setup lang="ts">
import AppBreadCrumbs from "@/components/AppFolderBreadCrumbs.vue";
import AppFolderMenu from "@/components/AppFolderMenu.vue";
import { useNodesStore } from "@/store/nodes";
import ProgressSpinner from 'primevue/progressspinner';

const nodesStore = useNodesStore();
const props = defineProps<{
  isTrashed: boolean;
}>();

</script>

<style scoped>

</style>
