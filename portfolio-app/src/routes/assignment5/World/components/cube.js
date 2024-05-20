import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
    const geometry = new BoxGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({ color: "#55A7E2" });

    const cube = new Mesh(geometry, material);

    cube.rotation.set(0, 0, 0);
    
    return cube;
}

export { createCube };