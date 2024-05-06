import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
  );

  camera.position.set(0, 2, 6);

  return camera;
}

export { createCamera };