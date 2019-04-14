
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

// game.js
declare var windowmode: any;
declare var gametime: any;
declare var width: any;
declare var height: any;
declare var WindowMode_Small: any;
declare var WindowMode_FullWindow: any;
declare var WindowMode_FullScreen: any;
declare var fullwindow: any;
declare var ticks: any;
declare var myrun: any;
declare var mainloop: any;
declare var fixCanvasSizes: (width: number, height: number) => void;
declare var dim: any;
declare var fullscreenchange: any;
declare var isFullscreen: any;
declare var resize: any;
declare var addressToString: any;
declare var addressToString: any;
declare var addressToString: any;

// index.js
declare var url: string;
declare var whenReadyCallbacks: [];
declare var globals: {};
declare var globals_pc: {};
declare var debugKeys: boolean;
declare var downloads: [];
declare var NULL: number;
declare var ws_url: string;
declare var ws_debug: boolean;
declare var starttime: number;
declare var showQuake: boolean;
declare var cached: {};
declare var mailas: [];
declare var skeletons: [];
declare var refents: {};
declare var trmodels: [];
declare var trmodelsMap: {};
declare var globalDisableCount: number;
declare var globalEnabledCount: number;
declare var cache_kungmesh: {};
declare var fetch_script: any;
declare var reload: any;
declare var fetch_emscripten: any;
declare var fetch_libwebgame: any;