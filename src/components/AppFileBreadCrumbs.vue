<template>
  <div class="flex gap-4 items-center">
    <n-tooltip>
      <template #trigger>
        <n-button
          round
          @click="handleClickBack"
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

    <div class="font-bold flex gap-4 items-center">
      <div
        class="font-bold flex items-center gap-2"
      >
        <div>
          {{ file.getFullName() }}
        </div>

        <div
          v-if="!file.canWrite"
          class="opacity-50"
        >
          <IconReadOnly class="w-3 h-3" />
        </div>
      </div>

      <n-tag
        v-if="file.isTrashed"
        type="error"
      >
        В корзине
      </n-tag>
    </div>
  </div>
</template>
<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import {
  ArrowEnterUp24Filled
} from "@vicons/fluent";
import { useRouter } from "vue-router";
import {
  EditOff16Filled as IconReadOnly
} from "@vicons/fluent";

const router = useRouter();

const props = defineProps<{
  file: INodeModel;
}>();

const handleClickBack = () => {
  router.push({
    name: 'folder',
    params: {
      folderId: props.file.folderId
    },
    query: {
      trash: props.file.isTrashed ? null : undefined
    }
  });
};

</script>import { defineProps } from "vue";

