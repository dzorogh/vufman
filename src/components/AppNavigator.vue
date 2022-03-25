<template>
  <div v-if="!isLoading">
    <h3 class="text-slate-900 mb-2 font-bold">
      Разделы
    </h3>

    <n-tree
      v-model:expanded-keys="expandedKeys"
      class="font-medium"
      :block-line="true"
      :data="tree"
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
import { computed, h, HTMLAttributes, markRaw, onBeforeMount, ref, shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";

import { useApi } from "@/composables/useApi";
import { ITreeNode, makeNavigatorTree } from "@/services/makeNavigatorTree";
import { NIcon, TreeOption } from "naive-ui";
import { Delete24Filled, Home24Filled } from "@vicons/fluent";
import { useNodesStore } from "@/store/nodes";
import { useMessages } from "@/composables/useMessages";

const api = useApi();
const router = useRouter();
const route = useRoute();
const nodes = ref();
const isLoading = ref(true);
const nodesStore = useNodesStore();
const messages = useMessages();

const tree = shallowRef<ITreeNode[]>(
  [
    {
      label: 'Диск',
      key: 'root',
      icon: Home24Filled
    },
    {
      label: 'Корзина',
      key: 'trash',
      icon: Delete24Filled
    }
  ]
);

onBeforeMount(async () => {
  nodes.value = await api.nodes({ isFolder: true });
  tree.value[0].children = makeNavigatorTree(nodes.value, null) || undefined;
  isLoading.value = false;
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

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onMouseup: () => {
      if (option && option.key && dropAvailableByKey(option.key as string)) {
        messages.moved(option.key === 'trash' ? 'trash' : option.key === 'root' ? 'root' : 'folder');

        nodesStore.removeNodes(nodesStore.selectedNodes);
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

const dropAvailableByKey = (key: string) => {
  if (nodesStore.dragging) {

    // console.log(key);

    if (key === 'root') {
      return !!nodesStore.currentFolder;
    }

    if (key === 'trash') {
      return !route.meta.isTrash;
    }

    if (nodesStore.selectedNodes.find(item => item.id === key || item.folderId === key)) {
      return false;
    }

    // TODO: Check to move selected files in self subfoldrers

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
