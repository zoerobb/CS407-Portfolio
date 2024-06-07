import { PlaneGeometry, Mesh, MeshStandardMaterial, GridHelper, DoubleSide } from 'three';

function createFloor() {
    const geometry = new PlaneGeometry(100, 100);

    const material = new MeshStandardMaterial({ color: 0x808080, side: DoubleSide });

    const floor = new Mesh(geometry, material);

    floor.rotation.x = Math.PI / 2;
    floor.position.y = -0.5;

    const grid = new GridHelper(100, 100);

    return { floor, grid };
}

export { createFloor };