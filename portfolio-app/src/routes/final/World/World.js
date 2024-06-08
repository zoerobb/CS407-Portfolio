import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createControls } from './systems/controls.js';
import { createAmbientLight, createDirectionalLight } from './components/lights.js';
import { createParticles, animateParticles } from './components/particles.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createCube } from './components/cube.js';
import { CubeControls } from './components/cubecontrols.js';

let camera;
let renderer;
let scene;


class World {
    constructor(container, canvasWidth, canvasHeight) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        camera.position.set(4, 4, 5);
        this.controls = createControls(camera, renderer.domElement);
        this.ambientLight = createAmbientLight();
        this.directionalLight = createDirectionalLight();
        this.particles = createParticles(1000);
        this.cube = createCube();
        this.cubeControls = new CubeControls(this.cube);

        scene.add(this.ambientLight, this.directionalLight, this.particles, this.cube);

        this.composer = new EffectComposer(renderer);
        this.composer.setPixelRatio(window.devicePixelRatio);
        this.composer.setSize(canvasWidth, canvasHeight);
        this.renderPass = new RenderPass(scene, camera);
        this.composer.addPass(this.renderPass);

        this.bloomPass = new UnrealBloomPass();
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 0.8;
        this.bloomPass.radius = 0.8;
        this.composer.addPass(this.bloomPass);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
    }
    
    render() {
        this.composer.render();
    }

    update() {
        this.cubeControls.stop(scene, camera);
        this.cubeControls.reset(scene, camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        animateParticles(this.particles);
        this.update();
        this.controls.update();
        this.render();
    }
}
    
export { World };