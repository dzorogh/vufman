<template>
  <div class="col-span-4 h-full min-h-full bg-white">
    <template v-if="nodesStore.nodesLoading">
      <div class="flex items-center justify-center h-full">
        <n-spin size="large" />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col overflow-hidden divide-y h-full">
        <AppFolderHeading
          :is-trash="routeIsTrash"
          @reload="handleReload"
        />

        <div class="grid grid-cols-4 grow overflow-hidden">
          <div class="h-full overflow-hidden flex flex-col col-span-3 divide-y">
            <div
              class="grow bg-white shadow-sm overflow-auto"
              @click.self="nodesStore.deselect()"
            >
              <AppFolderList :is-trash="routeIsTrash" />
            </div>
          </div>

          <div class="flex flex-col border-l p-6 gap-10 overflow-auto">
            <AppNodeMenu
              v-if="nodesStore.currentFolder"
              class="mb-auto"
              :node="nodesStore.currentFolder"
              @node-change="handleNodeChange"
            />
            <AppNodeInfo
              v-if="nodesStore.currentFolder"
              :node="nodesStore.currentFolder"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useKeypress, } from 'vue3-keypress';
import AppFolderHeading from "@/components/AppFolderHeading.vue";
import AppFolderList from "@/components/AppFolderList.vue";
import AppNodeInfo from "@/components/AppNodeInfo.vue";
import AppNodeMenu from "@/components/AppNodeMenu.vue";
import { useNodesStore } from "@/store/nodes";
import { useApi } from "@/composables/useApi";
import { useConfirmStore } from "@/store/confirm";
import { usePromptStore } from "@/store/prompt";
import { INodeModel } from "@/types/INodeModel";
import { useActiveElement } from "@vueuse/core";

const confirmStore = useConfirmStore();
const promptStore = usePromptStore();
const nodesStore = useNodesStore();
const route = useRoute();
const api = useApi();
const activeElement = useActiveElement();

// testModule();

const routeIsTrash = computed(() => {
  return typeof route.query.trash !== 'undefined';
});

const routeSearch = computed(() => {
  return route.query.search as string || undefined;
});

const routeFolderId = computed(() => {
  return route.params.folderId as string || null;
});

const loadNodes = async () => {
  nodesStore.nodes = await api.nodes({
    isTrashed: routeIsTrash.value || undefined,
    folderId: routeFolderId.value,
    search: routeSearch.value
  }, true);
};

const loadCurrentFolder = async () => {
  nodesStore.currentFolder = await (routeFolderId.value ? api.folder({ id: routeFolderId.value as string }) : null);
};

const handleReload = async () => {
  nodesStore.selectedNodes = [];
  nodesStore.nodesLoading = true;

  await loadNodes();
  await loadCurrentFolder();

  nodesStore.nodesLoading = false;
};

watch(() => [ route.params.folderId, route.name, route.query.trash, route.query.search ],
  async ([ folderId, routeName, trash, search ], old) => {
    console.log('Folder watcher', { folderId, routeName, trash, search }, old);

    // Check for empty old params - only load if it is empty to prevent double request
    if (routeName === 'folder' && !old) {

      // nodesStore.nodesLoading = true;

      // nodesStore.currentFolder = await (folderId ? api.folder({ id: folderId as string }) : null);
      // nodesStore.nodes = await api.nodes({
      //   folderId: folderId as string || null,
      //   isTrashed: isTrash.value || undefined,
      //   search: search as string || undefined
      // }, true);

      await handleReload();

      // nodesStore.nodesLoading = false;
    }

  }, {
    immediate: true
  });


const handleNodeChange = (updatedFolder: INodeModel) => {
  nodesStore.currentFolder = updatedFolder;
};

const keyboardActive = computed(() => {
  if (activeElement.value && (activeElement.value.tagName === "INPUT" || activeElement.value.tagName === "TEXTAREA")) {
    return false;
  }

  return !confirmStore.show && !promptStore.show;
});

useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: 65, // A
      modifiers: [ "metaKey" ], // cmd
      success: () => {
        nodesStore.selectAllNodes();
      }
    },
    {
      keyCode: 65, // or keyCode as integer, e.g. 37
      modifiers: [ "ctrlKey" ],
      success: () => {
        nodesStore.selectAllNodes();
      },
    },
    {
      keyCode: 46, // delete
      // modifiers: [ "ctrlKey" ],
      success: () => {
        nodesStore.trashNodes();
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "metaKey" ], // + cmd
      success: () => {
        nodesStore.trashNodes();
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "ctrlKey" ], // + ctrl
      success: () => {
        nodesStore.trashNodes();
      },
    },
    {
      keyCode: 78, // N
      modifiers: [ "shiftKey", "altKey" ],
      success: () => {
        nodesStore.makeFolder();
      },
    },
    {
      keyCode: 70, // F
      modifiers: [ "shiftKey", "altKey" ],
      success: () => {
        nodesStore.makeFile();
      },
    },
    {
      keyCode: 67, // C
      modifiers: [ "ctrlKey" ],
      success: () => {
        nodesStore.copyNodes();
      },
    },
    {
      keyCode: 67, // C
      modifiers: [ "metaKey" ],
      success: () => {
        nodesStore.copyNodes();
      },
    },
    {
      keyCode: 86, // V
      modifiers: [ "ctrlKey" ],
      success: () => {
        nodesStore.pasteNodes();
      },
    },
    {
      keyCode: 86, // V
      modifiers: [ "metaKey" ],
      success: () => {
        nodesStore.pasteNodes();
      },
    },
  ],
  isActive: keyboardActive
  // onWrongKey: someWrongKeyCallback,
  // onAnyKey: someAnyKeyCallback,
  // isActive: isActiveRef,
});


</script>

<style scoped>
</style>
