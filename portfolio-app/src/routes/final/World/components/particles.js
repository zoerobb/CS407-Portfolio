import { TetrahedronGeometry } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { Group } from "three";

function createParticles() {
    const particleCount = 2000;
    const colors = [0x25C7FF, 0x2820FB, 0x9B20FB, 0xFB20ED, 0xFB2080, 0x20F6FB];
    const geometry = new TetrahedronGeometry(0.05);

    const particles = new Group();
    for(let i = 0; i < particleCount; i++) {
        const material = new MeshBasicMaterial({ color: colors[i % colors.length] });
        const particle = new Mesh(geometry, material);

        do {
            particle.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
        } while (Math.abs(particle.position.x) < 2 && Math.abs(particle.position.y) < 2 && Math.abs(particle.position.z) < 2);

        particle.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        const scale = Math.random();
        particle.scale.set(scale, scale, scale);

        particle.velocity = {
            x: (Math.random() - 0.5) / 550,
            y: (Math.random() - 0.5) / 550,
            z: (Math.random() - 0.5) / 550
        };

        particles.add(particle);
    }
    return particles;
}

function animateParticles(particles) {
    particles.children.forEach(particle => {
        particle.position.x += particle.velocity.x;
        particle.position.y += particle.velocity.y;
        particle.position.z += particle.velocity.z;

        if (Math.abs(particle.position.x) > 40) particle.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 40) particle.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 40) particle.velocity.z *= -1;
    });
} 

export { createParticles, animateParticles };