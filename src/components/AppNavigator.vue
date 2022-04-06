<template>
  <div v-if="!navigatorStore.isLoading">
    <div class="mb-2 font-bold">
      Разделы
    </div>

    <n-tree
      v-model:expanded-keys="expandedKeys"
      class="font-medium"
      :block-line="true"
      :data="navigatorStore.tree"
      :render-prefix="renderPrefix"
      :selectable="true"
      :node-props="nodeProps"
      :selected-keys="selectedKeys"
      :allow-drop="() => true"
      @update:selected-keys="updateSelectedKeys"
    />
  </div>

  <n-spin
    v-else
    size="medium"
  />
</template>

<script setup lang="ts">
import { computed, h, HTMLAttributes, markRaw, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";

import { useApi } from "@/composables/useApi";
import { NIcon } from "naive-ui";
import { useNodesStore } from "@/store/nodes";
import { useNodesActions } from "@/composables/useNodesActions";
import { useNavigatorStore } from "@/store/navigator";
import { ITreeNode } from "@/types/ITreeNode";

const api = useApi();
const router = useRouter();
const route = useRoute();
const nodesStore = useNodesStore();
const navigatorStore = useNavigatorStore();
const nodesActions = useNodesActions();

onBeforeMount(async () => {
  navigatorStore.loadNavigatorTree();
});

const expandedKeys = useStorage('navigatorExpandedKeys', [ 'root' ]);

const renderPrefix = ({ option }: { option: ITreeNode }) => {
  if (option.icon) {
    return h(
      NIcon,
      { component: markRaw(option.icon), class: 'text-neutral-400 text-lg' },
    );
  }
};

const nodeProps = ({ option }: { option: ITreeNode }) => {
  return {
    onMouseup: async () => {
      if (option && option.key && dropAvailable(option)) {
        const result = await nodesActions.moveTo(nodesStore.selectedNodes, option.key as string);
        // messages.nodesMoved(option.key === 'trash' ? 'trash' : option.key === 'root' ? 'root' : 'folder');

        if (result) {
          nodesStore.removeNodes(nodesStore.selectedNodes);
        }
      }
    },

  } as HTMLAttributes;
};


const updateSelectedKeys = (options: string[]) => {
  const option = options[0];

  if (!option) return router.push({ name: 'root' });

  if (option === 'root') {
    return router.push({ name: 'root' });
  }

  if (option === 'trash') {
    return router.push({ name: 'trash' });
  }

  return router.push({ name: 'folder', params: { folderId: option } });
};

const selectedKeys = computed(() => {

  if (typeof route.query.trash !== 'undefined') {
    return [ 'trash' ];
  }

  if (route.name === 'folder' && !route.params.folderId) {
    return [ 'root' ];
  }

  if (route.params.folderId && typeof route.params.folderId === "string") {
    return [ route.params.folderId ];
  }

  if (nodesStore.currentFolder && typeof nodesStore.currentFolder.id === 'string') {
    return [ nodesStore.currentFolder.id ];
  }

  return [];
});

const dropAvailable = (option: ITreeNode) => {
  if (nodesStore.dragging) {

    // console.log(key);

    if (option.key === 'root') {
      return !!nodesStore.currentFolder;
    }

    if (option.key === 'trash') {
      return !(route.query.trash === null && !route.params.folderId);
    }

    if (nodesStore.selectedNodes.find(item => item.id === option.key || item.folderId === option.key)) {
      return false;
    }

    if (option.ancestorsIds) {
      const selectedIds = nodesStore.selectedNodes.map(item => item.id);
      for (const ancestorId of option.ancestorsIds) {
        if (selectedIds.includes(ancestorId)) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
};

</script>

<style scoped>

::v-deep(.n-tree-node-content) {
  @apply items-start pt-0.5 !important;
}

::v-deep(.drop-available) {
  @apply bg-gray-200 hover:bg-amber-50 cursor-grabbing !important;
}

::v-deep(.n-tree-node--pending:not(:hover):not(.n-tree-node--selected)) {
  @apply bg-transparent !important;
}


</style>
