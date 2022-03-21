<template data-label="AppNode">
  <div
    class="flex flex-row items-center p-3 rounded select-none"
    aria-haspopup="true"
  >
    <div
      :class="iconSizeClasses"
      class="mr-4"
    >
      <AppNodeIcon :node="node" />
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
import { formatTimestamp } from "@/formatters/formatTimestamp";
import { INodeModel } from "@/types/INodeModel";
import AppNodeIcon from "@/components/AppNodeIcon.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  node: INodeModel;
}>();

const iconSizeClasses = 'w-20 h-20';

</script>

<style scoped>

</style>
