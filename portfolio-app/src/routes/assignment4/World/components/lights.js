import { DirectionalLight } from 'three';
import { AmbientLight } from 'three';

function createAmbientLights() {
    const ambientLight = new AmbientLight('#fffff', 1.5);

    return ambientLight;
}
export { createAmbientLights };