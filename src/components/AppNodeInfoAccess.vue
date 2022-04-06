<template>
  <AppNodeInfoItem
    title="Доступ"
    :content="'Общий доступ: ' + (newAccess && newAccess.global ? accessTypes[newAccess.global] : 'Не задан')"
    :description="newAccess && newAccess.partial.length ? `Частных правил: ${newAccess.partial.length}` : 'Частные правила не заданы'"
  />

  <div>
    <n-button
      v-if="!node.isTrashed"
      @click="showEditAccess = true"
    >
      Изменить доступы
    </n-button>

    <n-modal
      v-model:show="showEditAccess"
      class="custom-card"
      preset="card"
      style="width: 800px"
      title="Доступы"
      :bordered="false"
      size="huge"
    >
      <div>
        <div>
          <n-form-item
            label="Общий доступ"
          >
            <n-select
              v-model:value="newAccess.global"
              placeholder="Select"
              :options="accessOptions"
            />
          </n-form-item>
        </div>

        <n-form-item
          label="Частный доступ"
          :feedback="partialValidationStatus"
        >
          <n-dynamic-input
            v-model:value="newAccess.partial"
            :on-create="createPartialRow"
          >
            <template #create-button-default>
              Добавить доступ
            </template>

            <template #default="{ value }">
              <div
                class="flex w-full gap-2"
              >
                <n-select
                  v-model:value="value.type"
                  placeholder="Тип"
                  class="w-36 flex-none"
                  :options="accessTypeOptions"
                  @update:value="value.id = null"
                />

                <n-select
                  v-if="value.type === 'user'"
                  v-model:value="value.id"
                  placeholder="Пользователь"
                  class=""
                  :options="usersOptions"
                />

                <n-select
                  v-if="value.type === 'role'"
                  v-model:value="value.id"
                  placeholder="Роль"
                  class=""
                  :options="rolesOptions"
                />

                <n-select
                  v-if="value.type && value.id"
                  v-model:value="value.access"
                  placeholder="Доступ"
                  class=""
                  :options="accessOptions"
                />
              </div>
            </template>
          </n-dynamic-input>
        </n-form-item>
      </div>

      <template #footer>
        <div class="flex gap-4">
          <n-button
            type="primary"
            size="large"
            :disabled="partialIsValid"
            :loading="saving"
            @click="saveAccess"
          >
            Сохранить
          </n-button>

          <n-button
            size="large"
            @click="showEditAccess = false"
          >
            Закрыть
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { IAccess } from "@/types/IAccess";
import { INodeModel } from "@/types/INodeModel";
import AppNodeInfoItem from "@/components/AppNodeInfoItem.vue";
import { useNodesActions } from "@/composables/useNodesActions";
import { useStore } from "@/store/main";
import { accessTypes } from "@/config/accessTypes";

const props = defineProps<{
  node: INodeModel;
}>();

// const emit = defineEmits<{
//   (e: 'updateAccess'): void;
// }>();

const store = useStore();
const nodesActions = useNodesActions();

const saving = ref(false);
const showEditAccess = ref(false);
const newAccess = reactive<IAccess>(
  {
    global: props.node.access ? props.node.access.global : null,
    partial: props.node.access ? props.node.access.partial : []
  }
);
const saveAccess = async () => {
  saving.value = true;
  await nodesActions.saveAccess(props.node, newAccess);
  saving.value = false;
  showEditAccess.value = false;
};

const createPartialRow = () => {
  return {
    type: null,
    id: null,
    access: null
  };
};

const accessOptions = [
  {
    label: 'Запись',
    value: 'write'
  },
  {
    label: 'Чтение',
    value: 'read'
  },
  {
    label: 'Запрещен',
    value: 'denied'
  }
];

const accessTypeOptions = [
  {
    label: 'Пользователь',
    value: 'user'
  },
  {
    label: 'Роль',
    value: 'role'
  },
];

const usersOptions = computed(() => {
  return store.users.map(user => {
    return {
      value: user.id,
      label: `${user.firstName} ${user.lastName}`
    };
  });
});

const rolesOptions = computed(() => {
  return store.roles.map(role => {
    return {
      value: role.id,
      label: role.name
    };
  });
});

const partialIsValid = computed(() => {
  let error = false;

  newAccess.partial.forEach(row => {
    if (!row.type) {
      error = true;
    }

    if (!row.access) {
      error = true;
    }

    if (!row.id) {
      error = true;
    }
  });

  return error;
});

const partialValidationStatus = computed(() => {
  return partialIsValid.value ? 'Выберите параметры или удалите строку' : null;
});

</script>

<style scoped>

</style>
