<template>
  <n-message-provider>
    <n-loading-bar-provider>
      <router-view />
      <DialogConfirm />
      <DialogPrompt />
    </n-loading-bar-provider>
  </n-message-provider>
</template>


<script setup lang="ts">
import DialogConfirm from "./components/DialogConfirm.vue";
import DialogPrompt from "@/components/DialogPrompt.vue";

</script>
