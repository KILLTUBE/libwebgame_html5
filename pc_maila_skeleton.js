BoneWeight = function(i0, i1, i2, i3, w0, w1, w2, w3) {
	this.boneIndex0 = i0;
	this.boneIndex1 = i1;
	this.boneIndex2 = i2;
	this.boneIndex3 = i3;
	this.weight0 = w0;
	this.weight1 = w1;
	this.weight2 = w2;
	this.weight3 = w3;
}

BoneWeight.fetch = async function(url) {
	var float32array_boneweights = await Float32Array.fetch(url)
	var numBoneWeights = float32array_boneweights.length / 8;
	var bones = Array(numBoneWeights)
	for (var i=0; i<numBoneWeights; i++) {
		var i0 = float32array_boneweights[i * 8 + 0]
		var i1 = float32array_boneweights[i * 8 + 1]
		var i2 = float32array_boneweights[i * 8 + 2]
		var i3 = float32array_boneweights[i * 8 + 3]
		var w0 = float32array_boneweights[i * 8 + 4]
		var w1 = float32array_boneweights[i * 8 + 5]
		var w2 = float32array_boneweights[i * 8 + 6]
		var w3 = float32array_boneweights[i * 8 + 7]
		bones[i] = new BoneWeight(i0, i1, i2, i3, w0, w1, w2, w3);
	}
	return bones;
}

Skeleton = function(name) {
	this.name = name;
	
}

Skeleton.prototype.load = async function() {
	var float32array_localPositions = await Float32Array.fetch(url + this.name + "/localPositions.Vec3[]")
	var float32array_localRotations = await Float32Array.fetch(url + this.name + "/localRotations.Quat[]")
	var float32array_localScales    = await Float32Array.fetch(url + this.name + "/localScales.Vec3[]")
	var parent_ids                  = await Int32Array.fetch(url + this.name + "/parent_ids.Int32[]")
	var bonecount = float32array_localPositions.length / 3;
	var bones = Array(bonecount)
	var rootBone = null;
	var boneweights = await BoneWeight.fetch(url + this.name + "/boneweights")
	                

	for (var i=0; i<bonecount; i++) {
		
		var bone = {}
		
		var pos_x = float32array_localPositions[i * 3 + 0]
		var pos_y = float32array_localPositions[i * 3 + 1]
		var pos_z = float32array_localPositions[i * 3 + 2]
		
		var rot_x = float32array_localRotations[i * 4 + 0]
		var rot_y = float32array_localRotations[i * 4 + 1]
		var rot_z = float32array_localRotations[i * 4 + 2]
		var rot_w = float32array_localRotations[i * 4 + 3]
		
		var scale_x = float32array_localScales[i * 3 + 0]
		var scale_y = float32array_localScales[i * 3 + 1]
		var scale_z = float32array_localScales[i * 3 + 2]
		
		

		
		bone.localPosition = new pc.Vec3(pos_x, pos_y, pos_z);
		bone.localRotation = new pc.Quat(rot_x, rot_y, rot_z, rot_w);
		bone.localScale    = new pc.Vec3(scale_x, scale_y, scale_z);
		bone.parent_id     = parent_ids[i];
		bone.entity = new pc.Entity("bone_"+i, app)
		bone.childs = []
		bones[i] = bone;
	}


	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		if (bone.parent_id == -1) {
			rootBone = bone;
		} else {
			// > add current bone as child to parent bone
			bones[bone.parent_id].childs.push(bone)
		}
	}


	app.root.addChild( rootBone.entity )


	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		bone.entity.setLocalPosition(bone.localPosition)
		bone.entity.setLocalRotation(bone.localRotation)
		
	}

	// wtf fucks for-of up?
	// for (var bone of bones) {
	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		for (var j=0; j<bone.childs.length; j++) {
			var child = bone.childs[j]
			bone.entity.addChild(child.entity)
		}
	}

	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		bone.entity.getPosition(); // force saving of the position into bone.entity.position
	}


	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		var scale = 0.01;
		//bone.box = createBox(bone.entity.getPosition(), new pc.Vec3(scale, scale, scale), red)
		//bone.box = new pc.Entity("debugbox")
		//bone.box.addComponent("model", {
		//	type: "box"
		//});
		//bone.box.model.material = red;
		////bone.entity.setLocalScale(new pc.Vec3(scale, scale, scale));
		//bone.box.setLocalScale(scale,scale,scale);
		//bone.entity.addChild(bone.box)
		//console.log(bone.entity.position)
		bone.entity.getPosition()
	}

	rootBone.entity.setPosition(player.pos())
	rootBone.entity.rotate(270,0,0)
	rootBone.entity.translate(0,-0.2,0)
	rootBone.entity.setLocalScale(0.4, 0.4, 0.4)
	
	for (var i=0; i<bonecount; i++) {
		var bone = bones[i];
		//bone.box.setPosition(bone.entity.getPosition())
	}

	
	// export vars here, cba to change everything to "this." atm
	this.float32array_localPositions = float32array_localPositions 
	this.float32array_localRotations = float32array_localRotations 
	this.float32array_localScales    = float32array_localScales    
	this.parent_ids                  = parent_ids                  
	this.bonecount                   = bonecount                   
	this.bones                       = bones                       
	this.rootBone                    = rootBone                    
	this.boneweights                 = boneweights 
} // end Skeleton load function

skeletons_init = function() {
	app.on("update", function() {
		try {
			for (var skeleton of skeletons)
				render_hierarchy_lines(skeleton.rootBone.entity);
		} catch(ex) {
			console.log(ex);
		}	
	})
}

// skeleton_new("maila")
// skeleton_new("maila_pose")

skeleton_new = async function(name) {
	var skeleton = new Skeleton(name)
	await skeleton.load()
	skeletons.push( skeleton )
}