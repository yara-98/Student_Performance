import './assets/style.css';
<script setup>
import barChart from './barChart.vue';
import parentTable from './parentTable.vue';
</script>
<template>
  <header>
    <div>
      <div class="w-[100%] h-16 bg-slate-500"></div>
      <div class="text text-center mb-9">Student Perfomance Dashboard</div>
    </div>
  </header>
  <div class="container">
    <!-- will split the page into to sides rigth and left side -->
    <div class="flex flex-col lg:flex-row">
      <!-- this section will be the left section -->
      <div class="w-1/2">
        <!-- rendering the Bar Char that represent the average values for the subjects to the main web page -->
        <h1>Average Students Grades</h1>
        <barChart />
      </div>

      <!-- this section will be the right section -->
      <div class="w-full lg:w-1/2 bg-gray-200 ml-4">
        <!-- rendering the table that -->
        <parentTable class="tableWidth" />
      </div>
    </div>
  </div>
  <footer>
    <div>
      <div class="mt-10 w-[100%] h-16 bg-slate-500"></div>
      <div class="text text-center">Dashboard</div>
    </div>
  </footer>
</template>

<style>
body {
  /* margin-left: 10px; */
  font-family: Arial, Helvetica, sans-serif;
}
header {
  margin-left: -50px;
}
.text {
  margin-top: -45px;
}
table {
  width: 40%;
  align-content: center;
}
.flex {
  margin-right: 10px;
}
.container {
  margin-left: 10px;
}
.tableWidth table {
  width: 100%;
}
</style>
