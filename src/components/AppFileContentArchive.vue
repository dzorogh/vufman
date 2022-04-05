<template />

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";

const emit = defineEmits<{
  (e: 'fileChange', file: INodeModel): void;
}>();

</script>

<style scoped>

</style>
