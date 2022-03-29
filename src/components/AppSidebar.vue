<template>
  <div class="flex flex-col px-4 py-6 gap-6 overflow-auto">
    <AppNavigator />

    <router-link
      v-if="userIsAdmin"
      v-slot="{ isActive, navigate }"
      :to="{name: 'log'}"
      custom
    >
      <n-button
        :tertiary="!isActive"
        :disabled="isActive"
        type="primary"
        @click="navigate"
      >
        <template #icon>
          <n-icon>
            <IconLog />
          </n-icon>
        </template>
        Лог действий
      </n-button>
    </router-link>

    <n-card
      v-if="fileList.length"
      class="bg-slate-600"
      title="Загрузка файлов"
    >
      <n-upload-file-list />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import AppNavigator from "@/components/AppNavigator.vue";
import { ClipboardBulletListRtl16Regular as IconLog } from "@vicons/fluent";
import { UploadFileInfo } from "naive-ui";
import { computed } from "vue";
import { useStore } from "@/store/main";

const props = defineProps<{
  fileList: UploadFileInfo[];
}>();

const store = useStore();

const userIsAdmin = computed(() => {
  return store.currentUser ? store.currentUser.isAdmin : false;
});

</script>

<style scoped>

</style>
