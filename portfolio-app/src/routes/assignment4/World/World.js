import { createCamera } from './components/camera.js';
import { createAmbientLights, createDirectionalLight } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadSageBody, loadSageHead, loadSageTail} from './components/sage/sage.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createFloor } from './components/floor.js';
import { Group, Vector3 } from 'three';


let moveSpeed = 1;
let camera;
let renderer;
let scene;
let controls;

class World {
    constructor(container) {
        this.sageHead = null;
        this.sageBody = null;
        this.sageTail = null;
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene(renderer, camera);
        container.append(renderer.domElement);
        

        this.controls = new OrbitControls( camera, renderer.domElement );

        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set(11, 4.5, 4 );
        this.controls.update();

        this.directionalLight = createDirectionalLight();
        this.ambientLight = createAmbientLights();
        this.floor = createFloor();

        scene.add(this.directionalLight, this.ambientLight, this.floor);

        const resizer = new Resizer(container, camera, renderer);

        window.addEventListener('keydown', (event) => {
            let moveDirection = new Vector3();
        
            switch (event.key) {
                case 'w':
                    moveDirection.z = -moveSpeed;
                    break;
                case 'a':
                    moveDirection.x = -moveSpeed;
                    break;
                case 's':
                    moveDirection.z = moveSpeed;
                    break;
                case 'd':
                    moveDirection.x = moveSpeed;
                    break;
            }
        
            this.sageHead.position.add(moveDirection);
            this.sageBody.position.add(moveDirection);
            this.sageTail.position.add(moveDirection);

            let lookAtPosition = this.sageHead.position.clone().add(moveDirection);
            this.sageHead.lookAt(lookAtPosition);
            this.sageBody.lookAt(lookAtPosition);
            this.sageTail.lookAt(lookAtPosition);
        });
    }

    async init() {
        const { sageHead } = await loadSageHead();
        const { sageBody } = await loadSageBody();
        const { sageTail } = await loadSageTail();
        this.sageHead = sageHead;
        this.sageBody = sageBody;
        this.sageTail = sageTail;
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