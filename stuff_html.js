
// replace with async HTMLScriptElement.fetch(...)
loadscript = function(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.onload = callback;
	script.crossOrigin = "anonymous";
	document.getElementsByTagName("head")[0].appendChild(script);
}
