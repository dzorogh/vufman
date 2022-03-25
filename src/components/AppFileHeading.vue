<template>
  <div
    class="flex items-center p-4 col-span-4 bg-slate-50"
    :class="{'bg-slate-50': !file.isTrashed, 'bg-orange-50': file.isTrashed}"
  >
    <AppFileBreadCrumbs :file="file" />
    <AppFileClose
      class="ml-auto"
      :file="file"
    />
  </div>
</template>

<script setup lang="ts">
import { INodeModel } from "@/types/INodeModel";
import AppFileBreadCrumbs from "@/components/AppFileBreadCrumbs.vue";
import AppFileClose from "@/components/AppFileClose.vue";

defineProps<{
  file: INodeModel;
}>();
</script>

<style scoped>

</style>
