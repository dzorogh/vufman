<template>
  <n-button-group>
    <n-popselect
      v-model:value="nodesStore.sorting"
      :options="sortingTypes"
    >
      <n-button>
        {{ sortingTypes.find(item => item.value === nodesStore.sorting).label }}
      </n-button>
    </n-popselect>

    <n-button @click="nodesStore.sortingDirection = nodesStore.sortingDirection === 'asc' ? 'desc' : 'asc'">
      <template #icon>
        <ArrowSortDownLines24Filled :style="{transform: nodesStore.sortingDirection === 'desc' ? 'rotate(-180deg)' : null}" />
      </template>
    </n-button>
  </n-button-group>
</template>

<script setup lang="ts">
import {
  ArrowSortDownLines24Filled
} from "@vicons/fluent";

import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();

const sortingTypes = [
  { label: 'По названию', value: 'name' },
  { label: 'По типу', value: 'type' },
  { label: 'По размеру', value: 'size' },
  { label: 'По дате создания', value: 'create' },
  { label: 'По дате изменения', value: 'update' },
];
</script>

<style scoped>

</style>
