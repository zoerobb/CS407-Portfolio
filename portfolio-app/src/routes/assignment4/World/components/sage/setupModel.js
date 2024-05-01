function setupModel(data) {
    const model = data.scene.children[0];

    model.scale.set(4, 4, 4); 
    model.position.set(0, -1.8, 0);
    model.rotation.y = -.35;

    return model;
}

export { setupModel };