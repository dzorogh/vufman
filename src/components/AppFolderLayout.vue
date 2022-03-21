<template>
  <div class="grid grid-cols-4">
    <div
      class="h-full overflow-hidden rounded-l-xl flex flex-col col-span-3"
    >
      <AppFolderHeading :is-trashed="!!route.meta.isTrash" />

      <div
        class="grow bg-white shadow-sm rounded-bl-xl overflow-auto"
        @click.self="nodesStore.deselect()"
      >
        <AppFolderView v-if="!nodesStore.nodesLoading" />

        <div
          v-else
          class="flex item-center justify-center h-full min-h-full"
        >
          <div class="flex items-center justify-center">
            <ProgressSpinner
              class="!w-24 !h-24 !m-4"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white flex flex-col border-l p-6 gap-10 overflow-auto">
      <template v-if="!nodesStore.nodesLoading">
        <AppNodeInfo
          v-if="nodesStore.currentFolder"
          :node="nodesStore.currentFolder"
        />
        <AppNodeMenu
          v-if="nodesStore.currentFolder"
          class="mt-auto"
          :node="nodesStore.currentFolder"
        />
      </template>

      <ProgressSpinner
        v-else
        class="!w-7 !h-7 !m-0 !ml-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useKeypress, } from 'vue3-keypress';
import ProgressSpinner from 'primevue/progressspinner';
import AppFolderHeading from "@/components/AppFolderHeading.vue";
import AppFolderView from "@/components/AppFolderList.vue";
import AppNodeInfo from "@/components/AppNodeInfo.vue";
import AppNodeMenu from "@/components/AppNodeMenu.vue";
import { useNodesStore } from "@/store/nodes";
import api from "@/services/api";


const nodesStore = useNodesStore();
const route = useRoute();

watch(() => [ route.meta.isRoot, route.meta.isTrash, route.params.folderId, route.name ],
  async ([ isRoot, isTrash, folderId, routeName ]) => {

    // console.log(isRoot, isTrash, folderId, routeName);

    if (routeName === 'folder' || routeName === 'root' || routeName === 'trash') {
      nodesStore.nodesLoading = true;
      nodesStore.selectedNodes = [];

      [ nodesStore.currentFolder, nodesStore.nodes ] = await Promise.all([
        api.getFolder({ id: folderId as string }),
        api.getNodes({
          folderId: folderId as string || null,
          isTrashed: isTrash ? true : undefined
        }, true)
      ]);

      nodesStore.nodesLoading = false;
    }

  }, {
    immediate: true
  });


useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: 65, // A
      modifiers: [ "metaKey" ], // cmd
      success: () => {
        nodesStore.selectAllNodes();
      },
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
  // onWrongKey: someWrongKeyCallback,
  // onAnyKey: someAnyKeyCallback,
  // isActive: isActiveRef,
});

</script>

<style scoped>
</style>
