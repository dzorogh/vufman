<template>
  <AppBreadCrumbs />

  <div class="grid grid-cols-1 overflow-x-hidden">
    <TransitionGroup
      name="list"
    >
      <AppNode
        v-for="(child) in nodes"
        :key="child.id"
        :node="child"
        class="border border-transparent"
        :class="{'bg-slate-100': selectedNodes.includes(child.id)}"
        @contextmenu="showContextMenu(child, $event)"
        @click="selectedNodes.push(child.id)"
      />
    </TransitionGroup>

    <ContextMenu
      ref="menu"
      :model="menuItems"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import ContextMenu from 'primevue/contextmenu';

import Api from '@/services/Api';
import AppNode from "@/components/AppNode.vue";
import AppBreadCrumbs from "@/components/AppBreadCrumbs.vue";

import { Node } from "@/types/Node";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";

const deleteAction = useDeleteAction();
const renameAction = useRenameAction();

const nodes = ref(await Api.getNodes({ id: null }));

const selectedNodes = reactive([]);

const activeContextNode = ref<Node>();
const menu = ref();
const showContextMenu = (child: Node, event: any) => {
  activeContextNode.value = child;
  menu.value.show(event);
};
const menuItems = computed<object[]>(() => [
  {
    label: activeContextNode.value?.extension ? `${activeContextNode.value?.name}.${activeContextNode.value?.extension}` : activeContextNode.value?.name,
    icon: activeContextNode.value?.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file',
    disabled: true,
  },
  {
    separator: true,
  },
  {
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open'
  },
  {
    label: 'Скопировать',
    icon: 'pi pi-fw pi-copy'
  },
  {
    label: 'Переименовать',
    icon: 'pi pi-fw pi-pencil',
    command: async () => {
      if (activeContextNode.value && nodes.value) {
        const result = await renameAction.show(activeContextNode.value);

        console.log(result);

        if (result) {

          const currentNodeIndex = nodes.value.findIndex((item) => {
            return item.id === activeContextNode.value?.id;
          });

          nodes.value[currentNodeIndex].name = result;

          // TODO: Actually delete node
        }
      }
    }
  },
  {
    label: 'Скачать',
    icon: 'pi pi-fw pi-download',
    command() {
      alert('Скачивание');
    }
  },
  {
    label: 'Удалить',
    icon: 'pi pi-fw pi-trash text-danger',
    command: async () => {
      if (activeContextNode.value && nodes.value) {
        const result = await deleteAction.show([ activeContextNode.value ]);

        if (result === true) {
          const currentNodeIndex = nodes.value.findIndex((item) => {
            return item.id === activeContextNode.value?.id;
          });

          nodes.value.splice(currentNodeIndex, 1);

          // TODO: Actually delete node
        }
      }
    }
  }
]);

</script>

<style scoped>
</style>
