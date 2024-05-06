import { createCamera } from './components/camera.js';
import { createAmbientLights, createDirectionalLight, createMoonLight } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadSage } from './components/sage/sage.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createFloor } from './components/floor.js';
import { Group, Vector3 } from 'three';
import { CharacterControls } from './components/sage/charactercontrols.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createOcean } from './components/ocean.js';
import { createMoon } from './components/moon.js';
import { loadWaterGun } from './components/watergun/watergun.js';
import { WaterGunControls } from './components/watergun/waterguncontrols.js';

let camera;
let renderer;
let scene;
let waterGunStatus = false;

class World {
    constructor(container) {
        this.sageHead = null;
        this.sageBody = null;
        this.sageTail = null;
        this.sage = null;
        this.waterGun = null;
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene(renderer, camera);
        container.append(renderer.domElement);

        this.directionalLight = createDirectionalLight();
        this.ambientLight = createAmbientLights();
        this.floor = createFloor();
        this.ocean = createOcean(scene);
        this.moon = createMoon();
        this.moonLight = createMoonLight();

        scene.add(this.directionalLight, this.ambientLight, this.floor, this.ocean, this.moon, this.moonLight);

        const resizer = new Resizer(container, camera, renderer);
        this.characterControls = null;
        this.waterGunControls = null;
        this.controls = new OrbitControls(camera, renderer.domElement);
    }

    async init() {
        const { sage } = await loadSage();
        if (!sage) {
            throw new Error('Sage is undefined');
        }

        const { waterGun } = await loadWaterGun();
        this.waterGun = waterGun;
        const sageBullet = sage.clone();
        this.waterGunControls = new WaterGunControls(waterGun, sageBullet);
        this.sage = sage;
        this.sage.add(waterGun);
        scene.add(sage);
        const AXIS_Y = new Vector3(0, 1, 0);
        this.characterControls = new CharacterControls(sage, camera, AXIS_Y);
        this.controls.target = this.characterControls.dummyCamera.position;

        
    }
    
    render() {
        renderer.render(scene, camera);
    }

    update() {
        if (this.characterControls) {
            this.characterControls.move();
            this.controls.target.copy(this.sage.position);
    
            if (this.controls.target.y < 0) {
                this.controls.target.y = 0;
            }
        }
        if (this.waterGunControls && waterGunStatus) {
            this.waterGunControls.shoot();
            this.waterGunControls.moveGun();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.waterGunControls.update();
        this.controls.update();
        renderer.render(scene, camera);
    }

    GiveSageWaterGun(hasWaterGun) {
        if (hasWaterGun) {
            this.sage.add(this.waterGun);
            waterGunStatus = true;
            return false;
        } else {
            this.sage.remove(this.waterGun);
            waterGunStatus = false;
            return true;
        }
    }
}
    
export { World };