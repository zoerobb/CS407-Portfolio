import { PlaneGeometry, MeshStandardMaterial, Mesh, TextureLoader } from 'three';

function createFloor() {
    const textureLoader = new TextureLoader();
    const rockTexture = textureLoader.load('rock.avif');

    const geometry = new PlaneGeometry(100, 100);

    const material = new MeshStandardMaterial({ map: rockTexture });

    const plane = new Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;

    return plane;
}

export { createFloor };