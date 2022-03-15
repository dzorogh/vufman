<template>
  <router-view />
  <DialogConfirm />
  <DialogPrompt />
</template>


<script setup lang="ts">
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";

console.log(`env.mode = ${import.meta.env.MODE}`);
</script>
