q3config = function() {
	Cmd_ExecuteString('set cg_gunX 0');
	Cmd_ExecuteString('set cg_gunY 0');
	Cmd_ExecuteString('set cg_gunZ 0');
	Cmd_ExecuteString('set cg_player_weapon 1');
	Cmd_ExecuteString('set cg_player_head 1');
	Cmd_ExecuteString('set cg_player_body 1');
	Cmd_ExecuteString('set cg_player_legs 1');
	Cmd_ExecuteString('set cg_thirdPersonRange 100');
	Cmd_ExecuteString('//set cg_thirdPersonAngle 180');
	Cmd_ExecuteString('//set cg_thirdPerson 1');
	Cmd_ExecuteString('set cg_thirdPersonAngle 0');
	Cmd_ExecuteString('set cg_thirdPerson 0');
	Cmd_ExecuteString('seta team_headmodel "rektman"');
	Cmd_ExecuteString('seta team_model     "rektman"');
	Cmd_ExecuteString('seta headmodel      "rektman"');
	Cmd_ExecuteString('seta model          "rektman"');
	Cmd_ExecuteString('seta name "Unknown Soldier"');
	Cmd_ExecuteString('unbindall');
	Cmd_ExecuteString('bind TAB "+scores"');
	Cmd_ExecuteString('bind f "+button2"');
	Cmd_ExecuteString('bind ESCAPE "togglemenu"');
	Cmd_ExecuteString('bind SPACE "+moveup"');
	Cmd_ExecuteString('bind + "sizeup"');
	Cmd_ExecuteString('bind - "sizedown"');
	Cmd_ExecuteString('bind / "weapnext"');
	Cmd_ExecuteString('bind 0 "weapon 10"');
	Cmd_ExecuteString('bind 1 "weapon 1"');
	Cmd_ExecuteString('bind 2 "weapon 2"');
	Cmd_ExecuteString('bind 3 "weapon 3"');
	Cmd_ExecuteString('bind 4 "weapon 4"');
	Cmd_ExecuteString('bind 5 "weapon 5"');
	Cmd_ExecuteString('bind 6 "weapon 6"');
	Cmd_ExecuteString('bind 7 "weapon 7"');
	Cmd_ExecuteString('bind 8 "weapon 8"');
	Cmd_ExecuteString('bind 9 "weapon 9"');
	Cmd_ExecuteString('bind = "sizeup"');
	Cmd_ExecuteString('bind [ "weapprev"');
	Cmd_ExecuteString('bind \ "+mlook"');
	Cmd_ExecuteString('bind ] "weapnext"');
	Cmd_ExecuteString('bind _ "sizedown"');
	Cmd_ExecuteString('bind a "+moveleft"');
	Cmd_ExecuteString('bind c "+movedown"');
	Cmd_ExecuteString('bind d "+moveright"');
	Cmd_ExecuteString('bind s "+back"');
	Cmd_ExecuteString('bind t "messagemode"');
	Cmd_ExecuteString('bind w "+forward"');
	Cmd_ExecuteString('bind PAUSE "pause"');
	Cmd_ExecuteString('bind UPARROW "+lookup"');
	Cmd_ExecuteString('bind DOWNARROW "+lookdown"');
	Cmd_ExecuteString('bind LEFTARROW "+left"');
	Cmd_ExecuteString('bind RIGHTARROW "+right"');
	Cmd_ExecuteString('bind ALT "+strafe"');
	Cmd_ExecuteString('bind CTRL "+attack"');
	Cmd_ExecuteString('bind SHIFT "+speed"');
	Cmd_ExecuteString('bind DEL "+lookdown"');
	Cmd_ExecuteString('bind PGDN "+lookup"');
	Cmd_ExecuteString('bind END "centerview"');
	Cmd_ExecuteString('bind F1 "toggleconsole"');
	Cmd_ExecuteString('bind F3 "vote yes"');
	Cmd_ExecuteString('bind F4 "vote no"');
	Cmd_ExecuteString('bind F5 "addbot"');
	Cmd_ExecuteString('bind F6 "toggle cg_thirdperson"');
	Cmd_ExecuteString('bind F7 "give all"');
	Cmd_ExecuteString('bind F8 "kill"');
	Cmd_ExecuteString('bind F9 "screenshot"');
	Cmd_ExecuteString('bind g noclip');
	Cmd_ExecuteString('bind h respawn');
	Cmd_ExecuteString('bind MOUSE1 "+attack"');
	Cmd_ExecuteString('bind MOUSE2 "+zoom;+button12" // BUTTON_AIM');
	Cmd_ExecuteString('bind MOUSE3 "+button13" // BUTTON_NADE');
	Cmd_ExecuteString('bind MWHEELDOWN "weapprev"');
	Cmd_ExecuteString('bind MWHEELUP "weapnext"');
}