import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
  );

  camera.position.set(0, 0, 0);

  return camera;
}

export { createCamera };