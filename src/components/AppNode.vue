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
          v-if="getFileType(node) === 'image'"
          v-lazy="node.thumbnail"
          class="rounded object-scale-down bg-slate-300"
          :alt="node.name"
          :class="iconSizeClasses"
        >

        <IconDocument
          v-if="getFileType(node) === 'document'"
          :extension="node.extension"
          class="text-slate-300"
          :class="iconSizeClasses"
        />

        <IconVideo
          v-if="getFileType(node) === 'video'"
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
        {{ filesize(node.size || 0, {locale: 'ru-RU'}) }}
      </div>

      <div
        v-if="node.createdAt"
        class="text-sm text-slate-600"
      >
        {{ formatTimestamp(node.createdAt) }}
      </div>

      <div v-if="node.author">
        {{ node.author.fullName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import filesize from "filesize";

import { Node } from "@/types/Node";
import IconFolder from "@/components/IconFolder.vue";
import { FileTypes } from "@/config/FileTypes";
import IconDocument from "@/components/IconDocument.vue";
import IconVideo from "@/components/IconVideo.vue";
import { formatTimestamp } from "@/formatters/formatTimestamp";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  node: Node;
}>();

function getFileType(node: Node): keyof typeof FileTypes | null {
  if (!node.mimetype) {
    return null;
  }

  let result = null;

  for (let [ type, mimes ] of Object.entries(FileTypes)) {
    if (mimes.includes(node.mimetype)) {
      result = type as keyof typeof FileTypes;
    }
  }

  return result;
}

const iconSizeClasses = 'w-20 h-20';

</script>

<style scoped>

</style>
