<template>
  <Dialog
    v-model:visible="confirmStore.show"
    :header="confirmStore.header"
    :style="{width: '550px'}"
    :modal="true"
    @hide="confirmStore.decline"
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
          {{ item }}
        </li>
      </ul>
    </div>

    <template #footer>
      <Button
        label="Нет"
        icon="pi pi-times"
        class="p-button-text"
        @click="confirmStore.decline"
      />
      <Button
        label="Да"
        icon="pi pi-check"
        class="p-button-text"
        autofocus
        @click="confirmStore.accept"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useConfirmStore } from "@/store/confirm";

const confirmStore = useConfirmStore();

</script>

<style scoped>

</style>
