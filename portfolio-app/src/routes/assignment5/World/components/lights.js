import { AmbientLight } from 'three';

function createAmbientLight() {
    const ambientLight = new AmbientLight('lightpink', 5);

    return ambientLight;
}
export { createAmbientLight };