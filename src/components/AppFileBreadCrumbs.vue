<template>
  <div class="flex gap-4 items-center">
    <router-link
      v-if="file.ancestors.length"
      v-slot="{ navigate }"
      :to="{ name: 'folder', params: { folderId: file.ancestors[0].id }}"
      custom
    >
      <n-tooltip>
        <template #trigger>
          <n-button
            round
            @click="navigate"
          >
            <template #icon>
              <n-icon>
                <ArrowEnterUp24Filled />
              </n-icon>
            </template>
          </n-button>
        </template>

        В родительскую папку
      </n-tooltip>
    </router-link>

    <router-link
      v-else
      v-slot="{ navigate }"
      :to="{ name: 'root' }"
      custom
    >
      <n-button
        round
        @click="navigate"
      >
        <template #icon>
          <n-icon>
            <ArrowEnterUp24Filled />
          </n-icon>
        </template>

        Диск
      </n-button>
    </router-link>

    <div class="font-bold">
      {{ file.getFullName() }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import {
  ArrowEnterUp24Filled
} from "@vicons/fluent";

defineProps<{
  file: INodeModel;
}>();
</script>
