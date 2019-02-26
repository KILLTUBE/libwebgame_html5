set_frame = function(entity, hModel, frame) {
	//console.log(hModel, frame)
	
	// maila2 -> maila1 (with model/animation)... make some nice component system or something at some point...
	entity = entity.children[0]
	
	// rektman_lower
	if (hModel == 33) {
		
		//rektman_lower  = frame;
		
		if (frame >= 166 && frame <= 167) {
			subanim = subanims.subanims[0] // idle
		} else if (frame >= 110 && frame <= 121) {
			subanim = subanims.subanims[3] // run
		} else if (frame == 142) {
			//subanim = subanims.subanims[10] // jump
			// jump anim looks so fucked, just keep running atm lol
			subanim = subanims.subanims[3] // run
		} else if (frame == 151) {
			// TORSO_STAND
		} else if (frame == 141) {
			// LEGS_JUMP
		} else if (frame >= 131 && frame <= 135) {
			// swim
		} else if (frame >= 157 && frame <= 164) {
			// backflip jump
		} else if (frame >= 122 && frame <= 125) {
			// legs_back running backwards
		} else if (frame >= 90 && frame <= 91) {
			// LEGS_WALKCR
		} else if (frame == 176) {
			// LEGS_IDLECR
		} else if (frame == 98) {
			// legs_backwalk, but no clue what triggers this
			
		} else if (frame == 0) {
			// its loop==false animation, so reset time to play from begin to end once
			// but only reset time very first frame, otherwise the animation wont play
			if (subanim != subanims.subanims[9])
				animStart = seconds()
			subanim = subanims.subanims[9] // deaded
		} else {
			// subanim = subanims.subanims[3]
			console.log("unknown:", frame)
		}
		
		
		maila_anim_step(entity)
		return
	}
	
	// rektman upper
	if (hModel == 34) {
		
		//rektman_upper  = frame;
		return;
	}
	
	// rektman_head
	// death animation is only send to rektman_head it seems
	if (hModel == 35) {
		//rektman_head = frame;
		return;
		if (frame == 0) {
			subanim = subanims.subanims[9] // deaded
			animStart = seconds() // its loop==false animation, so reset time to play from begin to end once
		}
		maila_anim_step(entity)
		return
	}
	
	//console.log("hModel=", hModel, "frame=", frame)
}

find_oneframer = function(hModel, depthhack) {
	var entity = null;
	// try to get a cached refent
	for (var i=0; i<oneframers.children.length; i++) {
		var child = oneframers.children[i];
		if (child.usageCount == 0 && child.hModel == hModel && child.depthhack == depthhack) {
			entity = child;
			break;
		}
	}
	return entity;
}

init_idtech3 = function() {
	oneframers = new pc.GraphNode();
	oneframers.name = "oneframers"
	app.root.addChild(oneframers)
	
	maps = new pc.GraphNode();
	maps.name = "maps"
	app.root.addChild(maps)
	
	bulletmarks = new pc.GraphNode();
	bulletmarks.name = "bulletmarks"
	app.root.addChild(bulletmarks)
}

// it has a black background, make it transparent
//Muzzleflash.material.blendType = pc.BLEND_ADDITIVEALPHA

RE_AddRefEntityToScene = function(
	reType, hModel,
	origin_x ,  origin_y, origin_z ,
	//axis,
	forward_x, forward_y, forward_z,
	right_x  ,   right_y, right_z  ,
	up_x     ,      up_y, up_z,
	renderfx, frame
) {
	try {
		if (renderfx & 2) { // RF_THIRD_PERSON
			//console.warn("third person: ", hModel)
			return;
		}
		
		var depthhack = false;
		if (renderfx & 8) // RF_DEPTHHACK
			depthhack = true;
		
		var modelname = trmodels[hModel]
		
		if (reType == 0) { // RE_MODEL
		
			//var refent = refents[hModel] || {fresh: true}
			

			var forward = new pc.Vec3(forward_x, forward_z, -forward_y);
			var right   = new pc.Vec3(  right_x,   right_z, -  right_y);
			var up      = new pc.Vec3(     up_x,      up_z, -     up_y);
			
			//if (refent.fresh == true) {
			//	refent.fresh = false;
			//	refent.box = createBox(refent.origin, new pc.Vec3(0.02, 0.02, 0.02), red);
			//	console.log("new refent", hModel, "pos", refent.origin.data)
			//}
			
			var entity = find_oneframer(hModel, depthhack);
			
			// active entity if its disabled
			if (entity && entity.enabled == false) {
				entity.enabled = true;
			}
			
			var layer_id = skyboxLayer.id;
			if (depthhack)
				layer_id = weaponlayer.id // put this entity on weaponlayer so it isnt loosing depth test against world models
			
			var ignoreEntity = false;
			
			// if there isnt one, just make one
			if (entity == null) {
				
				try {
					if (modelname == "kungmodels/crowbar.kung1") {
						//entity = kungmesh_spawn("crowbar", layer_id, pc.CULLFACE_FRONT);
						entity = gltf_maila_hands;
					} else if (modelname == "kungmodels/sword.kung1") {
						entity = kungmesh_spawn("sword", layer_id, pc.CULLFACE_FRONT);
					} else if (modelname == "kungmodels/muzzleflash.kung1") {
						entity = kungmesh_spawn("muzzleflash", layer_id, pc.CULLFACE_FRONT);
					} else if (modelname == "kungmodels/kar98.kung1") {
						entity = kungmesh_spawn("kar98", layer_id, pc.CULLFACE_FRONT);
					} else if (modelname == "kungmodels/bazooka.kung1") {
						entity = kungmesh_spawn("bazooka", layer_id, pc.CULLFACE_BACK);
					} else if (modelname == "kungmodels/sheep.kung1") {
						entity = kungmesh_spawn("sheep", layer_id, pc.CULLFACE_FRONT);
					} else if (modelname == "kungmodels/mp44.kung1") {
						entity = kungmesh_spawn("mp44", layer_id, pc.CULLFACE_FRONT);
					} else if (modelname == "rektman_lower") {
						entity = maila_new()
						maila_load_anim(entity.children[0])
						// oh, this wasnt much of a win actually... if the matrices are dirty, they will simply be set later
						// but what i could do is calculating the matrices in WebAssembly and mark-clear each graph of the hierarchy
						//entity.syncHierarchy = function() {} // syncHierarchy is very slow and its not even needed, the animation is handling the hierarchy
					} else if (modelname == "rektman_upper") {
						ignoreEntity = true;
					} else if (modelname == "rektman_head") {
						ignoreEntity = true;
					} else {
						// ... actually missing, draw a box
					}
				} catch (ex) {
					console.log(ex)
				}
				// just drop out when rektman_upper or rektman_head, which i dont want to have a model atm
				if (ignoreEntity)
					return;
				if (entity == null) {
					entity = createBox(player.pos(), new pc.Vec3(0.06, 0.06, 0.06), red)
					entity.name = "modelname=" + modelname + " hModel=" + hModel;
				}
				entity.hModel = hModel; // mark entity by hModel, so we can iterate over oneframers and check for (entity.enabled == false && entity.hModel == hModel)
				entity.name = modelname;
				entity.oldPos = new pc.Vec3(-1, -2, -3);
				entity.depthhack = depthhack;
				if (entity.parent == null)
					oneframers.addChild(entity);
			}
			entity.usageCount = 1;
			//if (modelname == "rektman_lower") {
			//	//console.log("modelname", modelname)
			//	//gotEnt = entity;
			//	//entity = mailas[1]
			//	set_frame(entity, hModel, frame)
			//}
			// dont set the position for fps hands/weapons, they are supposed to be at 0,0,0 with identity rotation
			if (entity.depthhack) {
				entity.setPosition( _viewpos_x()/100,_viewpos_z()/100,_viewpos_y()/-100);
				entity.ex  = _viewpos_pitch() * -1;
				entity.ey  = _viewpos_yaw() - 90;
				entity.setLocalEulerAngles(entity.ex, entity.ey, 0);
				//entity.setLocalPosition(entity_cam.getLocalPosition());
				//entity.setLocalRotation(entity_cam.getLocalRotation());
				return;
			}
			var origin  = new pc.Vec3(origin_x/100, origin_z/100, origin_y/-100);
			// only update via setLocalPosition when origin actually changed, because this functions eats lots of milliseconds per frame :S
			if (entity.oldPos.equals(origin) == false) {
				entity.setLocalPosition( origin )
			}
			forward = forward.normalize()
			//entity.localRotation.setFromAxisAngle(forward, 0)
			entity.localRotation = LookRotation(forward, up)
			//if (entity.depthhack == false)
				entity.localRotation.mul(q)
			//entity.axis = axis;
			entity.forward_ = forward;
			entity.right_ = right;
			entity.up_ = up;
			entity.origin_ = origin;
		}
	} catch (ex) {
		console.error(ex)		
	}
}

RE_RegisterModel_callback = function(modindex, modname) {
	//console.log("RE_RegisterModel", arguments)
	trmodels[modindex] = Pointer_stringify(modname);
}

RE_BeginFrame_callback = function(cg_fov, fov_x, fov_y) {
	entity_cam.camera.fov = fov_x;
	entity_cam_weapon.camera.fov = fov_x;
	for (var child of oneframers.children) {
		// instead of disabled the entities, i simply set the usage count to 0
		// the addreftoscene will then increase this value
		// the endframe function will then check if there is any entity with usageCount == 0
		// if so, it is disabled, because unused
		//child.enabled = false;
		child.usageCount = 0;
	}
	globalDisableCount = 0
	globalEnabledCount = 0
}

RE_EndFrame_callback = function() {
	for (var child of oneframers.children) {
		if (child.usageCount == 0) {
			//console.log("RE_EndFrame_callback> disable", child);
			child.enabled = false;
			globalDisableCount++
		} else {
			globalEnabledCount++
		}
	}
	//console.log("globalDisableCount", globalDisableCount, "globalEnabledCount", globalEnabledCount)
	
}

set_dir = function(entity, dir) {
	var pos_data = entity.localPosition.data;
	var target_x = pos_data[0] + dir.data[0];
	var target_y = pos_data[1] + dir.data[1];
	var target_z = pos_data[2] + dir.data[2];
	entity.lookAt(target_x,target_y,target_z, 0,1,1) // 0,0,1 is up
}

CG_Bullet = function(base_x, base_y, base_z, otherEntityNum, dir_x, dir_y, dir_z) {
	var base = new pc.Vec3(base_x/100, base_z/100, base_y/-100);	
	var dir  = new pc.Vec3(dir_x, dir_z, -dir_y);
	
	var entity = createBox(base, new pc.Vec3(0.05, 0.05, 0.3), green)
	entity.dir_ = dir;
	set_dir(entity, dir);
	bulletmarks.addChild( entity )
}

CM_LoadMap_callback = function(nameptr, clientload, checksum) {
	CM_LoadMap_async(nameptr, clientload, checksum);
}

CM_LoadMap_async = async function(nameptr, clientload, checksum) {
	loadmap_nameptr = nameptr;
	loadmap_clientload = clientload;
	loadmap_checksum = checksum;
	console.log("nameptr", nameptr, "clientload", clientload, "checksum", checksum)
	var mappath = Pointer_stringify(nameptr); // will be something like "maps/mp_toujane.bsp"
	var posSlash = mappath.indexOf("/");
	var posPoint = mappath.indexOf(".");
	var mapname = mappath.substring(posSlash + 1, posPoint);
	console.log("Loading Map: ", mapname);
	// deactivate all maps, keep played maps cached
	maps.children.forEach((entity) => entity.enabled = false)
	var currentMap = maps.findByName(mapname)
	if (currentMap != null)
		currentMap.enabled = true // nice, its still cached
	else {
		await MagicFile.fetch(url + "libwebgame/" + mappath, "./" + mappath);
		
		// load the playcanvas stuff:
		// we dont actually need to wait for that... play can spawn etc. but world just isnt displayed yet, but the physics is there
		/*await */load_map(mapname); // if not cached, load it
	}
	
	
	if (clientload) {
		_CM_LoadMap_real(loadmap_nameptr, loadmap_clientload, loadmap_checksum);
		_CG_Init_Resume();
	} else {
		_CM_LoadMap_real(loadmap_nameptr, loadmap_clientload, loadmap_checksum);
		_SV_SpawnServer_Resume();
	}
}