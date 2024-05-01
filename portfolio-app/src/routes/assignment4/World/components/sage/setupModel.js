function setupModel(data) {
    const model = data.scene.children[0];

    model.scale.set(4, 4, 4); 
    model.position.set(0, 0, 0);

    return model;
}

export { setupModel };