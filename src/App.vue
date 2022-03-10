<script setup lang="ts">
import AppLayout from "./components/AppLayout.vue";

console.log("env.mode", import.meta.env.MODE);
</script>

<template>
  <suspense>
    <AppLayout />
  </suspense>
</template>
