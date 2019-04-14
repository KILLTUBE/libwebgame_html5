
// pc_idtech3.js

declare var set_frame: any;
declare var find_oneframer: any;
declare var init_idtech3: any;
declare var RE_AddRefEntityToScene: any;
declare var RE_RegisterModel_callback: any;
declare var RE_BeginFrame_callback: any;
declare var RE_EndFrame_callback: any;
declare var set_dir: any;
declare var CG_Bullet: any;
declare var CM_LoadMap_callback: any;
declare var CM_LoadMap_async: any;
declare var precacheSound: any;

// emcc.js
declare var file_get_contents: any;
declare var Com_Init: any;
declare var Cmd_ExecuteString: any;
declare var alloc_string: any;
declare var addressToString: any;

// AnimatedHistoryText.js

declare interface AnimatedHistoryText {
	textlines: TextLine[];
}

// TextLine.js


declare interface TextLine {
	dispose: boolean;
	time: number;
}