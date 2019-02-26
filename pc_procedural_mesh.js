mesh_from_buffers = function(indices, positions, uvs) {
	var normals = pc.calculateNormals(positions, indices);
	var options = {
		normals: normals,
		uvs: uvs,
		uvs1: uvs,
		indices: indices
	};
	options.tangents = pc.calculateTangents(positions, normals, uvs, indices);
	var mesh = pc.createMesh(app.graphicsDevice, positions, options);
	return mesh;
}

/*
pc.calculateTangents(maila.vertices, maila.normals, maila.uvs, maila.triangles)
calculated tangents differ alot from exported ones, i dont know which are "better" yet
*/

mesh_from_buffers_full = function(indices, positions, uvs, normals, tangents) {
	if (normals == undefined)
		normals = pc.calculateNormals(positions, indices)
	if (tangents == undefined)
		tangents = pc.calculateTangents(positions, normals, uvs, indices)
	var options = {
		normals: normals,
		uvs: uvs,
		uvs1: uvs,
		indices: indices,
		tangents: tangents
	};
	var mesh = pc.createMesh(app.graphicsDevice, positions, options);
	return mesh;
}

entity_from_mesh_layerid_material = function(mesh, layer_id, material) {
	var entity = new pc.Entity();
	entity.addComponent("model", {
		layers: [layer_id]
	})
	var model = model_from_mesh(mesh, material)
	entity.model.model = model;
	return entity;
}

model_from_mesh = function(mesh, material) {
	var model = new pc.Model()
	var node = new pc.GraphNode();
	model.graph = node
	model.meshInstances = [new pc.MeshInstance(node, mesh, material)];
	model.material = material;
	return model;
}
