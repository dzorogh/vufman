<template>
  <Dialog
    v-model:visible="confirmStore.show"
    :header="confirmStore.header"
    :style="{width: '350px'}"
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
      <ul>
        <li
          v-for="(item, index) in confirmStore.list"
          :key="index"
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
