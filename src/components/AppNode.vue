<template data-label="AppNode">
  <div
    :class="{'flex-col': nodesStore.layout === 'grid', 'flex-row': nodesStore.layout === 'list'}"
    class="flex items-center p-3 rounded select-none gap-4"
    aria-haspopup="true"
  >
    <AppNodeIcon :node="node" />

    <div
      :class="{'text-center': nodesStore.layout === 'grid'}"
    >
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

      <div
        class="flex items-center text-sm text-slate-600 gap-2"
        :class="{'flex-col': nodesStore.layout === 'grid'}"
      >
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
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  node: INodeModel;
}>();

const listLayoutMainClasses = 'flex-row';
const gridLayoutMainClasses = 'flex-col';

</script>

<style scoped>

</style>
