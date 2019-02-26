SubAnims = function() {
	this.subanims = []
}

SubAnims.prototype.add = function(name, frame_start, frame_end, loop) {
	var subanim = new SubAnim(name, frame_start, frame_end, loop);
	this.subanims.push( subanim )
}

SubAnim = function(name, frame_start, frame_end, loop) {
	this.name = name;
	this.fps = 30; // hardcoded atm
	this.frame_start = frame_start;
	this.frame_end = frame_end;
	this.start = this.frame_start / this.fps;
	this.end = this.frame_end / this.fps;
	this.duration = this.end - this.start;
	this.loop = loop;
}

seconds = () => Date.now() / 1000.0

// set_frame is setting subanim, so overwrite that function to do nothing for testing
// set_frame = function() {}

maila_anim_step = function(entity) {
	
	// wait till animation is loaded
	if (typeof entity.animation == "undefined")
		return;
	
	var now = seconds();
	
	
	var timeIn = now - animStart;
	var timeNew = 0;
	
	if (subanim.loop) {
		// just mod it so it repeats
		timeNew = timeIn % subanim.duration;
	} else {
		// if it doesnt loop, cut the time back to end
		timeNew = timeIn;
		if (timeIn > subanim.duration)
			timeNew = subanim.duration;
	}
	entity.animation.currentTime = subanim.start + timeNew;
	//console.log(mailas[0].animation.currentTime)
	//mailas[0].setLocalPosition( playera.pos2 )
	//maila.setLocalPosition(playera.pos)
	//console.log(timeMod, "asd")
}

init_pc_maila_anim = function() {
	// name, frame_start, frame_end, loop
	subanims.add("idle01"     ,   0,  90, true);
	subanims.add("idle02"     ,  96, 170, true);
	subanims.add("walk"       , 176, 204, true);
	subanims.add("run"        , 210, 240, true);
	subanims.add("sprint"     , 245, 263, true);
	subanims.add("hit01"      , 305, 329, true);
	subanims.add("hit02"      , 335, 365, true);
	subanims.add("block"      , 370, 395, true);
	subanims.add("injured"    , 400, 430, true);
	subanims.add("fall_down"  , 435, 480, false);
	subanims.add("jump"       , 265, 300, true);
	subanims = new SubAnims();
	subanim = subanims.subanims[3];
	animStart = seconds()
}

//app.on("update", function() {
//	maila_anim_step()
//})