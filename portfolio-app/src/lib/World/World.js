import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createAmbientLights } from './components/lights.js';
import { createSecondDirectionalLight } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createTorusKnot } from './components/torusknot.js';
import { createDodecahedron } from './components/dodecahedron.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let camera;
let renderer;
let scene;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        this.torusknot = createTorusKnot();
        this.dodecahedron = createDodecahedron();
        this.light = createLights();
        this.ambientLight = createAmbientLights();
        this.secondDirectionalLight = createSecondDirectionalLight();

        scene.add(this.torusknot, this.dodecahedron, this.light, this.ambientLight, this.secondDirectionalLight);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    render() {
        renderer.render(scene, camera);
    }

    toggleLighting(isLighting) {
        if (isLighting) {
            scene.add(this.light);
            scene.add(this.ambientLight);
            scene.add(this.secondDirectionalLight);
        } else {
            scene.remove(this.light);
            scene.remove(this.ambientLight);
            scene.remove(this.secondDirectionalLight);
        }
    }

    animate() {
        if (!this.isAnimating) return;
        requestAnimationFrame(this.animate.bind(this));

        this.dodecahedron.rotation.y += 0.01;
        this.torusknot.rotation.y += 0.01;
        this.torusknot.rotation.x += 0.01;

        this.render();
    }
    
    startAnimation() {
        this.isAnimating = true;
        this.animate();
    }
    
    stopAnimation() {
        this.isAnimating = false;
    }

    setDirectionalLightColor(color) {
        this.light.color.set(color);
    }

    setAmbientLightColor(color) {
        this.ambientLight.color.set(color);
    }

    setSecondDirectionalLightColor(color) {
        this.secondDirectionalLight.color.set(color);
    }
}
    
export { World };