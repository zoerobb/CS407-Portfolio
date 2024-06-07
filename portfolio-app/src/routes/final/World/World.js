import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createControls } from './systems/controls.js';
import { loadDragon } from './components/dragon/dragon.js';
import { CharacterControls } from './components/dragon/charactercontrols.js';
import { Vector3 } from 'three';
import { createLights } from './components/lights.js';
import { createFloor } from './components/floor.js';
import { Clock } from 'three';

let camera;
let renderer;
let scene;


class World {
    constructor(container) {
        this.dragon = null;
        this.animations = null;
        this.characterControls = null;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        camera.position.set(20, 10, 22);
        this.clock = new Clock();
        this.controls = createControls(camera, renderer.domElement);
        this.lights = createLights();
        const { floor, grid } = createFloor();

        scene.add(this.lights, floor, grid);

        const resizer = new Resizer(container, camera, renderer);
        this.characterControls = null;
    }

    async init() {
        const { dragon, animations } = await loadDragon();
        this.dragon = dragon;
        this.animations = animations;
        scene.add(dragon);

        this.characterControls = new CharacterControls(this.dragon, this.animations);
        this.characterControls.idle();
    }
    
    render() {
        renderer.render(scene, camera);
    }

    update() {
        const delta = this.clock.getDelta();
        if (this.characterControls) {
            this.characterControls.update(delta);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.controls.update();
        this.render();
    }
}
    
export { World };