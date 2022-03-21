<template>
  <div class="bg-white rounded-tl-xl p-4 border-b flex flex-wrap items-center">
    <template v-if="!nodesStore.nodesLoading">
      <AppBreadCrumbs
        class="mr-auto"
        :is-trashed="props.isTrashed"
      />

      <div>
        <AppFolderMenu />
      </div>
    </template>

    <ProgressSpinner
      v-else
      class="!w-6 !h-6 !ml-2 !my-3"
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
