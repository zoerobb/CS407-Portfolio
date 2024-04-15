import { TorusKnotGeometry, Mesh, MeshStandardMaterial } from 'three';

function createTorusKnot() {
    const geometry = new TorusKnotGeometry(3);

    const material = new MeshStandardMaterial({ color: "#55A7E2" });
    material.roughness = 0;
    material.metalness = 0;

    const torusknot = new Mesh(geometry, material);

    torusknot.rotation.set(3, 0.4, 0.5);
    torusknot.position.set(-.5, 0.3, -1);
    
    return torusknot;
}

export { createTorusKnot };