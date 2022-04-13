<template>
  <div
    class="flex flex-col divide-y"
    :class="{'bg-slate-50': !isTrash, 'bg-orange-50': isTrash}"
  >
    <template v-if="!nodesStore.nodesLoading">
      <div class="py-4 px-4">
        <AppBreadCrumbs
          class="mr-auto"
          :is-trash="props.isTrash"
        />
      </div>

      <div
        class="py-4 px-4"
      >
        <AppFolderMenu
          :is-trash="props.isTrash"
          @reload="handleReload"
        />
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
  isTrash: boolean;
}>();
const emit = defineEmits<{
  (e: 'reload'): void;
}>();

const handleReload = () => {
  emit('reload');
};

</script>

<style scoped>

</style>
