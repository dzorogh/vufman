<template>
  <div>
    <h3 class="text-slate-900 mb-2 font-bold">
      {{ props.title }}
    </h3>

    <div
      v-if="content && !html"
      class="line-clamp-4"
    >
      {{ props.content }}
    </div>

    <div
      v-if="content && html"
      class="text line-clamp-4"
      v-html="props.content"
    />

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
  html?: boolean;
}>();
</script>

<style scoped>

</style>
