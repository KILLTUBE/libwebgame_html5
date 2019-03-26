KungMesh = function(indices, positions, uvs) {
	this.indices = indices;
	this.positions = positions;
	this.uvs = uvs;
}

KungMesh.prototype.createMesh = function() {
	// just easier to read
	const indices  = this.indices;
	const positions = this.positions;
	const uvs      = this.uvs;
	// actual code
	var normals = pc.calculateNormals(positions, indices);
	var options = {
		normals: normals,
		uvs: uvs,
		uvs1: uvs,
		indices: indices
	};
	if (pc.precalculatedTangents) {
		options.tangents = pc.calculateTangents(positions, normals, uvs, indices);
	}
	var mesh = pc.createMesh(app.graphicsDevice, positions, options);
	return mesh;
}

// kungmesh_crowbar = await KungMesh.fetch("crowbar")
KungMesh.fetch = async function(name) {
	//if (cache_kungmesh[name]) {
	//	console.log(name, "is cached")
	//	return cache_kungmesh[name]
	//}
	var [indices, positions, uvs] = await Promise.all( [
		  Int32Array.fetch(url + "libwebgame/kungmodels/" + name + "/triangles_0.vec3"),
		Float32Array.fetch(url + "libwebgame/kungmodels/" + name + "/vertices_0/0.vec3"),
		Float32Array.fetch(url + "libwebgame/kungmodels/" + name + "/uvs_0.vec2")
	])
	var kungmesh = new KungMesh(indices, positions, uvs);
	return kungmesh;
}

add = function(entity) {
	app.root.addChild(entity)
	entity.setLocalPosition( player.pos() )
	return entity;
}

// crowbar = add( kungmesh_spawn("crowbar", worldLayer.id) )
kungmesh_spawn = function(name, layer_id, cull, blend) {
	var entity = new pc.Entity(name) 
	entity.addComponent("model", {
		//layers: [worldLayer.id/*, weaponlayer.id*/] // put this entity on weaponlayer so it isnt loosing depth test against world models
		layers: [layer_id]
	})
	KungMesh.fetch(name).then(function(kungmesh) {
		var material = new pc.StandardMaterial();
		material.cull = cull;
		material.name = name;
		var model = model_from_mesh( kungmesh.createMesh(), material );
		entity.model.model = model;
		
		// set the supposed material once the mesh is loaded
		pc.Texture.fetch(url + "libwebgame/kungmodels/" + name + "/triangles_0.jpg").then(function(texture){
			material.diffuseMap = texture;
			material.update();
			if (typeof blend !== "undefined")
				entity.model.meshInstances[0].material.blendType = blend;
		})
	})
	return entity;
}