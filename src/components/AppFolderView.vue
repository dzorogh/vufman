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
        class="border border-transparent hover:bg-slate-50"
        :class="{'!bg-slate-100': selectedNodes.includes(child)}"
        @click.ctrl="selectNodeControl(child)"
        @click.meta="selectNodeControl(child)"
        @click.shift="selectNodeShift(child)"
        @click.exact="selectNodeSingle(child)"
        @contextmenu="showContextMenu(child, $event)"
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
import { MenuItem } from "primevue/menuitem";

import Api from '@/services/Api';
import AppNode from "@/components/AppNode.vue";
import AppBreadCrumbs from "@/components/AppBreadCrumbs.vue";

import { Node } from "@/types/Node";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";

const deleteAction = useDeleteAction();
const renameAction = useRenameAction();

const nodes = ref(await Api.getNodes({ id: null }));

const selectedNodes = ref<Node[]>([]);
const selectNodeSingle = (node: Node) => {
  selectedNodes.value = [ node ];
};
const selectNodeControl = (node: Node) => {
  selectedNodes.value.push(node);
};
const selectNodeShift = (node: Node) => {
  if (selectedNodes.value.length <= 0) {
    selectedNodes.value = [ node ];
  } else {
    if (nodes.value) {

      const firstNodeIndex = nodes.value.indexOf(selectedNodes.value[0]);
      const lastNodeIndex = firstNodeIndex + selectedNodes.value.length - 1;
      const selectedNodeIndex = nodes.value.indexOf(node);

      selectedNodes.value = [];

      // Select all nodes between first and selected node
      // Including edge items
      nodes.value.forEach((item, index) => {
        if (index >= firstNodeIndex && index <= selectedNodeIndex) {
          selectedNodes.value.push(item);
        }

        if (index >= selectedNodeIndex && index <= lastNodeIndex) {
          selectedNodes.value.push(item);
        }
      });
    }
  }
};

const menu = ref();
const showContextMenu = (node: Node, event: any) => {
  if (selectedNodes.value.indexOf(node) < 0) {
    selectNodeSingle(node);
  }

  menu.value.show(event);
};
const selectedNodesLabel = computed(() => {
  if (selectedNodes.value.length > 1) {
    return 'Выбрано несколько файлов/папок';
  }

  if (selectedNodes.value.length === 1) {
    const singleNode = selectedNodes.value[0];
    return singleNode.extension ? `${singleNode.name}.${singleNode.extension}` : singleNode.name;
  }

  return 'Файлы/папки не выбраны';
});
const selectedNodesIcon = computed(() => {
  if (selectedNodes.value.length > 1) {
    return 'pi pi-fw pi-copy';
  }

  if (selectedNodes.value.length === 1) {
    const singleNode = selectedNodes.value[0];
    return singleNode.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file';
  }

  return 'pi pi-fw';
});
const menuItems = computed<object[]>(() => {
  const result = [] as MenuItem[];

  result.push({
    label: selectedNodesLabel.value,
    icon: selectedNodesIcon.value,
    disabled: true,
    class: 'context-menu-title',
  });

  result.push({
    separator: true,
  });

  result.push({
    label: 'Переместить',
    icon: 'pi pi-fw pi-folder-open'
  });

  result.push({
    label: 'Скопировать',
    icon: 'pi pi-fw pi-copy'
  });

  if (selectedNodes.value.length === 1) {
    const selectedNode = selectedNodes.value[0];

    result.push({
      label: 'Переименовать',
      icon: 'pi pi-fw pi-pencil',
      command: async () => {
        if (selectedNode && nodes.value) {
          const result = await renameAction.show(selectedNode);

          console.log(result);

          if (result) {

            const currentNodeIndex = nodes.value.findIndex((item) => {
              return item.id === selectedNode.id;
            });

            nodes.value[currentNodeIndex].name = result;

            // TODO: Actually delete node
          }
        }
      }
    });
  }

  result.push({
    label: 'Скачать',
    icon: 'pi pi-fw pi-download',
    command() {
      alert('Скачивание');
    }
  });

  result.push({
    label: 'Удалить',
    icon: 'pi pi-fw pi-trash text-danger',
    command: async () => {
      /* if (activeContextNode.value && nodes.value) {
         const result = await deleteAction.show([ activeContextNode.value ]);

         if (result === true) {
           const currentNodeIndex = nodes.value.findIndex((item) => {
             return item.id === activeContextNode.value?.id;
           });

           nodes.value.splice(currentNodeIndex, 1);

           // TODO: Actually delete node
         }
       }*/
    }
  });

  return result;
});

</script>

<style scoped>
</style>
