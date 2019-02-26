// https://forum.playcanvas.com/t/mighty-morphing/5685/2

// morphcube = await create_morphcube()
// morphcube.model.model.morphInstances[0].setWeight(0, 0.1)
// morphcube.model.model.morphInstances[0].setWeight(0, -3)

create_morphcube = async function() {
	//morph_model = await pc.Model.fetch(url + "pc_morphcube/boxmorph.json")
	var model = await pc.Model.fetch(url + "pc_morphcube/box2sphereMorph.json")
	var ent = new pc.Entity("morphcube")
	ent.addComponent("model")
	ent.model.model = model.clone()
	ent.model.model.meshInstances[0].material = await create_material_rustediron2()
	ent.setLocalPosition(player.pos())
	ent.setLocalScale(100,100,100)
	app.root.addChild(ent)
	return ent
}

// material_rustediron2 = await create_material_rustediron2()
create_material_rustediron2 = async function() {
	var basecolor = await pc.Texture.fetch(url + "pc_rustediron2/basecolor-dxt.dds")
	var metallic  = await pc.Texture.fetch(url + "pc_rustediron2/metallic-dxt.dds" )
	var normal    = await pc.Texture.fetch(url + "pc_rustediron2/normal-dxt.dds"   )
	var roughness = await pc.Texture.fetch(url + "pc_rustediron2/roughness-dxt.dds")
	var material = new pc.StandardMaterial()
	material.name = "rustediron2"
	material.diffuseMap  = basecolor
	material.normalMap   = normal
	material.specularMap = metallic
	material.aoMap       = roughness
	material.update()
	return material
}