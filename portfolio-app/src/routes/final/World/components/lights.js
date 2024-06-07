import { AmbientLight } from "three";

function createLights() {
    const ambientLight = new AmbientLight('#ffffff', 1.5);
    return ambientLight;
}

export { createLights };