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
	//var maila = new pc.Entity("maila#" + mailas.length);
	//// just add maila when its loaded, so this function isnt waiting on anyhting
	//spawn_maila().then(function(model) {
	//	this.addChild(model);
	//	
	//	model.setLocalEulerAngles(90, 0, 90);
	//	model.setLocalPosition(0,0,-0.25);
	//	model.setLocalScale(0.4,0.4,0.4);
	//}.bind(maila));
	
	

	var maila = clone_gltf(original_maila);
	mailas.push( maila );

	var maila_parent = new pc.Entity("maila#" + mailas.length);
	
	maila_parent.addChild(maila);
	maila.setLocalEulerAngles(90, 0, 90);
	maila.setLocalPosition(0,0,-0.25);
	maila.setLocalScale(0.4,0.4,0.4);

	return maila_parent;
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
