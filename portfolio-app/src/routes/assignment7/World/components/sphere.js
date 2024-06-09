import { SphereGeometry, Mesh, MeshStandardMaterial } from 'three';

function createSphere() {
    const geometry = new SphereGeometry(2, 32, 32);

    const material = new MeshStandardMaterial({ color: "#55A7E2" });

    const sphere = new Mesh(geometry, material);

    sphere.rotation.set(0, 0, 0);
    
    return sphere;
}

export { createSphere };