import { Object3D, Vector3 } from 'three';

class CharacterControls {
    constructor(sage, camera, AXIS_Y, moveSpeed = 1, jumpHeight = 7, jumpDuration = 300) {
        if(!sage) {
            throw new Error('CharacterControls: sage is required');
        }
        this.sage = sage;
        this.camera = camera;
        this.AXIS_Y = AXIS_Y;
        this.moveSpeed = moveSpeed;
        this.sageSpeed = 0;
        this.sageDir = new Vector3(0, 0, -1);
        this.keys = {
            W: false,
            A: false,
            S: false,
            D: false,
            SPACE: false
        };
        this.jumpData = {
            speed: .02, 
            height: 39,
            isJumping: false,
            ySpeed: 0
        };

        document.addEventListener('keydown', (event) => this.onKeyDown(event));

        window.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (key in this.keys) {
                this.keys[key] = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            const key = event.key.toUpperCase();
            if (key in this.keys) {
                this.keys[key] = false;
            }
        });

        this.dummyCamera = new Object3D();
        this.dummyCamera.position.set(0, 5, -10);
        sage.add(this.dummyCamera);
    }

    onKeyDown(event) {
        if (event.code === 'Space') {
            this.keys.SPACE = true;
        }
    }

    move() {
        if (this.keys.W || this.keys.A || this.keys.S || this.keys.D) {
            this.sageSpeed = 1;
            this.sageDir.subVectors(this.sage.position, this.camera.position).y = 0;
    
            if (this.keys.S) this.sageDir.applyAxisAngle(this.AXIS_Y, Math.PI);
            else if (this.keys.A) this.sageDir.applyAxisAngle(this.AXIS_Y, 1.4);
            else if (this.keys.D) this.sageDir.applyAxisAngle(this.AXIS_Y, -1.4);
    
            this.sageDir.normalize();
        } 
        else if (this.keys.SPACE) {
            this.jump();
        }
        else {
            this.sageSpeed *= 0.978;
        }
    
        this.sage.position.addScaledVector(this.sageDir, this.sageSpeed * 0.03);
        this.sage.rotation.y = Math.atan2(this.sageDir.x, this.sageDir.z) + Math.PI;

        let lookAtPosition = this.sage.position.clone().add(this.sageDir);
        this.sage.lookAt(lookAtPosition);

        this.camera.lookAt(this.dummyCamera.getWorldPosition(new Vector3()));
    }

    jump() {
        if (!this.jumpData.isJumping) {
            this.jumpData.isJumping = true;
            this.jumpData.ySpeed = this.jumpData.speed;
        }

        if (this.jumpData.isJumping) {
            this.sage.position.y += this.jumpData.ySpeed;
            this.jumpData.ySpeed -= this.jumpData.speed / this.jumpData.height;

            if (this.sage.position.y <= 0) {
                this.sage.position.y = 0;
                this.jumpData.isJumping = false;
                this.jumpData.ySpeed = 0;
                this.keys.SPACE = false;
            }
        }
    }
}

export { CharacterControls };