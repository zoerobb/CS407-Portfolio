import { AmbientLight } from 'three';
import { DirectionalLight } from 'three';

function createAmbientLight() {
    const ambientLight = new AmbientLight('lightpink', 5);

    return ambientLight;
}

function createDirectionalLight() {
    const directionalLight = new DirectionalLight('#000fff', 10);
    directionalLight.position.set(0, 0, 0);

    return directionalLight;

}
export { createAmbientLight };
export { createDirectionalLight };