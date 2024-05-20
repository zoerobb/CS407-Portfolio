import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createCustomShape } from './components/customShape.js';
import { createAmbientLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createControls } from './systems/controls.js';
import { AxesHelper } from 'three';

let camera;
let renderer;
let scene;
let isAnimating = false;
let isWireframe = false;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        this.controls = createControls(camera, renderer.domElement);

        this.customShape = createCustomShape();
        this.ambientLight = createAmbientLight();

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);

        scene.add(this.customShape, this.ambientLight);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (isAnimating) {
            this.customShape.rotation.y += 0.002;
        }
        this.controls.update();
        renderer.render(scene, camera);
    }

    toggleAnimation() {
        isAnimating = !isAnimating;
        if (isAnimating) {
            this.animate();
        }
    }

    toggleWireframe() {
        isWireframe = !isWireframe;
        this.customShape.material.wireframe = isWireframe;
        renderer.render(scene, camera);
    }

}
    
export { World };