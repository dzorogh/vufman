<template>
  <n-modal
    v-model:show="confirmStore.show"
    preset="card"
    :title="confirmStore.header"
    :bordered="false"
    size="huge"
    style="width: 600px"
  >
    <div
      v-if="confirmStore.content"
      class="items-center flex gap-2"
    >
      <n-icon
        v-if="confirmStore.icon"
        :component="confirmStore.icon"
        size="30"
        class="text-orange-700"
      />

      <span>
        {{ confirmStore.content }}
      </span>
    </div>

    <div v-if="confirmStore.list.length">
      <ul class="grid-cols-1 divide-y border mt-5 list-none m-0 p-0">
        <li
          v-for="(item, index) in confirmStore.list"
          :key="index"
          class="py-2 px-3 flex items-center gap-2"
        >
          <n-icon
            v-if="item.icon"
            :component="item.icon"
          />
          {{ item.label }}
        </li>
      </ul>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <n-button
          @click="confirmStore.decline"
        >
          <template #icon>
            <Dismiss24Regular />
          </template>
          Нет
        </n-button>

        <n-button
          autofocus
          @click="confirmStore.accept"
        >
          <template #icon>
            <Checkmark24Filled />
          </template>

          Да
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { Dismiss24Regular, Checkmark24Filled } from "@vicons/fluent";
import { useConfirmStore } from "@/store/confirm";

const confirmStore = useConfirmStore();

</script>

<style scoped>

</style>
