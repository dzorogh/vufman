<template>
  <router-view />
  <DialogConfirm />
  <DialogPrompt />
  <Toast />
</template>


<script setup lang="ts">
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";
import Toast from "primevue/toast";

console.log(`env.mode = ${import.meta.env.MODE}`);
</script>
