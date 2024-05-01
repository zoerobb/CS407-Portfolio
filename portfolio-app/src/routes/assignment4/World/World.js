import { createCamera } from './components/camera.js';
import { createAmbientLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadSageBody, loadSageHead, loadSageTail} from './components/sage/sage.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera;
let renderer;
let scene;
let controls;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        this.controls = new OrbitControls( camera, renderer.domElement );

        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set( 0, 0, 100 );
        this.controls.update();

        this.ambientLight = createAmbientLights();
        

        scene.add(this.ambientLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        const { sageHead } = await loadSageHead();
        const { sageBody } = await loadSageBody();
        const { sageTail } = await loadSageTail();
        scene.add(sageHead, sageBody, sageTail);

    }
    
    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        if (scene && camera) {
            renderer.render(scene, camera);
        }
    }

}
    
export { World };