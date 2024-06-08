import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
    const geometry = new BoxGeometry(1.5, 0.4, 1.5);

    const material = new MeshStandardMaterial({ color: "#30D3FF" });

    const cube = new Mesh(geometry, material);

    cube.rotation.set(0, 0, 0);
    
    return cube;
}

export { createCube };