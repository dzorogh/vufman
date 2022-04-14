<template>
  <div class="overflow-auto lg:block flex divide-y divide-slate-100">
    <div class="p-4">
      <n-input-group>
        <n-input
          v-model:value="search"
          size="small"
          placeholder="Поиск"
          clearable
          @change="handleSearch"
          @keydown.enter="handleSearch"
        />
        <n-button
          size="small"
          type="primary"
          ghost
          @click="handleSearch"
        >
          Найти
        </n-button>
      </n-input-group>
    </div>

    <div class="p-4 lg:!flex hidden flex-col">
      <AppNavigator />
    </div>

    <div
      v-if="userIsAdmin"
      class="px-4 py-4 flex flex-col border-b border-t border-t-slate-100"
    >
      <router-link
        v-slot="{ isActive, navigate }"
        :to="{name: 'log'}"
        custom
      >
        <n-button
          size="small"
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

          <span v-if="!mdAndSmaller">
            Лог действий
          </span>
        </n-button>
      </router-link>
    </div>

    <div
      v-if="fileList.length"
      class="px-4 py-4 flex flex-col"
    >
      <n-upload-file-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavigator from "@/components/AppNavigator.vue";
import { ClipboardBulletListRtl16Regular as IconLog } from "@vicons/fluent";
import { UploadFileInfo } from "naive-ui";
import { computed, ref } from "vue";
import { useStore } from "@/store/main";
import { useRoute, useRouter } from "vue-router";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  fileList: UploadFileInfo[];
}>();

const store = useStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndSmaller = breakpoints.smaller('md');

const userIsAdmin = computed(() => {
  return store.currentUser ? store.currentUser.isAdmin : false;
});

const search = ref(route.query.search || '');
const handleSearch = () => {
  router.push({
    name: 'root',
    query: {
      search: search.value || undefined,
      trash: route.query.trash
    }
  });
};

</script>

<style scoped>

</style>
