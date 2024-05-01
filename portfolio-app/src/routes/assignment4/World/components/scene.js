import { Color, Scene, CubeTextureLoader } from 'three';

function createScene(renderer, camera) {
  const scene = new Scene();

  // Load the skybox images
  const loader = new CubeTextureLoader();
  loader.load([
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png', 
    'nz.png',
  ], (texture) => {
    scene.background = texture;

    renderer.render(scene, camera);

  });

  return scene;
}

export { createScene };