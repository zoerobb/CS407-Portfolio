import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createAmbientLight } from './components/lights.js';
import { createDirectionalLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { AxesHelper } from 'three';
import { createSphere } from './components/sphere.js';
import { ShaderMaterial } from 'three';
import { createControls } from './systems/controls.js';

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
        this.shaderSphere = createSphere();
        this.normalSphere = createSphere();
        this.shaderSphere.position.set(-3, 0, 0);
        this.normalSphere.position.set(3, 0, 0);
        this.controls = createControls(camera, renderer.domElement);

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper, this.ambientLight, this.directionalLight, this.shaderSphere, this.normalSphere);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.shaderSphere.material.uniforms.time.value = performance.now() / 1000;
        this.normalSphere.position.y = Math.sin(performance.now() / 300) * 2;
        renderer.render(scene, camera);

    }
    toggleWireframe() {
        isWireframe = !isWireframe;
        this.shaderSphere.material.wireframe = isWireframe;
        this.normalSphere.material.wireframe = isWireframe;
        renderer.render(scene, camera);
    }

    compileShaders(vertexShader, fragmentShader) {
        if (!vertexShader || !fragmentShader)
            {
                console.log('No shaders');
                return;
            }
        try {
            this.shaderSphere.material = new ShaderMaterial({
                uniforms: {
                    time: { value: 0.0 }
                },
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