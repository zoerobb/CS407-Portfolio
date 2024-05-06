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
            E: false
        };
        this.bulletModel = bulletModel;
        this.maxDistance = 10;
        this.bullets = [];

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
    }

    shoot() {
        if (this.keys.E) {
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

            this.keys.E = false;
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