Script = function() {}
Script.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.onload = function() {
			resolve(script)
		}
		script.src = url/* + "?now=" + Date.now()*/;
		document.head.appendChild(script)
	})
}

JSON.fetch = async function(url) {
	const request = await fetch(url);
	return request.json();
}

reload = async function() {
	console.log("<reload>");
	const filedates = await JSON.fetch("filedates.php");
	const files = [];
	for (const filedate of filedates) {
		var name = filedate["name"];
		var date = filedate["date"];
		const script = Script.fetch(name + "?date=" + date);
		files.push(script);
	}
	await Promise.all(files);
	console.log("</reload>");
}

load_scripts = async function() {
	//await Script.fetch("glmw-browser.js");
	//await glmw.init()
	await Script.fetch("jquery-3.2.1.min.js");
	await Script.fetch("jquery.fullscreen.js");
	//await Script.fetch("playcanvas/playcanvas-1-6.js");
	//await Script.fetch("playcanvas/playcanvas-1-7.js");
	//await Script.fetch("playcanvas/playcanvas-1-8-1.js");
	await Script.fetch("playcanvas/playcanvas-1-10-0.js");
	await Script.fetch("playcanvas/playcanvas-anim.js");
	//await Script.fetch("playcanvas/playcanvas-anim-extra.js"); // depends on playcanvas-anim.js, so cant load the extra file in mixed order atm
	//await Script.fetch("playcanvas/playcanvas-anim.js");
	//await Script.fetch("playcanvas/playcanvas-gltf.js");
	await reload()

}

load_scripts().then(function() {
	//main()

	// pc_maila_anim.js
	//init_pc_maila_anim()
	init_socket_io();
})