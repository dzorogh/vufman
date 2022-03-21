<template>
  <template v-if="node.isFolder">
    <IconFolder
      class="text-slate-700"
      :class="iconSizeClasses"
    />
  </template>

  <template v-if="!node.isFolder">
    <img
      v-if="node.getFileType() === 'image' && node.thumbnail"
      v-lazy="node.thumbnail"
      draggable="false"
      class="rounded object-scale-down bg-slate-300"
      :alt="node.name"
      :class="iconSizeClasses"
    >

    <IconImage
      v-if="node.getFileType() === 'image' && !node.thumbnail"
      :extension="node.extension"
      class="text-slate-300"
      :class="iconSizeClasses"
    />

    <IconDocument
      v-if="node.getFileType() === 'document'"
      :extension="node.extension"
      class="text-slate-300"
      :class="iconSizeClasses"
    />

    <IconVideo
      v-if="node.getFileType() === 'video'"
      :extension="node.extension"
      class="text-slate-300"
      :class="iconSizeClasses"
    />

    <IconAudio
      v-if="node.getFileType() === 'audio'"
      :extension="node.extension"
      class="text-slate-300"
      :class="iconSizeClasses"
    />

    <IconFont
      v-if="node.getFileType() === 'font'"
      :extension="node.extension"
      class="text-slate-300"
      :class="iconSizeClasses"
    />
  </template>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";

defineProps<{
  node: INodeModel;
}>();
</script>

<style scoped>

</style>
