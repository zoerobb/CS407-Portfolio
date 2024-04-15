import { DodecahedronGeometry, Mesh, MeshStandardMaterial } from 'three';

function createDodecahedron() {
    const geometry = new DodecahedronGeometry(0.5);

    const material = new MeshStandardMaterial({ color: "#B76586", emissive: "#46FFED", emissiveIntensity: .5});
    material.metalness = 1.4;

    const dodecahedron = new Mesh(geometry, material);

    dodecahedron.rotation.set(-1, -0.1, 0.8);
    dodecahedron.position.set(-.5, .5, 2);
    
    return dodecahedron;
}

export { createDodecahedron };