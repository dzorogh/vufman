<template>
  <div class="grid grid-cols-5 h-full min-h-full grow rounded-xl overflow-hidden bg-gray-300">
    <div class="col-span-1 flex flex-col px-4 py-6">
      <h3 class="text-slate-900 mb-2 font-bold px-4">
        Разделы
      </h3>
      <AppNavigator />
    </div>

    <div class="col-span-4 h-full overflow-hidden rounded-xl flex flex-col">
      <div class="bg-white rounded-t-xl p-4 border-b">
        ACTIONS
      </div>

      <div class="grow bg-white shadow-sm rounded-b-xl p-4 overflow-auto">
        <AppFolderView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavigator from "@/components/AppNavigator.vue";
import AppFolderView from "@/components/AppFolderView.vue";
</script>

<style scoped>
</style>
