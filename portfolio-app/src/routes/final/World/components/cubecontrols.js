import { BoxGeometry, Mesh, MeshStandardMaterial, Color, Vector3} from 'three';

class CubeControls {
    constructor(cube) {
        let gameWon = false;
        let gameOver = false;
        let gameStarted = false;
        this.originalCube = cube;
        this.cubes = [cube];
        this.color = new Color("#30D3FF");
        this.cubehsl = this.color.getHSL({ h: 0, s: 0, l: 0 })
        this.hue = this.cubehsl.h;
        this.direction = 1;
        this.speed = 0.05;
        this.moveAmount = 2;

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
        if(this.keys.SPACE && this.cubes.length < 15) {
            if(this.gameStarted == undefined) {
                this.gameStarted = true;
            }
            const lastCube = this.cubes[this.cubes.length - 1];

            if(this.cubes.length > 1) {
                const beforeCube = this.cubes[this.cubes.length - 2];
                const beforeCubePos = new Vector3();
                beforeCube.getWorldPosition(beforeCubePos);
                const lastCubePos = new Vector3();
                lastCube.getWorldPosition(lastCubePos);
    
                const cubeSize = beforeCube.geometry.parameters.width;
    
                if (Math.abs(lastCubePos.x - beforeCubePos.x) > cubeSize || Math.abs(lastCubePos.z - beforeCubePos.z) > cubeSize) {
                    this.gameOver = true;
                }
            }

            if (this.gameOver) {
                return;
            }

            const newCube = this.createCubeAbove(lastCube);
            this.cubes.push(newCube);
            if (this.cubes.length === 15) {
                this.gameWon = true;
                return;
            }
            scene.add(newCube);
            this.keys.SPACE = false;
            camera.position.y += 1;
        }
    }

    reset(scene, camera) {
        if (this.keys.R && this.cubes.length > 1){
            for (let i = 1; i < this.cubes.length; i++) {
                scene.remove(this.cubes[i]);
            }
            this.cubes = [this.originalCube];
            scene.add(this.originalCube);
            this.hue = this.cubehsl.h;
            this.keys.R = false;
            camera.position.set(0, 0, 10);
            this.gameWon = false;
            this.gameOver = false;
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

    update(scene, camera) {
        this.stop(scene, camera);
        this.reset(scene, camera);
        if (this.cubes.length > 1) {
            const cube = this.cubes[this.cubes.length - 1];

            cube.position.x += this.direction * this.speed;

            if (Math.abs(cube.position.x) > this.moveAmount) {
                this.direction *= -1;
            }
        }
    }
}

export { CubeControls };