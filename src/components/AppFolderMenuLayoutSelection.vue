<template>
  <n-button-group>
    <n-tooltip
      v-for="(item, index) in layoutOptions"
      :key="index"
      placement="bottom"
      trigger="hover"
    >
      <template #trigger>
        <n-button
          :type="item.value === nodesStore.layout ? 'primary' : undefined"
          @click="nodesStore.layout = item.value"
        >
          <template #icon>
            <n-icon :component="item.icon" />
          </template>
        </n-button>
      </template>
      <span>{{ item.label }}</span>
    </n-tooltip>
  </n-button-group>
</template>

<script setup lang="ts">

import {
  Grid24Filled,
  TextColumnTwo24Filled,
  TextBulletListLtr24Filled,
} from "@vicons/fluent";
import { useNodesStore } from "@/store/nodes";
import { useRoute } from "vue-router";
import { Component } from "vue";
import { FolderLayoutType } from "@/types/FolderLayoutType";

const route = useRoute();

const nodesStore = useNodesStore();

const layoutOptions: {
  icon: Component;
  value: FolderLayoutType;
  label: string;
}[] = [
  { icon: Grid24Filled, value: 'grid', label: 'В виде сетки' },
  { icon: TextColumnTwo24Filled, value: 'list', label: 'В виде списка' },
  { icon: TextBulletListLtr24Filled, value: 'table', label: 'В виде таблицы' },
];

</script>

<style scoped>

</style>
