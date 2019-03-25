/**
 * @constructor
 */

function Overlay() {
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
	this.element.style.zIndex = 10; // on top of everything else
	this.element.oncontextmenu = function(e) {
		console.log("overlay.element.oncontextmenu");
		e.preventDefault();
	}
	document.body.appendChild(this.element);
	this.resize(); // force resize atleast once to set width/height
	window.addEventListener('resize', function () {
		this.resize();
	}.bind(this));
}

Overlay.prototype.resize = function() {
	this.element.style.width = window.innerWidth + "px";
	this.element.style.height = window.innerHeight + "px";
}
