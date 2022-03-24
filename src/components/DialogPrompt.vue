<template>
  <n-modal
    v-model:show="promptStore.show"
    preset="card"
    :title="promptStore.header"
    :bordered="false"
    size="huge"
    style="width: 600px"
    @mask-click="promptStore.cancel"
    @esc="promptStore.cancel"
  >
    <template v-if="!promptStore.isLoading">
      <div
        v-if="promptStore.content"
        class="items-center flex"
      >
        <span>
          {{ promptStore.content }}
        </span>
      </div>

      <div
        v-if="promptStore.type === 'string'"
        class="p-inputgroup pt-3"
      >
        <n-input
          v-model:value="promptStore.newValue"
          type="text"
          placeholder="Введите название"
          :status="promptStore.errors.length ? 'error' : null"
        >
          <template
            v-if="promptStore.addon"
            #suffix
          >
            {{ promptStore.addon }}
          </template>
        </n-input>
      </div>

      <div
        v-if="promptStore.type === 'tree'"
        class="grid"
      >
        <n-tree-select
          v-model:value="promptStore.newValue"
          class="border-red-600"
          :options="promptStore.treeNodes"
          placeholder="Выберите"
        />
      </div>

      <div
        v-for="(error, index) in promptStore.errors"
        :key="index"
      >
        <small class="p-error">
          {{ error }}
        </small>
      </div>
    </template>

    <template v-else>
      <div class="flex items-center justify-center py-12">
        <n-spin size="large" />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-4">
        <n-button
          @click="promptStore.cancel"
        >
          <template #icon>
            <Dismiss24Regular />
          </template>
          Отменить
        </n-button>

        <n-button
          v-if="!promptStore.isLoading"
          @click="promptStore.validate"
        >
          <template #icon>
            <Checkmark24Filled />
          </template>

          Применить
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { Dismiss24Regular, Checkmark24Filled } from "@vicons/fluent";

import { usePromptStore } from '@/store/prompt';

const promptStore = usePromptStore();
</script>

<style scoped>

</style>
