<template>
  <div class="flex items-center flex-wrap gap-4">
    <n-button
      v-if="isTrash"
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
  DeleteDismiss20Filled as IconEmptyTrash
} from "@vicons/fluent";
import { useRoute } from "vue-router";

import AppFolderMenuDynamicActions from "@/components/AppFolderMenuDynamicActions.vue";
import AppFolderMenuStaticActions from "@/components/AppFolderMenuStaticActions.vue";

import { useEmptyTrashInteraction } from "@/composables/useEmptyTrashInteraction";
import { useNodesActions } from "@/composables/useNodesActions";

const route = useRoute();
const nodesActions = useNodesActions();

const props = defineProps<{
  isTrash: boolean;
}>();

const emptyTrash = async () => {
  const result = await nodesActions.emptyTrash();
};

</script>

<style scoped>

</style>
