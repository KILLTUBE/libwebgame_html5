/*
maila.model.model.meshInstances.map((v) => v.node.name)

0:"Maila_Hair"
1:"Maila_Hair"
2:"Maila_Hair"
3:"Maila_Eyelashes"
4:"Maila_Boots"
5:"Maila_Necklace"
6:"Maila_Top"
7:"Maila_Top"
8:"Maila_Top"
9:"Maila_Lasso"
10:"Maila_Ornament"
11:"Maila_Gable"
12:"Maila_Teeth"
13:"Maila_Armlet"
14:"Maila_EyeL"
15:"Maila_EyeR"
16:"Maila_Sword"
17:"Maila_BodyComplete"
18:"Maila_BodyComplete"
19:"Maila_Pants"
20:"Maila_Pants"
21:"Maila_BodyBoots"
22:"Maila_BodyBoots"
23:"Maila_BodyBootsGloves"
24:"Maila_BodyBootsGloves"
25:"Maila_BodyBootsGlovesPants"
26:"Maila_BodyBootsGlovesPants"
27:"Maila_BodyBootsPants"
28:"Maila_BodyBootsPants"
29:"Maila_Bra"
30:"Maila_Gloves"
*/

maila_new = function() {
	var maila = new pc.Entity("maila")
	var maila2 = new pc.Entity("maila2")
	//maila.setLocalPosition(player.pos())
	maila.addComponent("model")
	maila.model.model = maila_model.clone()
	//maila.model.material = material_maila_body
	

	maila.model.model.meshInstances.forEach((v)=>v.visible = false) // disable all meshInstances
	maila.model.model.meshInstances[1].material = red // hair
	maila.model.model.meshInstances[1].visible = true
	maila.model.model.meshInstances[1].material = red
	maila.model.model.meshInstances[17].visible = true // Maila_BodyComplete
	maila.model.model.meshInstances[17].material = material_maila_body	
	
	//maila.model.model.graph.setLocalScale(0.4,0.4,0.4)
	//maila.model.model.graph.setLocalPosition(0,-0.22,0)

	
/*
maila.children[0].setLocalPosition(0,0,0)
maila.children[0].setLocalEulerAngles(90, 0, 90)
maila.animation.currentTime = 2;
*/
	maila2.addChild(maila);
	//app.root.addChild(maila2);
	
	maila.children[0].setLocalEulerAngles(90, 0, 90)
	maila.children[0].setLocalPosition(0,0,-0.25)
	maila.children[0].setLocalScale(0.4,0.4,0.4)
	
	mailas.push( maila2 )
	
	
	return maila2;
}

maila_debug_skeleton = function() {
	app.on("update", function() {
		try {
			for (var maila of mailas)
				render_hierarchy_lines(maila.model.model.graph);
		} catch(ex) {
			console.log(ex);
		}	
	})
}

//postion = maila_model.graph.children[10]
//pelvis = postion.children[0].children[0]
//spine1 = pelvis.children[0].children[0]

maila_load_anim = async function(maila) {
	maila_animation = await pc.Animation.fetch(url + "pc_maila/Maila_Model_Animation.json")
	maila.addComponent("animation", {
		assets: [maila_animation.asset],
		speed: 1.0,
		activate: true,
		loop: false
	});
	maila.animation.currentTime = 2
	maila.animation.playing = false
}

create_material_maila_body = function() {
	var material = new pc.StandardMaterial()
	material.name = "maila_body"
	Promise.all([
		pc.Texture.fetch(url + "pc_maila/Maila_Body[Albedo]V5.jpg"),
		pc.Texture.fetch(url + "pc_maila/Maila_Body[Normal].jpg"),
		pc.Texture.fetch(url + "pc_maila/Maila_Body[Specular].jpg"),
		pc.Texture.fetch(url + "pc_maila/Maila_Body[AO].jpg")
	]).then(function(results) {
		var [albedo, normal, spec, ao] = results
		material.diffuseMap  = albedo
		material.normalMap   = normal
		material.specularMap = spec
		material.aoMap       = ao
		material.update()
	})
	return material
}

maila_init = async function() {
	
	material_maila_body = create_material_maila_body();
	maila_model = await pc.Model.fetch(url + "pc_maila/Maila_Model.json")
	maila = maila_new()//.children[0]
	//maila_load_anim()
	
	
}