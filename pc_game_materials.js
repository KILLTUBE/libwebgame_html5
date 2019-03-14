material_sandyground1 = function() {
	var material = new pc.StandardMaterial()
	material.name = "sandyground1"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/sandyground1/diffuse.jpg" ).then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/sandyground1/normal.jpg"  ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/sandyground1/height.jpg"  ).then(function(texture) { material.heightMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/sandyground1/ao.jpg"      ).then(function(texture) { material.aoMap      = texture; material.update() })
	return material;
}

material_limestonemarked2 = function() {
	var material = new pc.StandardMaterial()
	material.name       = "limestonemarked2"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/limestonemarked2/diffuse.jpg" ).then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/limestonemarked2/normal.jpg"  ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/limestonemarked2/height.jpg"  ).then(function(texture) { material.heightMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/limestonemarked2/ao.jpg"      ).then(function(texture) { material.aoMap      = texture; material.update() })
	return material;
}

material_pockedconcrete1 = function() {
	var material = new pc.StandardMaterial()
	material.name       = "pockedconcrete1"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/pockedconcrete1/diffuse.jpg" ).then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/pockedconcrete1/normal.jpg"  ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/pockedconcrete1/ao.jpg"      ).then(function(texture) { material.aoMap      = texture; material.update() })
	return material;
}

material_oldplywood = function() {
	var material = new pc.StandardMaterial()
	material.name       = "oldplywood"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/oldplywood/diffuse.png").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/oldplywood/normal.png" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/oldplywood/ao.png"     ).then(function(texture) { material.aoMap      = texture; material.update() })
	return material;
}

// metal = material_metal_rustcoated()
// shaders[0].node.model.meshInstances[0].material = metal
// metal.specular.set(1,1,1); metal.update()
// metal.bumpiness = 20; metal.update()
material_metal_rustcoated = function() {
	var material = new pc.StandardMaterial()
	material.name       = "metal_rustcoated"
	material.useMetalness = true;
	material.bumpiness  = 20;
	material.reflectivity = 0.4;
	material.refraction = 0.8;
	material.update();
	pc.Texture.fetch(url + "pbr/metal_rustcoated/diffuse.png").then(function(texture) { material.diffuseMap   = texture; material.update() })
	pc.Texture.fetch(url + "pbr/metal_rustcoated/normal.png" ).then(function(texture) { material.normalMap    = texture; material.update() })
	pc.Texture.fetch(url + "pbr/metal_rustcoated/metal.png"  ).then(function(texture) { material.metalnessMap = texture; material.update() })
	return material;
}

metalify = function(material) {
	material.useMetalness = true;
	material.bumpiness  = 20;
	material.reflectivity = 0.4;
	material.refraction = 0.8;
	material.update();
	//pc.Texture.fetch(url + "pbr/metal_rustcoated/diffuse.png").then(function(texture) { material.diffuseMap   = texture; material.update() })
	pc.Texture.fetch(url + "pbr/metal_rustcoated/normal.png" ).then(function(texture) { material.normalMap    = texture; material.update() })
	pc.Texture.fetch(url + "pbr/metal_rustcoated/metal.png"  ).then(function(texture) { material.metalnessMap = texture; material.update() })
}

material_water_clear = function() {
	var material = new pc.StandardMaterial();
	material.name = "water_clear";
	material.cull = pc.CULLFACE_NONE; // show water after diving in
	material.blendType = 5; // default is 3, make it transparent
	//material.blendType = 10; // looks epic with sky_helipad() and lights under water still work, but default skybox this sux
	//material.diffuse.set(-0.5, 0.5, 1.5);
	//material.diffuse.set(0.2, 0.2, 0.8); // too blue :S
	material.diffuse.set(0.1, 0.1, 0.1); // very transparent but kinda nice
	material.shininess = 80
	//material.specular.set(0.5,0.5,-1) // greenish
	material.specular.set(0.3,0.3,0.4) // a tad blue
	pc.Texture.fetch(url + "pbr/water/normal.png").then(function(texture) { material.normalMap = texture; material.update(); })
	return material;
}

material_window_1 = function() {
	var material = new pc.StandardMaterial();
	material.name = "window_1";
	//material.cull = pc.CULLFACE_NONE; // show water after diving in
	material.blendType = pc.BLEND_ADDITIVEALPHA; // == 6
	
	//material.blendType = 10; // looks epic with sky_helipad() and lights under water still work, but default skybox this sux
	//material.diffuse.set(-0.5, 0.5, 1.5);
	//material.diffuse.set(0.2, 0.2, 0.8); // too blue :S
	material.diffuse.set(0.1, 0.1, 0.1); // very transparent but kinda nice
	material.shininess = 200
	//material.specular.set(0.5,0.5,-1) // greenish
	material.specular.set(0.3,0.3,0.4) // a tad blue
	//pc.Texture.fetch(url + "/libwebgame/textures/window/1.jpg").then(function(texture) { material.diffuseMap = texture; material.update(); })
	return material;
}

material_concrete_ceiling2_dark = function() {
	var material = new pc.StandardMaterial()
	material.name       = "RoofingTiles04_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/RoofingTiles04_4k/diffuse.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/RoofingTiles04_4k/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/RoofingTiles04_4k/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}

material_freepbr_grass1 = function() {
	var material = new pc.StandardMaterial()
	material.name       = "freepbr_grass1"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse.png").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.png" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.png" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}


material_cc0textures_asphalt07_whitened = function() {
	var material = new pc.StandardMaterial()
	material.name       = "cc0textures_Asphalt07_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse_whitened.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	material.name += "_whitened";
	
	return material;
}

material_cc0textures_Asphalt07_4k = function() {
	var material = new pc.StandardMaterial()
	material.name       = "cc0textures_Asphalt07_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}

material_cc0textures_Asphalt14_4k = function() {
	var material = new pc.StandardMaterial()
	material.name       = "cc0textures_Asphalt14_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}

material_cc0textures_Plastic03_4k = function() {
	var material = new pc.StandardMaterial()
	material.name       = "cc0textures_Plastic03_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}

material_cc0textures_PavingStones29_4k = function() {
	var material = new pc.StandardMaterial()
	material.name       = "cc0textures_PavingStones29_4k"
	material.bumpiness  = 3;
	material.update();
	pc.Texture.fetch(url + "pbr/" + material.name + "/diffuse.jpg").then(function(texture) { material.diffuseMap = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/normal.jpg" ).then(function(texture) { material.normalMap  = texture; material.update() })
	pc.Texture.fetch(url + "pbr/" + material.name + "/height.jpg" ).then(function(texture) { material.heightMap  = texture; material.update() })
	return material;
}

//cubelight_32_blue.blend.png
//cubelight_32_red.blend.png
//cubelight_32_white.blend.png
//eq2_baselt03_blue.blend.png
//eq2_baselt03_blue.png
//eq2_baselt03b.blend.png
//eq2_baselt03b.png
//eq2_baselt03b_blue.blend.png
// eq2_bmtl_03_light.blend.png
// eq2_bmtl_03_light.png
// eq2_bmtl_08.png

shaderName_to_material = function(shaderName) {
	
	var material = new pc.StandardMaterial();
		
	var isTransparent = false;
	
	var shader_url = "";
	switch (shaderName) {
		case "textures/atcs/bulb_red_s":                            shader_url = url + "/tremulous_atcs/textures/atcs/bulb_red.png";              break;
		case "textures/atcs/cubelight_32_blue_s_10k":               shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_blue.png";     break;
		case "textures/atcs/cubelight_32_blue_s_15k":               shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_blue.png";     break;
		case "textures/atcs/cubelight_32_blue_s_20k":               shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_blue.png";     break;
		case "textures/atcs/cubelight_32_red_s_10k":                shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_red.png";      break;
		case "textures/atcs/cubelight_32_red_s_15k":                shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_red.png";      break;
		case "textures/atcs/cubelight_32_red_s_20k":                shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_red.png";      break;
		case "textures/atcs/cubelight_32_white_s_20k":              shader_url = url + "/tremulous_atcs/textures/atcs/cubelight_32_white.png";    break;
		case "textures/atcs/eq2_baselt03_blue_s_3000":              shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03b_blue.png";    break;
		case "textures/atcs/eq2_baselt03_blue_s_5000":              shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03b_blue.png";    break;
		case "textures/atcs/eq2_bigmet_01":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bigmet_01.png";         break;
		case "textures/atcs/eq2_bmtl":                              shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl.png";              break;
		case "textures/atcs/eq2_bmtl_01":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_01.png";           break;
		case "textures/atcs/eq2_bmtl_02":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_02.png";           break;
		case "textures/atcs/eq2_bmtl_02_384":                       shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_02_384.png";       break;
		case "textures/atcs/eq2_bmtl_02_384b":                      shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_02_384b.png";      break;
		case "textures/atcs/eq2_bmtl_02up":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_02up.png";         break;
		case "textures/atcs/eq2_bmtl_03":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_03.png";           break;
		case "textures/atcs/eq2_bmtl_03_blue":                      shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_03_blue.png";      break;
		case "textures/atcs/eq2_bmtl_03_red":                       shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_03_red.png";       break;
		case "textures/atcs/eq2_bmtl_04":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_04.png";           break;
		case "textures/atcs/eq2_bmtl_05":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bmtl_05.png";           break;
		case "textures/atcs/eq2_bounce":                            shader_url = url + "/tremulous_atcs/textures/atcs/eq2_bounce.png";            break; // eq2_bouncefan.png
		case "textures/atcs/eq2_fbase":                             shader_url = url + "/tremulous_atcs/textures/atcs/eq2_fbase.png";             break;
		case "textures/atcs/eq2_fgrate_01":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_fgrate_01.png";         break;
		case "textures/atcs/eq2_floor_04":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_floor_04.png";          break;
		case "textures/atcs/eq2_floor_05":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_floor_05.png";          break;
		case "textures/atcs/eq2_floor_06b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_floor_06b.png";         break;
		case "textures/atcs/eq2_grate_01":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_grate_01.png";          break;
		case "textures/atcs/eq2_stepside_01":                       shader_url = url + "/tremulous_atcs/textures/atcs/eq2_stepside_01.png";       break;
		case "textures/atcs/eq2_trim_02":                           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trim_02.png";           break;
		case "textures/atcs/eq2_trimh_01":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimh_01.png";          break;
		case "textures/atcs/eq2_trimh_03c":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimh_03c.png";         break;
		case "textures/atcs/eq2_trimh_03cc":                        shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimh_03cc.png";        break;
		case "textures/atcs/eq2_trimv_00":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_00.png";          break;
		case "textures/atcs/eq2_trimv_01b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_01b.png";         break;
		case "textures/atcs/eq2_trimv_02":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_02.png";          break;
		case "textures/atcs/eq2_trimv_04":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_04.png";          break;
		case "textures/atcs/eq2_trimv_05":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_05.png";          break;
		case "textures/atcs/eq2_trimv_05b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_05b.png";         break;
		case "textures/atcs/eq2_trimv_09b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_09b.png";         break;
		case "textures/atcs/eq2_trimv_10b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_10b.png";         break;
		case "textures/atcs/eq2_trimv_11":                          shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_11.png";          break;
		case "textures/atcs/eq2_trimv_11d":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_11d.png";         break;
		case "textures/atcs/eq2_trimv_11d_blue":                    shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_11d_blue.png";    break;
		case "textures/atcs/eq2_trimv_11d_red":                     shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_11d_red.png";     break;
		case "textures/atcs/eq2_trimv_12b":                         shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_12b.png";         break;
		case "textures/atcs/eq2_trimv_mini":                        shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_mini.png";        break;
		case "textures/atcs/eq2_trimv_mini02":                      shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_mini02.png";      break;
		case "textures/atcs/eq2_trimv_mini02b":                     shader_url = url + "/tremulous_atcs/textures/atcs/eq2_trimv_mini02b.png";     break;
		case "textures/atcs/eq2lt_baselt03b_blue_s_1500":           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03_blue.png";     break;
		case "textures/atcs/eq2lt_baselt03b_blue_s_2000":           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03_blue.png";     break;
		case "textures/atcs/eq2lt_baselt03b_blue_s_3000":           shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03_blue.png";     break;
		case "textures/atcs/eq2lt_baselt03b_s_1500":                shader_url = url + "/tremulous_atcs/textures/atcs/eq2_baselt03_blue.png";     break;
		case "textures/atcs/eq2lt_bmtl03light_300":                 shader_url = url + "/tremulous_atcs/textures/atcs/force_grid.png";            break;
		case "textures/atcs/force_field_s":                         shader_url = url + "/tremulous_atcs/textures/atcs/force_field.png";           break;
		case "textures/atcs/rockground":                            shader_url = url + "/tremulous_atcs/textures/atcs/rust_2.png";                break;
		case "textures/atcs/skybox_s":                              shader_url = url + "/tremulous_atcs/textures/atcs/rust_2.png";                break;
		
		// my mp_toujane clone
		case "textures/concrete/asphalt":         shader_url = url + "/libwebgame/textures/concrete/asphalt.jpg";        break;
		case "textures/concrete/brown":           shader_url = url + "/libwebgame/textures/concrete/brown.jpg";          break;
		case "textures/concrete/ceiling2":        shader_url = url + "/libwebgame/textures/concrete/ceiling2.jpg";       break;
		case "textures/concrete/ceiling2_dark":   return material_concrete_ceiling2_dark();
		//case "textures/concrete/desertish":       shader_url = url + "/libwebgame/textures/concrete/desertish.jpg";      break;
		case "textures/concrete/desertish":       return material_sandyground1();
		//case "textures/concrete/white":           shader_url = url + "/libwebgame/textures/concrete/white.jpg";          break;
		case "textures/concrete/white":           return material_limestonemarked2();
		case "textures/kungtile/garagefloor":     shader_url = url + "/libwebgame/textures/kungtile/garagefloor.jpg";    break;
		case "textures/kungtile/metalfloor":      shader_url = url + "/libwebgame/textures/kungtile/metalfloor.jpg";     break;
		case "textures/kungtile/roof_china":      shader_url = url + "/libwebgame/textures/kungtile/roof_china.jpg";     break;
		case "textures/kungtile/whiteconcrete":   shader_url = url + "/libwebgame/textures/kungtile/whiteconcrete.jpg";  break;
		case "textures/kungtile/woodfloor":       shader_url = url + "/libwebgame/textures/kungtile/woodfloor.jpg";      break;
		case "textures/liquids/pool2":            shader_url = url + "/libwebgame/textures/liquids/pool2.jpg";      break;
		case "textures/liquids/water":            shader_url = url + "/libwebgame/textures/liquids/water.png";      break;
		case "textures/other/bulletmark_gun":     shader_url = url + "/libwebgame/textures/other/bulletmark_gun.tga";      break;
		case "textures/other/forest3":            shader_url = url + "/libwebgame/textures/other/forest3.jpg";      break;
		case "textures/other/mark2":              shader_url = url + "/libwebgame/textures/other/mark2.png";      break;
		case "textures/tools/ladder":             shader_url = url + "/libwebgame/textures/tools/ladder.jpg";      break;
		case "textures/window/1":                 return material_window_1();           break;
		case "textures/wood/a":                   shader_url = url + "/libwebgame/textures/wood/a.jpg";                break;
		case "textures/wood/b":                   shader_url = url + "/libwebgame/textures/wood/b.jpg";                break;
		case "textures/wood/c":                   shader_url = url + "/libwebgame/textures/wood/c.jpg";                break;
		case "textures/wood/d":                   shader_url = url + "/libwebgame/textures/wood/d.jpg";                break;
		case "textures/wood/e":                   shader_url = url + "/libwebgame/textures/wood/e.jpg";                break;
		case "textures/wood/f":                   shader_url = url + "/libwebgame/textures/wood/f.jpg";                break;
		case "textures/wood/g":                   shader_url = url + "/libwebgame/textures/wood/g.jpg";                break;
		case "textures/freepbr/grass1":           return material_freepbr_grass1();
		case "textures/cc0textures/asphalt07_whitened": return material_cc0textures_asphalt07_whitened();
		case "textures/cc0textures/asphalt07": return material_cc0textures_Asphalt07_4k();
		case "textures/cc0textures/asphalt14": return material_cc0textures_Asphalt14_4k();
		case "textures/cc0textures/plastic03": return material_cc0textures_Plastic03_4k();
		case "textures/cc0textures/pavingstones29": return material_cc0textures_PavingStones29_4k();
		
		// my mp_toujane clone
		case "concrete/asphalt":         shader_url = url + "/libwebgame/textures/concrete/asphalt.jpg";        break;
		case "concrete/brown":           shader_url = url + "/libwebgame/textures/concrete/brown.jpg";          break;
		case "concrete/ceiling2":        shader_url = url + "/libwebgame/textures/concrete/ceiling2.jpg";       break;
		case "concrete/ceiling2_dark":   shader_url = url + "/libwebgame/textures/concrete/ceiling2_dark.jpg";  break;
		case "concrete/desertish":       shader_url = url + "/libwebgame/textures/concrete/desertish.jpg";      break;
		case "concrete/white":           shader_url = url + "/libwebgame/textures/concrete/white.jpg";          break;
		case "kungtile/garagefloor":     shader_url = url + "/libwebgame/textures/kungtile/garagefloor.jpg";    break;
		case "kungtile/metalfloor":      shader_url = url + "/libwebgame/textures/kungtile/metalfloor.jpg";     break;
		case "kungtile/roof_china":      shader_url = url + "/libwebgame/textures/kungtile/roof_china.jpg";     break;
		case "kungtile/whiteconcrete":   shader_url = url + "/libwebgame/textures/kungtile/whiteconcrete.jpg";  break;
		case "kungtile/woodfloor":       shader_url = url + "/libwebgame/textures/kungtile/woodfloor.jpg";      break;
		case "liquids/pool2":            shader_url = url + "/libwebgame/textures/liquids/pool2.jpg";      break;
		case "liquids/water":            shader_url = url + "/libwebgame/textures/liquids/water.png";      break;
		case "other/bulletmark_gun":     shader_url = url + "/libwebgame/textures/other/bulletmark_gun.tga";      break;
		case "other/forest3":            shader_url = url + "/libwebgame/textures/other/forest3.jpg";      break;
		case "other/mark2":              shader_url = url + "/libwebgame/textures/other/mark2.png";      break;
		case "tools/ladder":             shader_url = url + "/libwebgame/textures/tools/ladder.jpg";      break;
		case "window/1":                 shader_url = url + "/libwebgame/textures/window/1.jpg";                break;
		case "wood/a":                   shader_url = url + "/libwebgame/textures/wood/a.jpg";                break;
		case "wood/b":                   shader_url = url + "/libwebgame/textures/wood/b.jpg";                break;
		case "wood/c":                   shader_url = url + "/libwebgame/textures/wood/c.jpg";                break;
		case "wood/d":                   shader_url = url + "/libwebgame/textures/wood/d.jpg";                break;
		case "wood/e":                   shader_url = url + "/libwebgame/textures/wood/e.jpg";                break;
		case "wood/f":                   shader_url = url + "/libwebgame/textures/wood/f.jpg";                break;
		case "wood/g":                   shader_url = url + "/libwebgame/textures/wood/g.jpg";                break;
		
		
		// quake3 textures
		case "textures/liquids/clear_ripple1"    : return material_water_clear();
		case "textures/liquids/clear_calm1"      : return material_water_clear();
		case "textures/stone/pjrock21"           : return material_pockedconcrete1();
		case "textures/base_floor/concretefloor1": return material_limestonemarked2();
		case "textures/kungtile/ladder"          : return material_oldplywood();
		case "textures/skies/hellsky2"           : return undefined;
		
		// mp_surf_utopia
		case "textures/CONCRETE/COMPUTERWALL001"    : return material_water_clear();
		case "textures/CONCRETE/CONCRETEWALL002"      : return material_water_clear();
		case "textures/CONCRETE/COMPUTERWALL005"           : return material_pockedconcrete1();
		case "textures/CONCRETE/COMPUTERWALL002": return material_limestonemarked2();
		case "textures/LIGHTS/WHITE001": return white;
		case "textures/TOOLS/TOOLSBLACK": return black;
		case "textures/CONCRETE/CONCRETEWALL001E": return material_limestonemarked2();
		
	}
	// always return a valid url, just so it has some diffuse map at least
	if (shader_url == "") {
		console.log("pc_game_materials.js: missing", shaderName);
		return material_sandyground1();
		shader_url = url + "/tremulous_atcs/textures/atcs/rust_2.png";
	}
	
	if (isTransparent) {
		
	} else {
		pc.Texture.fetch(shader_url).then(function(texture) {
			material.diffuseMap = texture;
			material.update();
		})
		
		//material.specular.set(0.4, 0.4, 0.4); // looks nice when everything is somewhat specular
	}
	
	
	// just for fun, add sand materials to make better pbr effects
	if (0) {
		//pc.Texture.fetch(url + "pbr/sandyground1/normal.jpg"  ).then(function(texture) { material.normalMap  = texture; material.update() })
		//pc.Texture.fetch(url + "pbr/sandyground1/height.jpg"  ).then(function(texture) { material.heightMap  = texture; material.update() })
		//pc.Texture.fetch(url + "pbr/sandyground1/ao.jpg"      ).then(function(texture) { material.aoMap      = texture; material.update() })
		metalify(material)
	}
	
	material.update(); // apply all settings
	

	
	return material;
}
