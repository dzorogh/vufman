<template>
  <div class="flex items-center flex-wrap gap-4">
    <n-button
      v-if="route.meta.isTrash"
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
      v-if="!route.meta.isTrash"
      class="mr-auto"
    />
    <AppFolderMenuDynamicActions class="mr-auto" />
    <AppFolderMenuSorting class="mr-auto" />
    <AppFolderMenuLayoutSelection />
  </div>
</template>

<script setup lang="ts">
import {
  DeleteDismiss20Filled as IconEmptyTrash
} from "@vicons/fluent";
import { useRoute } from "vue-router";

import AppFolderMenuDynamicActions from "@/components/AppFolderMenuDynamicActions.vue";
import AppFolderMenuStaticActions from "@/components/AppFolderMenuStaticActions.vue";
import AppFolderMenuSorting from "@/components/AppFolderMenuSorting.vue";
import AppFolderMenuLayoutSelection from "@/components/AppFolderMenuLayoutSelection.vue";
import { useEmptyTrashAction } from "@/composables/useEmptyTrashAction";

const route = useRoute();
const emptyTrashAction = useEmptyTrashAction();

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
