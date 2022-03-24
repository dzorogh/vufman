<template>
  <div class="flex items-center gap-4">
    <AppFolderMenuStaticActions />
    <AppFolderMenuDynamicActions />
    <AppFolderMenuSorting class="ml-auto" />
    <AppFolderMenuLayoutSelection />
  </div>
</template>

<script setup lang="ts">
import AppFolderMenuDynamicActions from "@/components/AppFolderMenuDynamicActions.vue";
import AppFolderMenuStaticActions from "@/components/AppFolderMenuStaticActions.vue";
import AppFolderMenuSorting from "@/components/AppFolderMenuSorting.vue";
import AppFolderMenuLayoutSelection from "@/components/AppFolderMenuLayoutSelection.vue";

</script>

<style scoped>

</style>
