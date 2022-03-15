<template>
  <div v-if="!isLoading">
    <div>
      <router-link
        v-if="file.ancestors.length"
        :to="{ name: 'folder', params: { folderId: file.ancestors[0].id }}"
      >
        « {{ file.ancestors[0].name }}
      </router-link>
      <router-link
        v-else
        :to="{ name: 'root'}"
      >
        « Диск
      </router-link>
    </div>
    <div>
      {{ file }}
    </div>
  </div>
  <ProgressSpinner
    v-else
    class="!w-7 !h-7 !m-0 !ml-2"
  />
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

import api from "@/services/api";
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const file = ref();
const isLoading = ref(false);

onBeforeMount(async () => {
  isLoading.value = true;

  file.value = await api.getFile({ id: route.params.fileId as string });

  isLoading.value = false;
});

</script>

<style scoped>

</style>
