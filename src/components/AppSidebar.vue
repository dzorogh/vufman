<template>
  <div class="flex flex-col px-4 py-4 gap-6 overflow-auto">
    <n-input-group>
      <n-input
        v-model:value="search"
        placeholder="Поиск"
        clearable
        @change="handleSearch"
        @keydown.enter="handleSearch"
      />
      <n-button
        type="primary"
        ghost
        @click="handleSearch"
      >
        Найти
      </n-button>
    </n-input-group>

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
      class="bg-slate-300"
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
import { computed, ref } from "vue";
import { useStore } from "@/store/main";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  fileList: UploadFileInfo[];
}>();

const store = useStore();

const userIsAdmin = computed(() => {
  return store.currentUser ? store.currentUser.isAdmin : false;
});

const search = ref(route.query.search || '');
const handleSearch = () => {
  router.push({
    name: 'root',
    query: {
      search: search.value || undefined
    }
  });
};

</script>

<style scoped>

</style>
