import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';

async function loadDragon() {
    const loader = new GLTFLoader();

    const dragonData = await loader.loadAsync('dragon.glb');

    const dragon = setupModel(dragonData);
    dragon.scale.set(0.25, 0.25, 0.25);
    return { dragon }
}

export { loadDragon };