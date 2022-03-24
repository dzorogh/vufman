<template>
  <n-message-provider>
    <router-view />
    <DialogConfirm />
    <DialogPrompt />
  </n-message-provider>
</template>


<script setup lang="ts">
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";

</script>
