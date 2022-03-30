<template>
  <tr class="select-none">
    <td class="w-6 p-1">
      <AppNodeIcon
        :icon-size-classes="['w-6', 'h-6']"
        :node="node"
      />
    </td>
    <td class="p-1">
      {{ node.getFullName() }}
    </td>
    <td class="p-1">
      {{ node.getSize() }}
    </td>
    <td class="p-1">
      {{ node.getCreatedAt() }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import AppNodeIcon from "@/components/AppNodeIcon.vue";

defineProps<{
  node: INodeModel;
}>();
</script>

<style scoped>

</style>
