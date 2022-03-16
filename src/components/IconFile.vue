<template
  data-label="IconDocument"
  xmlns:fill-rule="http://www.w3.org/1999/XSL/Transform"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
  >

    <path
      fill-rule="evenodd"
      fill-opacity="1"
      :mask="extension ? `url(#extension-mask-${extension})` : null"
      d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"
    />

    <mask
      v-if="extension"
      :id="`extension-mask-${extension}`"
    >
      <rect
        width="100%"
        height="100%"
        fill="#fff"
        x="0"
        y="0"
      />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        alignment-baseline="central"
        class="font-bold"
        fill="#000"
        style="font-size: 25%;"
      >
        .{{ extension }}
      </text>
    </mask>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  extension?: string;
}>();
</script>

<style scoped>

</style>
