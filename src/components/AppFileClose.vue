<template>
  <div>
    <n-button
      circle
      @click="navigate"
    >
      <template #icon>
        <n-icon>
          <Dismiss24Filled />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import {
  Dismiss24Filled
} from "@vicons/fluent";
import { INodeModel } from "@/types/INodeModel";
import router from "@/router";

const props = defineProps<{
  file: INodeModel;
}>();

const navigate = () => {
  router.push(
    props.file.folderId ?
      {
        name: 'folder',
        params: { folderId: props.file.folderId }
      } :
      {
        name: 'root'
      }
  );
};

</script>

<style scoped>

</style>
