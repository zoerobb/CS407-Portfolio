import { AmbientLight } from 'three';

function createAmbientLight() {
    const ambientLight = new AmbientLight('#0059ff', 1);

    return ambientLight;
}
export { createAmbientLight };