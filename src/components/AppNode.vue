<template data-label="AppNode">
  <div
    :class="{'flex-col': nodesStore.layout === 'grid', 'flex-row': nodesStore.layout === 'list'}"
    class="flex items-center p-3 rounded select-none gap-4 break-inside-avoid"
    aria-haspopup="true"
    @click.prevent="handleClick"
  >
    <AppNodeIcon
      :icon-size-classes="nodesStore.layout === 'grid' ? ['w-32', 'h-32'] : nodesStore.layout === 'list' ? ['w-14', 'h-14'] : []"
      :node="node"
    />

    <div
      :class="{'text-center': nodesStore.layout === 'grid'}"
    >
      <div
        class="font-bold break-all"
        :class="{'mb-1': nodesStore.layout === 'grid'}"
      >
        {{ node.getFullName() }}
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
import { ref } from "vue";

const nodesStore = useNodesStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  node: INodeModel;
}>();

const emit = defineEmits<{
  (e: 'doubletap'): void;
}>();


let doubleTap = false;
const handleClick = () => {
  if (!doubleTap) {
    doubleTap = true;
    setTimeout(() => {
      doubleTap = false;
    }, 500);
  } else {
    emit('doubletap');
  }
};

</script>

<style scoped>

</style>
