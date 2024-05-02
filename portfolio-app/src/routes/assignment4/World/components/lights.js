import { DirectionalLight, AmbientLight } from 'three';

function createAmbientLights() {
    const ambientLight = new AmbientLight('#ffffff', .5);

    return ambientLight;
}

function createDirectionalLight() {
    const directionalLight = new DirectionalLight('#000fff', 2.3);
    directionalLight.position.set(0, 1, 0);

    return directionalLight;
}

function createMoonLight() {
    const moonLight = new DirectionalLight('#ff69b4', 2);
    moonLight.position.set(1000, 1000, -1000);

    return moonLight;

}

export { createAmbientLights, createDirectionalLight, createMoonLight};