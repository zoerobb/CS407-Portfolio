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
        this.controls.maxDistance = 20;

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

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.jump();
            }
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
    
        // Calculate the offset from the sageHead's position
        const offset = new Vector3();
        offset.set(0, 8, 15); // Offset values can be adjusted as needed
    
        offset.applyQuaternion(camera.quaternion);
    
    
        const distance = this.sageHead.position.distanceTo(camera.position);

        if (distance > this.controls.maxDistance) {
            const direction = new THREE.Vector3().subVectors(camera.position, this.sageHead.position).normalize();
            camera.position.copy(this.sageHead.position).add(direction.multiplyScalar(this.controls.maxDistance));
        }

        this.controls.target.copy(this.sageHead.position);
        this.controls.update();

        if (scene && camera) {
            renderer.render(scene, camera);
        }
    }

    jump() {
        if (this.isJumping) {
            return;
        }
    
        this.isJumping = true;
    
        // Animate the jump
        const jumpHeight = 7;
        const jumpDuration = 300;
        const initialPosition = this.sageHead.position.y;
    
        let startTime = null;
    
        const animateJump = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }
    
            const elapsedTime = timestamp - startTime;
            const progress = elapsedTime / jumpDuration;
    
            if (progress < 0.5) {
                this.sageHead.position.y = initialPosition + progress * 2 * jumpHeight;
                this.sageBody.position.y = initialPosition + progress * 2 * jumpHeight;
                this.sageTail.position.y = initialPosition + progress * 2 * jumpHeight;
            } else {
                this.sageHead.position.y = initialPosition + (1 - progress) * 2 * jumpHeight;
                this.sageBody.position.y = initialPosition + (1 - progress) * 2 * jumpHeight;
                this.sageTail.position.y = initialPosition + (1 - progress) * 2 * jumpHeight;
            }
    
            if (progress < 1) {
                requestAnimationFrame(animateJump);
            } else {
                this.sageHead.position.y = initialPosition;
                this.sageBody.position.y = initialPosition;
                this.sageTail.position.y = initialPosition;
                this.isJumping = false;
            }
        };
    
        requestAnimationFrame(animateJump);
    }

}
    
export { World };