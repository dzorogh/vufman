<template>
  <div class="flex items-center flex-wrap gap-4 overflow-hidden">
    <n-button
      size="small"
      @click="handleReload"
    >
      <template #icon>
        <n-icon>
          <icon-reload />
        </n-icon>
      </template>
    </n-button>

    <n-button
      v-if="isTrash && store.currentUser && store.currentUser.isAdmin"
      size="small"
      ghost
      type="error"
      class="mr-auto"
      @click="emptyTrash"
    >
      <template #icon>
        <IconEmptyTrash />
      </template>

      Очистить корзину
    </n-button>

    <AppFolderMenuStaticActions
      v-if="!isTrash"
      class="mr-auto"
    />

    <AppFolderMenuDynamicActions :is-trash="isTrash" />
  </div>
</template>

<script setup lang="ts">
import {
  DeleteDismiss20Filled as IconEmptyTrash,
  ArrowClockwise12Filled as IconReload
} from "@vicons/fluent";
import { useRoute } from "vue-router";

import AppFolderMenuDynamicActions from "@/components/AppFolderMenuDynamicActions.vue";
import AppFolderMenuStaticActions from "@/components/AppFolderMenuStaticActions.vue";

import { useNodesActions } from "@/composables/useNodesActions";
import { useNodesStore } from "@/store/nodes";
import { useStore } from "@/store/main";

const nodesActions = useNodesActions();
const store = useStore();

const props = defineProps<{
  isTrash: boolean;
}>();

const emit = defineEmits<{
  (e: 'reload'): void;
}>();

const emptyTrash = async () => {
  const result = await nodesActions.emptyTrash();
};

const handleReload = async () => {
  await emit('reload');
};

</script>

<style scoped>

</style>
