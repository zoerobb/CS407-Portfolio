import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';
import { Box3, Box3Helper } from 'three';

async function loadSage() {
    const { sageHead } = await loadSageHead();
    const { sageBody } = await loadSageBody();
    const { sageTail } = await loadSageTail();

    sageHead.add(sageBody);
    sageHead.add(sageTail);

    return { sage: sageHead };
}

async function loadSageHead() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagehead.glb');

    const sageHead = setupModel(sageData);
    return { sageHead }
}

async function loadSageBody() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagebody.glb');

    console.log('sageData', sageData);

    const sageBody = setupModel(sageData);
    return { sageBody }
}

async function loadSageTail() {
    const loader = new GLTFLoader();

    const sageData = await loader.loadAsync('Sagetail.glb');

    console.log('sageData', sageData);

    const sageTail = setupModel(sageData);
    return { sageTail }
}

export { loadSageHead };
export { loadSageBody };
export { loadSageTail };
export { loadSage };