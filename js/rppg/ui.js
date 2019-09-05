
/**
 * UI controller for rppg
 */
export class UI {
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
    $('#rppgCameraLoader').removeClass('active');
  }
  cameraError() {
    $('body').toast({
      class: 'error',
      title: 'Camera',
      closeIcon: true,
      message: "No camera found."
    });
  }
  close() {
    $('#rppgModal').modal('hide');
  }
}
