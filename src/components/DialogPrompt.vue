<template>
  <Dialog
    v-model:visible="promptStore.show"
    :header="promptStore.header"
    :style="{width: '650px'}"
    @hide="promptStore.cancel"
  >
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
      <InputText
        v-model="promptStore.newValue"
        type="text"
        :class="{'p-invalid': promptStore.errors.length}"
        placeholder="Введите название"
      />

      <span
        v-if="promptStore.addon"
        class="p-inputgroup-addon"
      >
        {{ promptStore.addon }}
      </span>
    </div>

    <div
      v-if="promptStore.type === 'tree'"
      class="grid"
    >
      <TreeSelect
        v-model="promptStore.newValue"
        :options="promptStore.treeNodes"
        selection-mode="single"
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

    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        class="p-button-text"
        @click="promptStore.cancel"
      />
      <Button
        label="Применить"
        icon="pi pi-check"
        class="p-button-text"
        autofocus
        @click="promptStore.validate"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import TreeSelect from 'primevue/treeselect';
import InputText from 'primevue/inputtext';
import { usePromptStore } from '@/store/prompt';

const promptStore = usePromptStore();

</script>

<style scoped>

</style>
