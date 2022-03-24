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
      class="items-center flex"
    >
      <i
        class="mr-3"
        :class="confirmStore.icon"
        style="font-size: 2rem"
      />

      <span>
        {{ confirmStore.content }}
      </span>
    </div>

    <div v-if="confirmStore.list.length">
      <ul class="grid-cols-1 divide-y border mt-5">
        <li
          v-for="(item, index) in confirmStore.list"
          :key="index"
          class="py-2 px-3"
        >
          <i
            v-if="item.icon"
            class="mr-2"
            :class="item.icon"
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
