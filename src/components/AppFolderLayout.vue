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
          :is-trash="isTrash"
          @reload="handleReload"
        />

        <div class="lg:grid flex flex-col divide-y lg:divide-y-0 grid-cols-4 grow overflow-hidden">
          <div
            class="h-full overflow-hidden flex flex-col"
            :class="{'col-span-3': nodesStore.currentFolder, 'col-span-4': !nodesStore.currentFolder}"
          >
            <div
              class="grow bg-white shadow-sm overflow-auto"
              @click.self="nodesStore.deselect()"
            >
              <AppFolderList :is-trash="isTrash" />
            </div>
          </div>

          <div
            v-if="nodesStore.currentFolder"
            class="flex flex-col border-l divide-y overflow-auto"
          >
            <div
              v-if="nodesStore.currentFolder"
              class="p-6"
            >
              <AppNodeMenu
                class="mb-auto"
                :node="nodesStore.currentFolder"
                @node-change="handleNodeChange"
              />
            </div>
            <div
              v-if="nodesStore.currentFolder"
              class="p-6 grow"
            >
              <AppNodeInfo
                :node="nodesStore.currentFolder"
              />
            </div>
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
import router from "@/router";
import slugify from "slugify";

const confirmStore = useConfirmStore();
const promptStore = usePromptStore();
const nodesStore = useNodesStore();
const route = useRoute();
const api = useApi();
const activeElement = useActiveElement();

// testModule();

const isTrash = computed(() => {
  if (nodesStore.currentFolder && nodesStore.currentFolder.isTrashed !== undefined) {
    return nodesStore.currentFolder.isTrashed;
  } else {
    return typeof route.query.trash !== 'undefined';
  }
});

const routeSearch = computed(() => {
  return route.query.search as string || undefined;
});

const routeFolderId = computed(() => {
  return route.params.folderId as string || null;
});

const loadNodes = async () => {
  nodesStore.nodes = await api.nodes({
    isTrashed: isTrash.value || undefined,
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

      if (nodesStore.currentFolder) {
        await router.replace({
          ...route,
          params: {
            ...route.params,
            folderName: slugify(nodesStore.currentFolder.name as string)
          }
        });
      }

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
        if (isTrash.value) {
          nodesStore.deleteNodes();
        } else {
          nodesStore.trashNodes();
        }
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "metaKey" ], // + cmd
      success: () => {
        if (isTrash.value) {
          nodesStore.deleteNodes();
        } else {
          nodesStore.trashNodes();
        }
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "ctrlKey" ], // + ctrl
      success: () => {
        if (isTrash.value) {
          nodesStore.deleteNodes();
        } else {
          nodesStore.trashNodes();
        }
      },
    },
    {
      keyCode: 78, // N
      modifiers: [ "shiftKey", "altKey" ],
      success: () => {
        if (!isTrash.value) {
          nodesStore.makeFolder();
        }
      },
    },
    {
      keyCode: 70, // F
      modifiers: [ "shiftKey", "altKey" ],
      success: () => {
        if (!isTrash.value) {
          nodesStore.makeFile();
        }
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
      keyCode: 88, // X
      modifiers: [ "ctrlKey" ],
      success: () => {
        nodesStore.cutNodes();
      },
    },
    {
      keyCode: 88, // X
      modifiers: [ "metaKey" ],
      success: () => {
        nodesStore.cutNodes();
      },
    },
    {
      keyCode: 86, // V
      modifiers: [ "ctrlKey" ],
      success: () => {
        if (!isTrash.value && (nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true)) {
          nodesStore.pasteNodes();
        }
      },
    },
    {
      keyCode: 86, // V
      modifiers: [ "metaKey" ],
      success: () => {
        if (!isTrash.value && (nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true)) {
          nodesStore.pasteNodes();
        }
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
