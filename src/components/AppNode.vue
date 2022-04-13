<template data-label="AppNode">
  <div
    :class="{'flex-col': nodesStore.layout === 'grid', 'flex-row': nodesStore.layout === 'list'}"
    class="flex items-center p-3 rounded select-none gap-4 break-inside-avoid"
    aria-haspopup="true"
    @click.prevent="handleClick"
  >
    <AppNodeIcon
      :icon-size-classes="nodesStore.layout === 'grid' ? ['lg:w-32', 'lg:h-32', 'w-16', 'h-16'] : nodesStore.layout === 'list' ? ['w-14', 'h-14'] : []"
      :node="node"
    />

    <div
      class="break-words w-full flex flex-col gap-0.5"
      :class="{'text-center': nodesStore.layout === 'grid'}"
    >
      <div
        class="font-bold flex items-center gap-2"
        :class="{'justify-center': nodesStore.layout === 'grid'}"
      >
        <div>
          {{ node.getFullName() }}
        </div>

        <div
          v-if="!node.canWrite"
          class="opacity-50"
        >
          <IconReadOnly class="w-3 h-3" />
        </div>

        <div
          v-if="node.access.global === 'denied'"
          class="text-red-600"
        >
          <IconDenied class="w-3 h-3" />
        </div>
      </div>

      <div
        v-if="!node.isFolder"
        class="text-sm text-slate-600"
      >
        {{ node.getSize() }}
      </div>

      <div
        class="flex flex-wrap items-center text-sm text-slate-600 gap-x-2"
        :class="{'flex-col': nodesStore.layout === 'grid'}"
      >
        <div
          v-if="node.createdAt"
        >
          {{ node.getCreatedAt() }}
        </div>

        <div v-if="node.author">
          {{ `${node.author.lastName} ${node.author.firstName} ` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { INodeModel } from "@/types/INodeModel";
import AppNodeIcon from "@/components/AppNodeIcon.vue";
import { useNodesStore } from "@/store/nodes";
import { ref } from "vue";
import {
  EditOff16Filled as IconReadOnly,
  LockClosed12Filled as IconDenied
} from "@vicons/fluent";

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
