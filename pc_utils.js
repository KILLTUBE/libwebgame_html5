createMaterial = function(color) {
	var material = new pc.PhongMaterial();
	material.diffuse = color;
	// we need to call material.update when we change its properties
	material.update()
	return material;
}

// add( createBox(player.pos(), new pc.Vec3(1,1,1), red) )
createBox = function(position, size, material) {
	var entity = new pc.Entity();
	entity.addComponent("model", {
		type: "box"
	});
	entity.model.material = material;
	entity.setLocalPosition(position);
	entity.setLocalScale(size);
	return entity;
}
