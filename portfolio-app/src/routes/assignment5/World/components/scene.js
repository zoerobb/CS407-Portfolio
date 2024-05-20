import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('#9ba0ad');

  return scene;
}

export { createScene };