import { DirectionalLight, AmbientLight } from 'three';

function createAmbientLights() {
    const ambientLight = new AmbientLight('#ffffff', .5);

    return ambientLight;
}

function createDirectionalLight() {
    const directionalLight = new DirectionalLight('#000fff', 2.3);
    directionalLight.position.set(0, 1, 0); // Position the light above the scene

    return directionalLight;
}

export { createAmbientLights, createDirectionalLight };