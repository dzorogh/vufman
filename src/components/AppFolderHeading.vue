<template>
  <div class="bg-slate-50 flex flex-col divide-y">
    <template v-if="!nodesStore.nodesLoading">
      <div class="py-4 px-4">
        <AppBreadCrumbs
          class="mr-auto"
          :is-trashed="props.isTrashed"
        />
      </div>

      <div class="py-4 px-4">
        <AppFolderMenu />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AppBreadCrumbs from "@/components/AppFolderBreadCrumbs.vue";
import AppFolderMenu from "@/components/AppFolderMenu.vue";
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();
const props = defineProps<{
  isTrashed: boolean;
}>();

</script>

<style scoped>

</style>
