
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
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: []
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0.0,
              max: 1.0
            }
          }],
          xAxes: [{
            display: false
          }]
        },
        tooltips: {enabled: false},
        hover: {mode: null}
      }
    });
  }

  cameraAccess() {
    $('body').toast({
      class: 'info',
      title: 'Camera',
      showIcon: 'video',
      closeIcon: true,
      message: "Please allow camera access to try this demo. No information will leave your browser."
    });
  }

  cameraReady() {
    $('body').toast({
      class: 'success',
      title: 'Camera',
      closeIcon: true,
      message: "Camera found."
    });
    $('#intakeCameraLoader').removeClass('active');
  }

  cameraError() {
    $('body').toast({
      class: 'error',
      title: 'Camera',
      closeIcon: true,
      message: "No camera found."
    });
  }

  modelWaiting() {
    $('#intakeGraphLoader').addClass('active');
  }

  modelReady() {
    $('#intakeGraphLoader').removeClass('active');
  }

  updateChart(p, t) {
    // Add new data
    console.log(p);
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

  close() {
    $('#intakeModal').modal('hide');
  }
}
