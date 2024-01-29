<script>
import performanceDashboard from './components/performanceDashboard.vue';
import './assets/style.css';
export default {
  components: {
    // rendering performance components
    performanceDashboard,
  },
};
</script>
<template>
  <main>
    <performanceDashboard />
  </main>
  <!-- <div class="flex flex-col lg:flex-row"> -->
  <!-- this section will be the left section -->
  <!-- <div class="w-1/2 bg-gray-400">
      <barChart />
    </div> -->
  <!-- this section will be the right section -->
  <!-- <div class="w-1/2 bg-gray-400">
      <barChart />
    </div>
  </div> -->
</template>

<style></style>
