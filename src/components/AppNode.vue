<template data-label="AppNode">
  <div
    class="flex flex-row items-center p-3 rounded select-none"
    aria-haspopup="true"
  >
    <div
      :class="iconSizeClasses"
      class="mr-4"
    >
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
    </div>

    <div>
      <div class="font-bold">
        <template v-if="node.extension">
          {{ `${node.name}.${node.extension}` }}
        </template>

        <template v-else>
          {{ node.name }}
        </template>
      </div>

      <div class="text-sm text-slate-600">
        {{ node.getSize() }}
      </div>

      <div class="flex items-center text-sm text-slate-600 gap-2">
        <div
          v-if="node.createdAt"
        >
          {{ formatTimestamp(node.createdAt) }}
        </div>

        <div v-if="node.author">
          {{ node.author.fullName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconFolder from "@/components/IconFolder.vue";
import IconDocument from "@/components/IconDocument.vue";
import IconVideo from "@/components/IconVideo.vue";
import IconAudio from "@/components/IconAudio.vue";
import { formatTimestamp } from "@/formatters/formatTimestamp";
import { INodeModel } from "@/types/INodeModel";
import IconFont from "@/components/IconFont.vue";
import IconImage from "@/components/IconImage.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  node: INodeModel;
}>();

const iconSizeClasses = 'w-20 h-20';

</script>

<style scoped>

</style>
