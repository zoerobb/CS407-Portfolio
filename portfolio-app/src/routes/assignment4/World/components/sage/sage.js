import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';
import { Box3, Box3Helper } from 'three';


async function loadSageHead() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagehead.glb');

    console.log('sageData', sageData);

    sageData.scene.traverse((object) => {
        if (object.isMesh) {
            console.log('Object:', object);
            console.log('Geometry attributes:', object.geometry.attributes);
        }
    });

    const sageHead = setupModel(sageData);
    return { sageHead }
}

async function loadSageBody() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagebody.glb');

    console.log('sageData', sageData);

    sageData.scene.traverse((object) => {
        if (object.isMesh) {
            console.log('Object:', object);
            console.log('Geometry attributes:', object.geometry.attributes);
        }
    });

    const sageBody = setupModel(sageData);
    return { sageBody }
}

async function loadSageTail() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagetail.glb');

    console.log('sageData', sageData);

    sageData.scene.traverse((object) => {
        if (object.isMesh) {
            console.log('Object:', object);
            console.log('Geometry attributes:', object.geometry.attributes);
        }
    });

    const sageTail = setupModel(sageData);
    return { sageTail }
}

export { loadSageHead };
export { loadSageBody };
export { loadSageTail };