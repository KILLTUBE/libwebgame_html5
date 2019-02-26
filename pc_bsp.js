postMessage = function() {} // not calling as WebWorker...

loadTextures = function() {
	for (var shader of shaders) {
		if (shader.indices.length == 0) {
			continue;
		}
		shader.pc_mat = shaderName_to_material(shader.shaderName);
		if (shader.node) {
			if (shader.pc_mat == undefined) {
				shader.node.enabled = false; // hide sky brush so we see the playcanvas sky
			} else {
				shader.node.model.meshInstances[0].material = shader.pc_mat;
			}
		}
	}
}	
	
load_map = async function(name) {
	var map = new pc.Entity(name);
	maps.addChild(map);
	
	var str = await String.fetch(url + "libwebgame/maps/" + name + ".bsp")

	binfile = new BinaryFile(str);
	q3 = q3bsp.parse(binfile, 5);

	for (var shader of shaders) {
		if (shader.indices.length == 0) {
			continue;
		}
		
		// using playcanvas to render sky
		if (shader.shaderName == "skybox")
			continue;
		
		bla = function() {
			var indices = shader.indices.reverse();
			var normals = pc.calculateNormals(shader.positions, indices);
			var options = {
				//normals: normals, // calculated
				normals: shader.normals, // original ones
				uvs: shader.uvs,
				//uvs1: uvs,
				indices: indices
			};
			if (pc.precalculatedTangents) {
				options.tangents = pc.calculateTangents(shader.positions, normals, shader.uvs, indices);
			}
			mesh = pc.createMesh(app.graphicsDevice, shader.positions, options)
			return mesh;
		}
		node = entity_from_mesh_layerid_material(bla(), worldLayer.id, red)
		map.addChild(node)
		shader.pc_model = node.model
		shader.node = node
		mats = [red, white]
		random_i = rand_int() % mats.length
		mat = mats[random_i];
		//node.model.material = shader.pc_mat;
		node.model.material = mat;
	}
	
	loadTextures()
}

setTextures = function() {
	for (var shader of shaders)
		if (shader.indices.length > 0 && typeof shader.pc_mat != "undefined")
			shader.pc_model.meshInstances[0].material = shader.pc_mat
}