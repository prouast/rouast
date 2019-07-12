
/**
 * UI controller for intake gesture detection
 */
export class UI {
  constructor(chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          //label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: []
        }]
      },
      options: {}
    });
  }

  updateChart(p, t) {
    // Add new data
    this.chart.data.labels.push(t);
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(p);
    });
    // Remove old data if necessary
    const numLabels = this.chart.data.labels.length;
    if (numLabels >= 2
          && this.chart.data.labels[numLabels-1] - this.chart.data.labels[0] > 5000) {
      this.chart.data.labels.shift();
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
    }
    this.chart.update();
  }
}
