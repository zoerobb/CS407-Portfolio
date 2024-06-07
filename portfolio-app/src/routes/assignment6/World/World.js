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

let camera;
let renderer;
let scene;

class World {
    constructor(container) {
        this.dragon = null;
        this.characterControls = null;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        this.controls = createControls(camera, renderer.domElement);
        this.lights = createLights();
        const { floor, grid } = createFloor();

        scene.add(this.lights, floor, grid);

        const resizer = new Resizer(container, camera, renderer);
        this.characterControls = null;
    }

    async init() {
        const { dragon } = await loadDragon();
        this.dragon = dragon;
        scene.add(dragon);
        const AXIS_Y = new Vector3(0, 1, 0);
        this.characterControls = new CharacterControls(dragon, camera, AXIS_Y);
    }
    
    render() {
        renderer.render(scene, camera);
    }

    update() {
        if (this.characterControls) {
            this.characterControls.move();
            if (this.dragon) {
                this.controls.target.copy(this.dragon.position);
            }
            if (this.controls.target.y < 0) {
                this.controls.target.y = 0;
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.controls.update();
        renderer.render(scene, camera);
    }
}
    
export { World };