import { BufferGeometry, Mesh, MeshPhongMaterial, BufferAttribute, Color } from 'three';

function createCustomShape() {
    const geometry = new BufferGeometry();

        // (x, y, z)
        const vertices = new Float32Array([
            // Layer 1 (front)
            0, 0, 0, // v0
            0, 5, 0, // v1
            -2, 2, -2, // v2
            -4, 0, 0, // v3
            -2, -2, -3, // v4
            0, -5, 0, // v5
            2, -2, -3, // v6
            4, 0, 0, // v7
            2, 2, -2, // v8
            // Layer 2 (back)
            0, 0, -10, // v9
            0, 5, 0, // v10
            -2, 2, -2, // v11
            -4, 0, 0, // v12
            -2, -2, -3, // v13
            0, -5, -0, // v14
            2, -2, -3, // v15
            4, 0, 0, // v16
            2, 2, -2, // v17
        ]);

        const indices = new Uint16Array([
            // Front
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7,
            0, 7, 8,
            0, 8, 1,
            // Back - reversed order
            9, 17, 16,
            9, 16, 15,
            9, 15, 14,
            9, 14, 13,
            9, 13, 12,
            9, 12, 11,
            9, 11, 10,
            9, 10, 17,
            // Sides
            1, 10, 11,
            11, 2, 1,
            2, 11, 12,
            12, 3, 2,
            3, 12, 13,
            13, 4, 3,
            4, 13, 14,
            14, 5, 4,
            5, 14, 15,
            15, 6, 5,
            6, 15, 16,
            16, 7, 6,
            7, 16, 17,
            17, 8, 7,
            8, 17, 10,
            10, 1, 8,
        ]);
    
        const colors = new Float32Array([
            // Repeat the same colors for the second layer
            ...new Color('magenta').toArray(), // v0
            ...new Color('yellow').toArray(),  // v1
            ...new Color('cyan').toArray(),    // v2
            ...new Color('palegreen').toArray(),   // v3
            ...new Color('lawngreen').toArray(), // v4
            ...new Color('magenta').toArray(), // v5
            ...new Color('yellow').toArray(),  // v6
            ...new Color('cyan').toArray(),    // v7
            ...new Color('palegreen').toArray(),   // v8
            ...new Color('yellow').toArray(), // v9
            ...new Color('dodgerblue').toArray(),  // v10
            ...new Color('blue').toArray(),    // v11
            ...new Color('orange').toArray(),   // v12
            ...new Color('chartreuse').toArray(), // v13
            ...new Color('lightcoral').toArray(), // v14
            ...new Color('deeppink').toArray(),  // v15
            ...new Color('turquoise').toArray(),    // v16
            ...new Color('darkviolet').toArray()   // v17
        ]);

    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    geometry.setIndex(new BufferAttribute(indices, 1));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    const material = new MeshPhongMaterial({ vertexColors: true });

    const customShape = new Mesh(geometry, material);

    customShape.rotation.x = (Math.PI / 2);

    return customShape;
}

export { createCustomShape };