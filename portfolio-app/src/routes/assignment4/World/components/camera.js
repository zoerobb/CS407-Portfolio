import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 0);

  return camera;
}

export { createCamera };