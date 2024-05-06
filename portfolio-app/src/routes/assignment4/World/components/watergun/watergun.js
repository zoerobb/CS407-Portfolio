import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';

async function loadWaterGun() {
    const loader = new GLTFLoader();

    const waterGunData = await loader.loadAsync('WaterGun.glb');

    const waterGun = setupModel(waterGunData);
    waterGun.scale.set(0.05, 0.05, 0.05);
    waterGun.position.set(-0.08, -0.2, 0.34);
    waterGun.rotation.z = -(Math.PI / 2);
    return { waterGun }
}

export { loadWaterGun };