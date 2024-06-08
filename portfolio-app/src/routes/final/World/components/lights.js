import { AmbientLight, DirectionalLight } from "three";

function createAmbientLight() {
    const ambientLight = new AmbientLight('#ffffff', 0.1);
    return ambientLight;
}

function createDirectionalLight() {
    const dirLight = new DirectionalLight('#ffffff', 2);
    dirLight.position.set(5, 10, 8);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.mapSize.set(1024, 1024);
    return dirLight;
}

export { createAmbientLight, createDirectionalLight};