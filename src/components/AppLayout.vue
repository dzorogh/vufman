<template>
  <div class="grid grid-cols-5 h-full min-h-full grow rounded-xl overflow-hidden bg-neutral-200">
    <div class="col-span-1 flex flex-col px-4 py-6">
      <AppNavigator />
    </div>

    <router-view class="col-span-4 h-full min-h-full" />
  </div>
</template>

<script setup lang="ts">
import AppNavigator from "@/components/AppNavigator.vue";

</script>

<style scoped>

</style>
