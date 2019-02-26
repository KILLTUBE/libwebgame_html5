MailaMesh = function() {
}

MailaMesh.prototype.loadFiles = async function() {
	var modelname = "maila";
	//var modelname = "cube";
	this.normals    = await Float32Array.fetch(url + modelname + "/normals.Vec3[]")
	this.tangents   = await Float32Array.fetch(url + modelname + "/tangents.Vec4[]")
	this.triangles0 = await   Int32Array.fetch(url + modelname + "/triangles_0.Triangle{Int32}[]")
	//this.triangles1 = await   Int32Array.fetch(url + modelname + "/triangles_1.Triangle{Int32}[]")
	this.uvs        = await Float32Array.fetch(url + modelname + "/uvs.Vec2[]")
	this.vertices   = await Float32Array.fetch(url + modelname + "/vertices.Vec3[]")
}

MailaMesh.prototype.getMesh = function() {
	var mesh = mesh_from_buffers_full(/*indices*/this.triangles0, /*positions*/this.vertices, this.uvs, this.normals, this.tangents)
	mesh.creator = this;
	return mesh;
}

// ma = entity_from_mesh(await getMailaMesh())
getMailaMesh = async function() {
	var tmp = new MailaMesh()
	await tmp.loadFiles()
	return tmp.getMesh()
}