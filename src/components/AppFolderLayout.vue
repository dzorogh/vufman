<template>
  <template v-if="nodesStore.nodesLoading">
    <div class="flex items-center justify-center">
      <n-spin size="large" />
    </div>
  </template>
  <template v-else>
    <div class="flex flex-col overflow-hidden divide-y">
      <AppFolderHeading :is-trash="isTrash" />

      <div class="grid grid-cols-4 grow overflow-hidden">
        <div class="h-full overflow-hidden flex flex-col col-span-3 divide-y">
          <div
            class="grow bg-white shadow-sm overflow-auto"
            @click.self="nodesStore.deselect()"
          >
            <AppFolderList :is-trash="isTrash" />
          </div>
        </div>

        <div class="flex flex-col border-l p-6 gap-10 overflow-auto">
          <AppNodeMenu
            v-if="nodesStore.currentFolder"
            class="mb-auto"
            :node="nodesStore.currentFolder"
          />
          <AppNodeInfo
            v-if="nodesStore.currentFolder"
            :node="nodesStore.currentFolder"
          />
        </div>
      </div>
    </div>
  </template>
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

const confirmStore = useConfirmStore();
const promptStore = usePromptStore();
const nodesStore = useNodesStore();
const route = useRoute();
const api = useApi();

// testModule();

const isTrash = computed(() => {
  return typeof route.query.trash !== 'undefined';
});


watch(() => [ route.params.folderId, route.name, route.query.trash ],
  async ([ folderId, routeName, trash ]) => {

    console.log({ folderId, routeName, trash });

    if (routeName === 'folder') {
      nodesStore.nodesLoading = true;
      nodesStore.selectedNodes = [];

      [ nodesStore.currentFolder, nodesStore.nodes ] = await Promise.all([
        api.folder({ id: folderId as string }),
        api.nodes({
          folderId: folderId as string || null,
          isTrashed: isTrash.value || undefined
        }, true)
      ]);

      nodesStore.nodesLoading = false;
    }

  }, {
    immediate: true
  });


const keyboardActive = computed(() => {
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
        nodesStore.deleteNodes();
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "metaKey" ], // + cmd
      success: () => {
        nodesStore.deleteNodes();
      },
    },
    {
      keyCode: 8, // backspace
      modifiers: [ "ctrlKey" ], // + ctrl
      success: () => {
        nodesStore.deleteNodes();
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
