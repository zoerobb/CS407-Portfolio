import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';

function createFloor() {
  const geometry = new PlaneGeometry(100, 100, 10, 10);

  const material = new MeshBasicMaterial({ color: 0x000020 });

  const floor = new Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;

  return floor;
}

export { createFloor };