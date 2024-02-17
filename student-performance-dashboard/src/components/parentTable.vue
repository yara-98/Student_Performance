import './assets/style.css';
<template>
  <div>
    <sorted-table class="w-full">
      <thead class="border-collapse border border-slate-500">
        <tr>
          <th
            scope="col"
            class="border border-gray-200 py-2 px-4 text-center w-1/3"
          >
            <sort-link name="id">Job</sort-link>
          </th>
          <th
            scope="col"
            class="border border-gray-200 py-2 px-4 text-center w-1/3"
          >
            <sort-link name="name">Female</sort-link>
          </th>
          <th
            scope="col"
            class="border border-gray-200 py-2 px-4 text-center w-1/3"
          >
            <sort-link name="name">Male</sort-link>
          </th>
          <th
            scope="col"
            class="border border-gray-200 py-2 px-8 text-center w-1/3"
          >
            <sort-link name="name">Total</sort-link>
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-100">
        <template v-for="(item, index) in data" :key="index">
          <tr class="border-b text-center border border-slate-700">
            <td>{{ item.parent_job }}</td>
            <td>{{ item.count }}</td>
            <!-- Third row for dataM -->
            <td>{{ dataM[index] ? dataM[index].total_count_m : '-' }}</td>
            <td>
              {{ item.count + (dataM[index] ? dataM[index].total_count_m : 0) }}
            </td>
          </tr>
        </template>
      </tbody>
    </sorted-table>
  </div>
</template>
<script>
// import axios from 'axios';
// export default {
//   data() {
//     return {
//       loading: true, // Assuming you have a loading indicator
//       data: [], // Initialize data property
//     };
//   },
//   mounted() {
//     axios
//       .get('http://localhost:4000/parent')
//       .then((response) => {
//         this.data = response.data; // Assigning data to the data property
//         this.loading = false; // Set loading to false once data is received
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         this.loading = false; // Set loading to false on error
//       });
//   },
// };
import axios from 'axios';
export default {
  data() {
    return {
      loading: true,
      data: [],
      dataM: [],
    };
  },
  mounted() {
    axios
      .get('http://localhost:4000/parent')
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.error('Error fetching parentWork data:', error);
      })
      .finally(() => {
        this.loading = false;
      });

    axios
      .get('http://localhost:4000/parentM')
      .then((response) => {
        this.dataM = response.data;
      })
      .catch((error) => {
        console.error('Error fetching parentM data:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // false to make the chart filling the space
    aspectRatio: 1.5,
  },
};
</script>
<style></style>
