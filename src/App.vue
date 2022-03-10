<template>
  <suspense>
    <AppLayout />
  </suspense>

  <DialogConfirm />
  <DialogPrompt />
</template>


<script setup lang="ts">
import AppLayout from "./components/AppLayout.vue";
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";

console.log(`env.mode = ${import.meta.env.MODE}`);
</script>
