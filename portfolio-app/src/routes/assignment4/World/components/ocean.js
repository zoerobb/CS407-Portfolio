import { PlaneGeometry, TextureLoader, RepeatWrapping, Vector3 } from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

function createOcean(scene) {
    const waterGeometry = new PlaneGeometry(10000, 10000);
    const waterTexture = 'https://threejs.org/examples/textures/waternormals.jpg';

    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load(waterTexture, texture => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
        }),
        sunDirection: new Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x0072ff,
        distortionScale: 4,
        fog: scene.fog !== undefined
    });

    water.rotation.x = - Math.PI / 2;
    water.position.y = -1;

    return water;
}

export { createOcean };