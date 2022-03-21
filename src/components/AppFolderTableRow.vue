<template>
  <tr class="select-none">
    <td class="w-6 !pl-4">
      <AppNodeIcon
        :icon-size-classes="['w-6', 'h-6']"
        :node="node"
      />
    </td>
    <td>
      {{ node.getFullName() }}
    </td>
    <td>
      {{ node.getSize() }}
    </td>
    <td>
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
