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

import { useEmptyTrashAction } from "@/composables/useEmptyTrashAction";

const route = useRoute();
const emptyTrashAction = useEmptyTrashAction();
const props = defineProps<{
  isTrash: boolean;
}>();

const emptyTrash = async () => {
  console.log('emptyTrash');

  const result = await emptyTrashAction.show();

  if (result) {
    // TODO: api - empty trash
  }
};

</script>

<style scoped>

</style>
