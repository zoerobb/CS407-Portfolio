import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCustomShape() {
    const geometry = new BoxGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({ color: "#55A7E2" });

    const customShape = new Mesh(geometry, material);

    customShape.rotation.set(0, 0, 0);
    
    return customShape;
}

export { createCustomShape };