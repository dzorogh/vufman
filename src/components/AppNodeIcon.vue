<template>
  <div
    :class="iconSizeClasses"
  >
    <template v-if="node.isFolder">
      <IconFolder
        class="text-slate-700 node-folder"
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

      <IconText
        v-if="node.getFileType() === 'text'"
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
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import IconFolder from "@/components/IconFolder.vue";
import IconDocument from "@/components/IconDocument.vue";
import IconVideo from "@/components/IconVideo.vue";
import IconAudio from "@/components/IconAudio.vue";
import IconFont from "@/components/IconFont.vue";
import IconImage from "@/components/IconImage.vue";
import IconText from "@/components/IconText.vue";

defineProps<{
  node: INodeModel;
  iconSizeClasses: string[];
}>();

// const iconSizeClasses = 'w-20 h-20';

</script>

<style scoped>
.node-drop-available .node-folder {
  @apply animate-pulse;
}
</style>
