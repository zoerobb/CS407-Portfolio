import { DirectionalLight } from 'three';
import { AmbientLight } from 'three';

function createLights() {
    // Create a directional light
    const light = new DirectionalLight('#FF00ED', 14);

    // move the light right, up, and towards us
    light.position.set(70, 5, 15);
    
    return light;
}
export { createLights };


function createAmbientLights() {
    const ambientLight = new AmbientLight('#0059ff', 1);

    return ambientLight;
}
export { createAmbientLights };

function createSecondDirectionalLight() {
    const light = new DirectionalLight('#D41F09', 40);

    light.position.set(-70, -5, -15);
    
    return light;
}
export { createSecondDirectionalLight };