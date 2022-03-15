<template>
  <suspense>
    <router-view />

    <template #fallback>
      <ProgressSpinner class="!w-12 !h-12" />
    </template>
  </suspense>

  <DialogConfirm />
  <DialogPrompt />
</template>


<script setup lang="ts">
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";
import ProgressSpinner from 'primevue/progressspinner';

console.log(`env.mode = ${import.meta.env.MODE}`);
</script>
