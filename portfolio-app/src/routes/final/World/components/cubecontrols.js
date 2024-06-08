import { BoxGeometry, Mesh, MeshStandardMaterial, Color } from 'three';

class CubeControls {
    constructor(cube) {
        this.originalCube = cube;
        this.cubes = [cube];
        this.color = new Color("#30D3FF");
        this.cubehsl = this.color.getHSL({ h: 0, s: 0, l: 0 })
        this.hue = this.cubehsl.h;

        this.keys = {
            SPACE: false,
            R: false
        };
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (key in this.keys) {
                event.preventDefault();
                this.keys[key] = true;
            }
        });
    }

    onKeyDown(event) {
        if (event.code === 'Space') {
            this.keys.SPACE = true;
        }
        if (event.code === 'KeyR') {
            this.keys.R = true;
        }
    }

    stop(scene, camera) {
        if(this.keys.SPACE) {
            const lastCube = this.cubes[this.cubes.length - 1];
            const newCube = this.createCubeAbove(lastCube);
            this.cubes.push(newCube);
            scene.add(newCube);
            this.keys.SPACE = false;
        }
    }

    reset(scene, camera) {
        if (this.keys.R){
            for (let i = 1; i < this.cubes.length; i++) {
                scene.remove(this.cubes[i]);
            }
            this.cubes = [this.originalCube];
            scene.add(this.originalCube);
            this.hue = this.cubehsl.h;
            this.keys.R = false;
        }
    }

    createCubeAbove(cube) {
        const geometry = new BoxGeometry(1.5, 0.4, 1.5);
        const hsl = { h: this.hue, s: 1, l: 0.5 };
        const color = new Color();
        color.setHSL(hsl.h, hsl.s, hsl.l);
        const material = new MeshStandardMaterial({ color: color });
        const newCube = new Mesh(geometry, material);
        newCube.position.set(cube.position.x, cube.position.y + .4, cube.position.z);
    
        this.hue += 0.03;
        if (this.hue > 1) this.hue -= 1;
    
        return newCube;
    }
}

export { CubeControls };