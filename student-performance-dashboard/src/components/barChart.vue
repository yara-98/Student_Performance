<template>
  <div>
    <div v-if="loading"></div>
    <div v-else>
      <canvas ref="barChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      avg_score: {},
      loading: true, // used to render elements
      chart: null, // to store refrences
    };
  },
  mounted() {
    this.fetchAverageScores();
  },
  methods: {
    fetchAverageScores() {
      axios
        .get('http://localhost:4000/averageScores') // the local host that the data will be rendering from
        .then((response) => {
          this.avg_score = response.data; // update with response data
          this.loading = false; // set loading to false after the data is fethced
          this.renderChart(); // render the chart with the data
        })
        .catch((error) => {
          console.error(error);
          this.loading = false; // loading will be false if there is an error
        });
    },
    renderChart() {
      this.$nextTick(() => {
        // make sure that the dom has been updated
        const ctx = this.$refs.barChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar', // type of the chart
          data: {
            labels: ['G1', 'G2', 'G3'], // the x-axis labels
            datasets: [
              {
                label: 'Average Scores', // the title of the table
                data: [this.avg_score.G1, this.avg_score.G2, this.avg_score.G3], //adding the data that the table will use
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
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
        });
      });
    },
  },
};
</script>

<style scoped></style>
