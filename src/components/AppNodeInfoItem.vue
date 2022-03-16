<template>
  <div>
    <h3 class="text-slate-900 mb-2 font-bold">
      {{ props.title }}
    </h3>

    <div v-if="content">
      {{ props.content }}
    </div>

    <div
      v-if="description"
      class="text-xs opacity-50"
    >
      {{ props.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  content?: string | number | null;
  description?: string | number | null;
}>();
</script>

<style scoped>

</style>
