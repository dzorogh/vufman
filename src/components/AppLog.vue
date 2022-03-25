<template>
  <div class="grid p-4">
    <!--    <n-data-table
          ref="table"
          remote
          :columns="columns"
          :data="dataRef"
          :loading="loadingRef"
          :pagination="paginationReactive"
          :row-key="rowKey"
          @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />-->
    <n-data-table
      ref="table"
      remote
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">

import { h, onMounted, reactive, ref } from "vue";
import { generateUUID } from "@/services/generateUUID";
import { NInput } from "naive-ui";


const dateColumn = ref({
  title: 'Дата',
  key: 'date',
  sorter: true,
});

const userColumn = ref({
  title: 'Пользователь',
  key: 'user',
  sorter: true,
});

const nodeColumn = ref({
  title: 'Файл/папка',
  key: 'node',
});

const actionColumn = ref({
  title: 'Действие',
  key: 'action',
  sorter: true,
  filterOptions: [
    {
      label: 'Удаление',
      value: 'delete'
    },
    {
      label: 'Создание',
      value: 'create'
    }
  ]
});

const columns = reactive([
  dateColumn,
  userColumn,
  nodeColumn,
  actionColumn
]);

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }: { itemCount: number }) {
    return `Всего записей: ${itemCount}`;
  }
});

// const data = Array(987).map((item, index) => {
//   return {
//     column1: index,
//     column2: (index % 2) + 1,
//     column3: generateUUID()
//   };
// });
//
// const query = (page: number, perPage = 10, order = 'asc') => {
//   return new Promise((resolve) => {
//     const copiedData = [ ...data ];
//     const orderedData = order === 'desc' ? copiedData.reverse() : copiedData;
//
//     // const filteredData = filterValues.length
//     //   ? orderedData.filter((row) => filterValues.includes(row.column2))
//     //   : orderedData;
//
//     const pagedData = orderedData.slice((page - 1) * perPage, page * perPage);
//     const total = orderedData.length;
//     const lastPage = Math.ceil(orderedData.length / perPage);
//
//     setTimeout(
//       () =>
//         resolve({
//           meta: {
//             page,
//             total,
//             last_page: lastPage
//           },
//           data: pagedData,
//         }),
//       1500
//     );
//   });
// };

// const dataRef = ref([]);
// const loadingRef = ref(true);
// const paginationReactive = reactive({
//   page: 1,
//   pageCount: 1,
//   pageSize: 10,
//   prefix({ itemCount }: { itemCount: number }) {
//     return `Всего записей: ${itemCount}`;
//   }
// });
//
// onMounted(() => {
//   query(
//     paginationReactive.page,
//     paginationReactive.pageSize,
//     column1Reactive.sortOrder,
//     column2Reactive.filterOptionValues
//   ).then((data) => {
//     dataRef.value = data.data;
//     paginationReactive.pageCount = data.pageCount;
//     paginationReactive.itemCount = data.total;
//     loadingRef.value = false;
//   });
// });
//
//
// // column1: column1Reactive,
// // column2: column2Reactive,
// // pagination: paginationReactive,
// // loading: loadingRef,
//
// const rowKey = (rowData) => {
//   return rowData.column1;
// };
//
//
// const handleSorterChange = (sorter) => {
//   if (!sorter || sorter.columnKey === 'column1') {
//     if (!loadingRef.value) {
//       loadingRef.value = true;
//       query(
//         paginationReactive.page,
//         paginationReactive.pageSize,
//         !sorter ? false : sorter.order,
//         column2Reactive.filterOptionValues
//       ).then((data) => {
//         column1Reactive.sortOrder = !sorter ? false : sorter.order;
//         dataRef.value = data.data;
//         paginationReactive.pageCount = data.pageCount;
//         paginationReactive.itemCount = data.total;
//         loadingRef.value = false;
//       });
//     }
//   }
// };
//
// const handleFiltersChange = (filters) => {
//   if (!loadingRef.value) {
//     loadingRef.value = true;
//     const filterValues = filters.column2 || [];
//     query(
//       paginationReactive.page,
//       paginationReactive.pageSize,
//       column1Reactive.sortOrder,
//       filterValues
//     ).then((data) => {
//       column2Reactive.filterOptionValues = filterValues;
//       dataRef.value = data.data;
//       paginationReactive.pageCount = data.pageCount;
//       paginationReactive.itemCount = data.total;
//       loadingRef.value = false;
//     });
//   }
// };
//
// const handlePageChange = (currentPage) => {
//   if (!loadingRef.value) {
//     loadingRef.value = true;
//     query(
//       currentPage,
//       paginationReactive.pageSize,
//       column1Reactive.sortOrder,
//       column2Reactive.filterOptionValues
//     ).then((data) => {
//       dataRef.value = data.data;
//       paginationReactive.page = currentPage;
//       paginationReactive.pageCount = data.pageCount;
//       paginationReactive.itemCount = data.total;
//       loadingRef.value = false;
//     });
//   }
// };
</script>

<style scoped>

</style>
