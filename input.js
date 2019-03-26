function istext(e) {
	
	// needs to be before e.ctrlKey check, because AltGr+7 etc. causes e.ctrlKey to be true
	if (e.key == "{" || e.key == "}" || e.key == "[" || e.key == "]" || e.key == "~" || e.key == "\\")
		return true;
	
	if (e.ctrlKey)
		return false;
	
	
	if (e.key == "Home") return false;
	if (e.key == "End") return false;
	if (e.key == "PageUp") return false;
	if (e.key == "PageDown") return false;
	if (e.key == "Insert") return false;
	if (e.key == "Delete") return false;
	
	// e.g. ArrowLeft
	if (e.key.length > 4)
		return false;
	if (e.keyCode < 32)
		return false;
	var keycode = e.key.charCodeAt(0);
	//keycode = e.keyCode;
	
	if (keycode >= 32 && keycode <= 126) return true;
	if (e.key == "ß") return true; // ß
	if (e.key == "ü") return true;
	if (e.key == "ö") return true;
	if (e.key == "ä") return true;
	if (e.key == "Ü") return true;
	if (e.key == "Ö") return true;
	if (e.key == "Ä") return true;
	return false;
}

K_UPARROW = 132;
K_DOWNARROW = 133;
K_LEFTARROW = 134;
K_RIGHTARROW = 135;


	K_ALT = 136
	K_CTRL = 137
	K_SHIFT = 138
	K_INS = 139
	K_DEL = 140
	K_PGDN = 141
	K_PGUP = 142
	K_HOME = 143
	K_END = 144

function toQuakeCode(e) {
	if (e.keyCode == 37) return 134; // left array key
	if (e.keyCode == 38) return 132; // left array key K_UPARROW
	if (e.keyCode == 39) return K_RIGHTARROW; // right array key
	if (e.keyCode == 40) return K_DOWNARROW;
	if (e.keyCode == 46) return 140; // delete
	if (e.keyCode == 36) return K_HOME;
	if (e.keyCode == 35) return K_END;
	if (e.keyCode == 33) return K_PGUP; // Page up
	if (e.keyCode == 34) return K_PGDN; // page down
	if (e.keyCode == 16) return K_SHIFT; // page down
	//if (e.keyCode == 189) return 95; // _
	
	// from A to Z, keyCode is unaffected by shift
	if (e.keyCode >= 60 && e.keyCode <= 90) {
		if (e.shiftKey == true)
			return e.keyCode
		else
			return e.keyCode + 32 // lower case ascii letters are from 97 to 122, aka +32
	}
	return e.keyCode; // add if() if not identical
}

/*
add a JS command like /javascript console.log("bla")
then forward the F1-12 keys aswell, so quake handles it
*/
function handleKeyForQuake(e, pressed) {
	// the input logic for quake 3 is kinda messed up...	
	if (e.keyCode == 8) { // for some reason this is how Q3 takes a "backspace"
		if (pressed)
			_Com_QueueEvent( 0, SE_CHAR, 8, 1, 0, NULL);
		return;
	}
	if (istext(e) == false) {
		//if (pressed)
		//	_Com_QueueEvent( 0, SE_CHAR, toQuakeCode(e), pressed, 0, NULL );
		_Com_QueueEvent( 0, SE_KEY, toQuakeCode(e), pressed, 0, NULL );
		return;
	}
	//var key = e.key.toLowerCase();

	// this worked for latin keyboards, but e.g. not russian ones
	//var asciiCode = e.key.charCodeAt(0);
	var asciiCode = e.keyCode;
	var asciiCode32 = e.keyCode;
	// pressing w, no matter of shift pressed or not, will always result in e.keyCode==87
	// 87 is ascii for 'W', 119 is ascii for 'w'
	// so if shift ISNT pressed, we need to add 32 (to get 'w')
	//if (e.shiftKey == false)
	//	asciiCode += 32; // turn 'W' into 'w'

	if (e.keyCode >= 60 && e.keyCode <= 90) {
		if (e.shiftKey == true)
			asciiCode = e.keyCode
		else
			asciiCode = e.keyCode + 32 // lower case ascii letters are from 97 to 122, aka +32
		asciiCode32 += 32
	} else {
		asciiCode = e.key.charCodeAt(0)
	}

	if (pressed)
		_Com_QueueEvent( 0, SE_CHAR, asciiCode, pressed, 0, NULL );
	_Com_QueueEvent( 0, SE_KEY, asciiCode32, pressed, 0, NULL );
}

q3_on_key_down = function(e) {
	if (e.key == "t") {
		chat_open_and_focus();
		e.preventDefault();
	} else {
		handleKeyForQuake(e, 1);
	}	
}

on_key_down = function(e_) {
	
	if (e_.defaultPrevented)
	{
		if (debugKeys)
			console.log("on_key_down was prevented")
		return;
	}
	
	e = e_;
	
	if (e.key == "F10") {
		fullwindow();
		return;
	}
	
	if (e.key == "F11" || e.key == "F12") {
		return; // allow F11 for fullscreen and F12 for dev console
	}
	
	// allow ctrl+v to trigger document.onpaste, so we have access to clipboard text
	const isCtrl = e.keyCode == 17;
	const isV = e_.key == "v";
	const allowDefault = isCtrl || isV;
	
	if ( ! allowDefault)
		e_.preventDefault();
	
	if (debugKeys)
		console.log("on_key_down: ", e_, "istext=", istext(e));

	q3_on_key_down(e_);

}

q3_on_key_up = function(e) {
	handleKeyForQuake(e, 0);
}

on_key_up = function(e_) {
	// needs to be done in some event for security reasons and this is kinda the best fit
	if (copyMeIntoClipboard.length != 0) {
		copyToClipboard(copyMeIntoClipboard);
		copyMeIntoClipboard = "";
	}
	
	if (e_.defaultPrevented)
	{
		if (debugKeys)
			console.log("on_key_up was prevented")
		return;
	}
	
	e_.preventDefault();
	e = e_;
	if (debugKeys)
		console.log("on_key_up", e_, "istext=", istext(e));
	

	q3_on_key_up(e_);
}

old_delta_x = 0;
old_delta_y = 0;

debugMouse = false;

q3_on_mouse_move = function(e) {
	if (document.pointerLockElement == null)
		return;
	// fix bug in Chrome that movementX suddenly is large as fuck, e.g. jumping from -30 to -520
	var delta_x = e.movementX;
	var delta_y = e.movementY;
	var factor = delta_x / old_delta_x; // e.g. -520 / 30 = -17.333
	if (Math.abs(delta_x) > 200) // bug range seems to be 400 to 500, positive and negative
	if (Math.abs(factor) > 5) {
		console.log("FIX UP CHROME MOUSE BUG delta_x: " + delta_x + " old_delta_x:" + old_delta_x)
		//delta_x = 0; // just use the old value then
		return; // ignore whole faulty shit event
	}
	var factor2 = delta_y / old_delta_y; // e.g. -520 / 30 = -17.333
	if (Math.abs(delta_y) > 200) // bug range seems to be 400 to 500, positive and negative
	if (Math.abs(factor2) > 5) {
		console.log("FIX UP CHROME MOUSE BUG delta_x: " + delta_y + " old_delta_x:" + old_delta_y)
		//delta_y = 0; // just use the old value then
		return; // ignore whole faulty shit event
	}
	if (debugMouse)
		console.log("mouse delta x/y: ", delta_x, delta_y);
	_Com_QueueEvent( 0, SE_MOUSE, delta_x, delta_y, 0, NULL );
	old_delta_x = e.movementX;
	old_delta_y = e.movementY;
}

on_mouse_move = function(e) {
	//pos_left = e.pageX - e.currentTarget.offsetLeft;
	//pos_top = e.pageY - e.currentTarget.offsetTop;
	pos_left = e.pageX - playcanvas.offsetLeft;
	pos_top = e.pageY - playcanvas.offsetTop;
	//console.log("px", e.pageX, "py", e.pageY)
	//console.log("offsetLeft", e.currentTarget.offsetLeft, "offsetTop", e.currentTarget.offsetTop);
	//console.log("pos_left", pos_left, "pos_top", pos_top)
	//console.log(e.movementX, e.movementY)
	
	q3_on_mouse_move(e);
	e.preventDefault()
}


K_MOUSE1     = 178;
K_MOUSE2     = 179;
K_MOUSE3     = 180;
K_MOUSE4     = 181;
K_MOUSE5     = 182;
K_MWHEELDOWN = 183;
K_MWHEELUP   = 184;

q3_mouse_left_pressed = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE1, /*pressed*/1, 0, NULL );
	//gltf_maila_hands.children[0].script.anim.animComponent.animClips["ArmatureAction"].session.curTime = 0;
}
q3_mouse_right_pressed = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE2, /*pressed*/1, 0, NULL );
}
q3_mouse_middle_pressed = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE3, /*pressed*/1, 0, NULL );
}

q3_mouse_left_release = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE1, /*pressed*/0, 0, NULL );
}
q3_mouse_right_release = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE2, /*pressed*/0, 0, NULL );
}
q3_mouse_middle_release = function() {
	_Com_QueueEvent( 0, SE_KEY, K_MOUSE3, /*pressed*/0, 0, NULL );
}

function q3_mouse(e, pressed) {
			//int b;
			//		switch( e.button.button )
			//		{
			//			case SDL_BUTTON_LEFT:   b = K_MOUSE1;     break;
			//			case SDL_BUTTON_MIDDLE: b = K_MOUSE3;     break;
			//			case SDL_BUTTON_RIGHT:  b = K_MOUSE2;     break;
			//			case SDL_BUTTON_X1:     b = K_MOUSE4;     break;
			//			case SDL_BUTTON_X2:     b = K_MOUSE5;     break;
			//			default:                b = K_AUX1 + ( e.button.button - SDL_BUTTON_X2 + 1 ) % 16; break;
			//		}
	if (pressed) {
		switch (e.button) {
			case 0: q3_mouse_left_pressed();   break;
			case 1: q3_mouse_middle_pressed(); break;
			case 2: q3_mouse_right_pressed();  break;
		}
	} else {
		switch (e.button) {
			case 0: q3_mouse_left_release();   break;
			case 1: q3_mouse_middle_release(); break;
			case 2: q3_mouse_right_release();  break;
		}
		
	}
}

q3_on_mouse_down = function(e) {
	if (document.pointerLockElement != null)
		q3_mouse(e, 1);
	
}

q3_on_mouse_up = function(e) {
	
	q3_mouse(e, 0);
	
}

on_mouse_down = function(e) {
	//console.log(e.button)
	q3_on_mouse_down(e);
	e.preventDefault()
}

on_mouse_up = function(e) {
	//console.log(e.button)
	q3_on_mouse_up(e);
	e.preventDefault()
}

qtrue = 1;
qfalse = 0;
lastWheel = 0;

q3_on_mouse_wheel = function(e) {
	if (e.wheelDelta > 0) {
		_Com_QueueEvent( 0, SE_KEY, K_MWHEELUP, qtrue, 0, NULL );
		_Com_QueueEvent( 0, SE_KEY, K_MWHEELUP, qfalse, 0, NULL );
	} else {
		_Com_QueueEvent( 0, SE_KEY, K_MWHEELDOWN, qtrue, 0, NULL );
		_Com_QueueEvent( 0, SE_KEY, K_MWHEELDOWN, qfalse, 0, NULL );
	}	
}

on_mouse_wheel = function(e) {
	//_mouse_wheel(e.wheelDelta / 120)
	//console.log(e.wheelDelta);
	// for some reason Chrome sends two mouse wheels when I do one...
	if (Date.now() - lastWheel < 20 )
		return;
	//console.log("ignore...", Date.now() - lastWheel);
	if (debugMouse)
		console.log("on_mouse_wheel", e)
	
	q3_on_mouse_wheel(e);
	lastWheel = Date.now();
	e.preventDefault()
}


function hookKeyEvents() {
	document.onkeydown = on_key_down;
	document.onkeyup = on_key_up;
}
function unhookKeyEvents() {
	document.onkeydown = null;
	document.onkeyup = null;
}
function hookMouseEvents() {
	document.onmousemove  = on_mouse_move;
	document.onmousedown  = on_mouse_down;
	document.onmouseup    = on_mouse_up;
	document.onmousewheel = on_mouse_wheel;
}
function unhookMouseEvents() {
	document.onmousemove  = null;
	document.onmousedown  = null;
	document.onmouseup    = null;
	document.onmousewheel = null;
}

function set_input_events(element) {

	overlay.onclick = function(e) {
		console.log("overlay.onclick");
		if (e.defaultPrevented) { // when user clicked on #chat dont lock the mouse
			console.log("overlay.onclick", "e.defaultPrevented");
			return;
		}
		canvas_and_overlay.requestPointerLock();
	};
	
	
	chat_init();
	//overlay.onmousemove  = on_mouse_move;
	//overlay.onmousedown  = on_mouse_down;
	//overlay.onmouseup    = on_mouse_up;
	//overlay.onmousewheel = on_mouse_wheel;
	hookKeyEvents();
	hookMouseEvents();
			
	document.addEventListener('pointerlockchange', function() {
		//console.log("on lock change", document.pointerLockElement)
		if (document.pointerLockElement == null) {
			//console.log("release mouse lock")
			//unhookKeyEvents()
			//unhookMouseEvents()
		} else {
			//console.log("enter mouse lock")
			hookKeyEvents();
			hookMouseEvents();
		}
		
	}, false);
}
	
	
	