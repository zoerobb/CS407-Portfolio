import { Object3D, Vector3 } from 'three';
import { loadSage } from '../sage/sage';

class WaterGunControls {
    constructor(waterGun, bulletModel) {
        if(!waterGun) {
            throw new Error('WaterGunControls: waterGun is required');
        }
        if(!(bulletModel instanceof Object3D)) {
            throw new Error('WaterGunControls: bulletModel must be an instance of THREE.Object3D');
        }
        this.waterGun = waterGun;
        this.keys = {
            e: false,
            ArrowUp: false,
            ArrowDown: false
        };
        this.bulletModel = bulletModel;
        this.maxDistance = 10;
        this.bullets = [];
        this.currentUpRotation = 0;
        this.currentDownRotation = 0;

        window.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key in this.keys) {
                event.preventDefault();
                this.keys[key] = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            const key = event.key;
            if (key in this.keys) {
                event.preventDefault();
                this.keys[key] = false;
            }
        });
    }

    moveGun() {
        if (this.keys.ArrowUp) {
            this.waterGun.rotation.x -= 0.05;
        }
        if (this.keys.ArrowDown) {
            this.waterGun.rotation.x += 0.05;
        }
    }

    shoot() {
        if (this.keys.e) {
            const bullet = this.bulletModel.clone();
            bullet.scale.set(0.2, 0.2, 0.2);
            bullet.position.set(-0.08, 0.05, 0.4);

            bullet.direction = new Vector3(1, 0, 0);
            bullet.direction.applyQuaternion(this.waterGun.quaternion);

            this.waterGun.parent.add(bullet);

            this.bullets.push({
                instance: bullet,
                initialPosition: bullet.position.clone()
            });

            this.keys.e = false;
        }
    }

    update() {
        const bulletsToRemove = [];
        const speed = 0.04;
    
        this.bullets = this.bullets.filter(bulletData => {
            const { instance, initialPosition } = bulletData;
    
            instance.position.add(instance.direction.clone().multiplyScalar(speed));
    
            if (instance.position.distanceTo(initialPosition) > this.maxDistance) {
                bulletsToRemove.push(instance);
                return false;
            }
    
            return true;
        });
    
        bulletsToRemove.forEach(bullet => {
            bullet.parent.remove(bullet);
        });
    }
}

export { WaterGunControls };