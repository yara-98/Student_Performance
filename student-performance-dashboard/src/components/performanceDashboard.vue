import './assets/style.css';
<script setup>
import barChart from './barChart.vue';
import parentTable from './parentTable.vue';
</script>
<template>
  <header class="bg-slate-500">
    <div class="content flex gap-12 w-full">
      <img
        src="../assets/dashboard .png "
        class="object-cover ml-12 w-14 h-14"
        alt="logo"
      />
      <div class="text-xl py-3 px-40">Student Perfomance Dashboard</div>
    </div>
  </header>
  <!-- will split the page into to sides rigth and left side -->
  <div class="flex flex-col md:flex-row">
    <!-- this section will be the left section -->
    <div class="w-full lg:w-1/2 ml-4">
      <!-- rendering the Bar Char that represent the average values for the subjects to the main web page -->
      <h1>Average Students Grades</h1>
      <barChart />
    </div>
    <!-- this section will be the right section -->
    <!-- rendering a table that will include student count depending on the parents work -->
    <div class="w-full md:w-1/2 ml-4 mr-1">
      <!-- rendering the table that -->
      <h1>Count of student depending on the parent work</h1>
      <parentTable />
    </div>
  </div>
  <div>
    <!-- this section will be the right section -->
    <div class="w-full lg:w-3/4 ml-4">
      <!-- Pie chart that represent the persentage of gender in the following -->
      <h1>Gender precentage in the following classes</h1>
      <pieChart />
    </div>
  </div>
  <footer class="bg-slate-500">
    <div class="flex-col gap-1 w-full">
      <p class="pt-2 text-2xl font-sans text-center text-black">
        Student Perfomance Dashboard
      </p>
    </div>
  </footer>
</template>

<style></style>
