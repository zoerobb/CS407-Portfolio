import { Object3D, Vector3 } from 'three';

class CharacterControls {
    constructor(dragon, camera, AXIS_Y, moveSpeed = 1) {
        this.dragon = dragon;
        this.camera = camera;
        this.AXIS_Y = AXIS_Y;
        this.moveSpeed = moveSpeed;
        this.dragonSpeed = 0;
        this.dragonDir = new Vector3(0, 0, -1);
        this.keys = {
            W: false,
            A: false,
            S: false,
            D: false
        };
    }

    move() {
    }
}

export { CharacterControls };