import { SphereGeometry, MeshStandardMaterial , Mesh } from 'three';

function createMoon() {
    const geometry = new SphereGeometry(100, 32, 32);

    const material = new MeshStandardMaterial({ color: 0xff69b4, emissive: 0xff69b4, emissiveIntensity: 1.4 });

    const moon = new Mesh(geometry, material);

    moon.position.set(1000, 1000, -1000);

    return moon;
}

export { createMoon };