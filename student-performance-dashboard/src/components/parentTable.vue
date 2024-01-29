<template>
  <div>
    <table class="w-16 md:w-32 lg:w-48">
      <thead>
        <tr>
          <th>Gender</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.sex"></tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const result = ref(null);
    axios
      .get('http://localhost:4000/averageScores')
      .then((data) => (result.value = data));
    return { result };
  },
};
</script>
<style>
th,
td {
  border: 1px solid #ddd;
  padding: 3px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
