<template>
  <div>
    <h3 class="text-slate-900 mb-2 font-bold">
      {{ props.title }}
    </h3>

    {{ props.content }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  content: string | number | null;
}>();
</script>

<style scoped>

</style>
