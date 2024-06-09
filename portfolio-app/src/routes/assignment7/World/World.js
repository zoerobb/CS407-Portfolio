import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createAmbientLight } from './components/lights.js';
import { createDirectionalLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { AxesHelper } from 'three';
import { createSphere } from './components/sphere.js';
import { ShaderMaterial } from 'three';

let camera;
let renderer;
let scene;
let isWireframe = false;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        camera.position.set(12, 10, 16);
        camera.lookAt(0, 0, 0);

        this.ambientLight = createAmbientLight();
        this.directionalLight = createDirectionalLight();
        this.sphere = createSphere();

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper, this.ambientLight, this.directionalLight, this.sphere);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        renderer.render(scene, camera);
    }
    toggleWireframe() {
        isWireframe = !isWireframe;
        this.sphere.material.wireframe = isWireframe;
        renderer.render(scene, camera);
    }

    compileShaders(vertexShader, fragmentShader) {
        if (!vertexShader || !fragmentShader)
            {
                console.log('No shaders');
                return;
            }
        try {
            this.sphere.material = new ShaderMaterial({
                vertexShader,
                fragmentShader,
            });
        }
        catch (e) {
            console.log(e);
        }
    }

}
    
export { World };