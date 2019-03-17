rand_int = function() {
	return Math.floor(Math.random() * 10000000);
}

seconds = function() {
	return Date.now() / 1000.0;
}

LookRotation = function(forward, up) {
	forward = forward.normalize();

	//var vector = forward.normalize();
	//var vector2 = up.CrossProduct(vector).Normalize();
	//var vector3 = vector.CrossProduct(vector2);
	var vector = forward.normalize();
	var vector2 = (new pc.Vec3()).cross(up, vector).normalize();
	var vector3 = (new pc.Vec3()).cross(vector, vector2);
	var m00 = vector2.x;
	var m01 = vector2.y;
	var m02 = vector2.z;
	var m10 = vector3.x;
	var m11 = vector3.y;
	var m12 = vector3.z;
	var m20 = vector.x;
	var m21 = vector.y;
	var m22 = vector.z;

	var num8 = (m00 + m11) + m22;
	var quaternion = new pc.Quat;
	if (num8 > 0.0)
	{
		var num = Math.sqrt(num8 + 1.0);
		quaternion.w = num * 0.5;
		num = 0.5 / num;
		quaternion.x = (m12 - m21) * num;
		quaternion.y = (m20 - m02) * num;
		quaternion.z = (m01 - m10) * num;
		return quaternion;
	}
	if ((m00 >= m11) && (m00 >= m22))
	{
		var num7 = Math.sqrt(((1.0 + m00) - m11) - m22);
		var num4 = 0.5 / num7;
		quaternion.x = 0.5 * num7;
		quaternion.y = (m01 + m10) * num4;
		quaternion.z = (m02 + m20) * num4;
		quaternion.w = (m12 - m21) * num4;
		return quaternion;
	}
	if (m11 > m22)
	{
		var num6 = Math.sqrt(((1.0 + m11) - m00) - m22);
		var num3 = 0.5 / num6;
		quaternion.x = (m10 + m01) * num3;
		quaternion.y = 0.5 * num6;
		quaternion.z = (m21 + m12) * num3;
		quaternion.w = (m20 - m02) * num3;
		return quaternion;
	}
	var num5 = Math.sqrt(((1.0 + m22) - m00) - m11);
	var num2 = 0.5 / num5;
	quaternion.x = (m20 + m02) * num2;
	quaternion.y = (m21 + m12) * num2;
	quaternion.z = 0.5 * num5;
	quaternion.w = (m01 - m10) * num2;
	return quaternion;
}

addressToStringSize = function(address, size) {
	var ret = "";
	for (var i=0; i<size; i++) {
		ret += String.fromCharCode( HEAP8[address + i] );
	}
	return ret;
}

// https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
save_file_locally = function(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
	
callback_save_file = function(data, size, filename) {
	data = addressToStringSize(data, size);
	filename = addressToString(filename);
	console.log("Saved ", filename, "Size: ", size/1024, "kb");
	//$.post( "FileDistributor.php/savefile.php", { "data": data, "filename": filename } );
	save_file_locally(filename, data);
}

printstring = function(str) {
	printstrings.innerHTML += str;
}

printstrings_clear = function() {
	while (printstrings.firstChild !== null)
		printstrings.firstChild.remove();
}

after_main_called = function() {
	fullwindow();
	
	windowmode = WindowMode_Small;
	starttime = Date.now();
		
	canvas_and_overlay = document.getElementById("canvas_and_overlay");
	overlay = document.getElementById("overlay");
	
	printstrings = document.createElement("div");
	overlay.appendChild(printstrings);
	
	fullwindow();
	
	// why the fuck this shit doesnt work
	//canvas_ = document.getElementById("canvas")
	//canvas_ = document.getElementsByClassName("emscripten_border")[0]
	canvas_ = document;
	
	aht_centerprint = new AnimatedHistoryText( -1, 120, 36,  true);
	aht_print       = new AnimatedHistoryText( 20, 400, 16, false);
	aht_chat        = new AnimatedHistoryText( 20, 100, 16, false);
	aht_teamchat    = new AnimatedHistoryText( 20, 200, 16, false);

	playcanvas_setup();
	ws = connect();
	main_playcanvas();
	//set_input_events(canvas);
	set_input_events(document); // so F1 doesnt open Help, F5 doesnt reload page etc.
	//fitcanvas()
}

/**
 * @param {pc.Entity} entity
 * @summary
 * clones a pc.Entity including the GLTF animation component
 */

clone_gltf = function(entity) {
    // 1) clone entity
    var entity_clone = entity.clone();
    for (var i=0; i<entity.model.meshInstances.length; i++) {
        // visibility of meshInstances is not cloned, update manually:
        entity_clone.model.meshInstances[i].visible = entity.model.meshInstances[i].visible;
    }
    // 2) clone existing AnimationComponent, otherwise we are done
    if (!entity.animComponent)
        return entity_clone;
    // 3) assign new AnimationComponent
    entity_clone.animComponent = new AnimationComponent();
    // 4) clone animation clips
    var numClips = entity.animComponent.animClips.length;
    var animationClips = Array(numClips);
    for (var i=0; i<numClips; i++)
        animationClips[i] = entity.animComponent.animClips[i].clone();
    // 5) assign entity_clone to each clip->curve->target
    for (var i = 0; i < animationClips.length; i++) {
        var clip = animationClips[i];
        for(var c = 0; c < clip.animCurves.length; c++) {
            var animTarget = clip.animTargets[c];
            if (animTarget.targetNode === "model")
                animTarget.targetNode = entity_clone;
        }
    }
    // 6) Add all animations to the model's animation component
    for (i = 0; i < animationClips.length; i++) {
        var clip = animationClips[i];
        clip.transferToRoot(entity_clone);
        entity_clone.animComponent.addClip(clip);
    }
    return entity_clone;
}

/**
 * @param {number} ms
 * @example
 * await wait(1000); console.log("done");
 */

wait = function(ms) {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, ms);
	});
}

