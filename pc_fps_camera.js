init_fps_camera = function() {
	var FirstPersonCamera = pc.createScript('firstPersonCamera')

	FirstPersonCamera.attributes.add('speed', {
		type: 'number',
		default: 10
	});

	FirstPersonCamera.prototype.initialize = function () {
		// Camera euler angle rotation around x and y axes
		var eulers = this.entity.getLocalEulerAngles()
		var camcom = this.entity.camera;
		camcom.ex = eulers.x;
		camcom.ey = eulers.y;
		
		q = new pc.Quat()
		
		// Disabling the context menu stops the browser displaying a menu when
		// you right-click the page
		//var mouse = this.app.mouse;
		//mouse.disableContextMenu();
		//mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
		//mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
	};

	Player2 = function() {}
	Player2.prototype.pos = function() {
		return new pc.Vec3(
			_viewpos_x() / 100,
			_viewpos_z() / 100,
			_viewpos_y() /-100
		)
	}

	player = new Player2()

	xx = -90
	yy = -90
	zz = 0
	//xx = 0
	//yy = 90
	//zz = 90
	crowbar_forward = 0.18
	crowbar_right = 0.08
	crowbar_up = -0.04
	setCrowbarPos = function() {
		
		fwd = entity_cam.forward.scale(crowbar_forward).clone()
		right = entity_cam.right.scale(crowbar_right).clone()
		up = entity_cam.up.scale(crowbar_up).clone()
		crowbar.setLocalPosition(player.pos().add(fwd).add(right).add(up).clone());
		//crowbar.setEulerAngles(-90,40,0);
		euler = entity_cam.getEulerAngles().data
		//crowbar.rotation = entity_cam.rotation
		
		ex = entity_cam.camera.ex
		ey = entity_cam.camera.ey
		crowbar.setEulerAngles(ex,ey,0);

		crowbar.localRotation.mul(q)
	}

	FirstPersonCamera.prototype.update = function (dt) {

		q.setFromEulerAngles(xx,yy,zz)	
		
		var camcom = this.entity.camera;
		// Update the camera's orientation
		//this.entity.setLocalEulerAngles(camcom.ex, camcom.ey, 0);

		try {
			// rip pos from idtech3 to playcanvas lol
			entity_cam.setPosition( _viewpos_x()/100,_viewpos_z()/100,_viewpos_y()/-100)
			entity_cam.camera.ex  = _viewpos_pitch() * -1
			entity_cam.camera.ey  = _viewpos_yaw() - 90
			this.entity.setLocalEulerAngles(entity_cam.camera.ex, entity_cam.camera.ey, 0);

			//crowbar.model.meshInstances[0].material.diffuseMap = crowbar_texture.resource
			//crowbar.model.meshInstances[0].material.update()
					
			entity_cam_weapon.setLocalPosition( entity_cam.getLocalPosition() )
			entity_cam_weapon.setLocalRotation( entity_cam.getLocalRotation() )
		} catch(ex) {
			console.log(ex)
		}
		
		// crowbar in fps view
		//try {
		//	setCrowbarPos();
		//} catch(ex) {}
		
		/*
		// Update the camera's position
		var keyboard = this.app.keyboard;
		var forwards  = keyboard.isPressed(pc.KEY_UP)   || keyboard.isPressed(pc.KEY_W);
		var backwards = keyboard.isPressed(pc.KEY_DOWN) || keyboard.isPressed(pc.KEY_S);
		var left  = keyboard.isPressed(pc.KEY_LEFT)  || keyboard.isPressed(pc.KEY_A);
		var right = keyboard.isPressed(pc.KEY_RIGHT) || keyboard.isPressed(pc.KEY_D);
		if (forwards) {
			this.entity.translateLocal(0, 0, -this.speed*dt);
		} else if (backwards) {
			this.entity.translateLocal(0, 0, this.speed*dt);
		}

		if (left) {
			this.entity.translateLocal(-this.speed*dt, 0, 0);
		} else if (right) {
			this.entity.translateLocal(this.speed*dt, 0, 0);
		}
		*/
	};

	FirstPersonCamera.prototype.onMouseMove = function (event) {
		// Update the current Euler angles, clamp the pitch.
		if (pc.Mouse.isPointerLocked()) {
			var camcom = this.entity.camera;
			camcom.ex -= event.dy / 5;
			camcom.ex = pc.math.clamp(camcom.ex, -90, 90);
			camcom.ey -= event.dx / 5;
		}
	};

	FirstPersonCamera.prototype.onMouseDown = function (event) {
		// When the mouse button is clicked try and capture the pointer
		if (!pc.Mouse.isPointerLocked()) {
			this.app.mouse.enablePointerLock();
		}
	};
}