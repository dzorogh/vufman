<template>
  <AppBreadCrumbs />

  <div class="grid grid-cols-1">
    <AppNode
      v-for="(child) in nodes"
      :key="child.id"
      :node="child"
      @contextmenu="showContextMenu(child, $event)"
    />

    <ContextMenu
      ref="menu"
      :model="menuItems"
    />
  </div>
</template>

<script setup lang="ts">
import Api from '../service/Api';
import AppNode from "./AppNode.vue";
import AppBreadCrumbs from "./AppBreadCrumbs.vue";
import { computed, ref } from "vue";
import ContextMenu from 'primevue/contextmenu';
import { Node } from "../types/Node";
import { MenuItem } from "primevue/menuitem";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const nodes = await Api.getNodes({ id: null });

const activeContextNode = ref<Node>();
const menu = ref();
const showContextMenu = (child: Node, event: any) => {
  activeContextNode.value = child;
  menu.value.show(event);
}
const menuItems = computed<MenuItem[]>(() => [
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
    icon: 'pi pi-fw pi-pencil'
  },
  {
    label: 'Скачать',
    icon: 'pi pi-fw pi-download'
  },
  {
    label: 'Удалить',
    icon: 'pi pi-fw pi-trash text-danger',
    command: (event) => {
      confirm.require({
        message: 'Вы уверены, что хотите удалить?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          alert('Удаление')
        },
        reject: () => {
          //
        }
      });
    }
  }
]);

</script>

<style scoped>
</style>
