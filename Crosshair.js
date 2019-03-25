/**
 * @constructor
 */

Crosshair = function() {
	this.element = document.createElement("img");
	this.element.onload = function() {
		this.center();
	}.bind(this);
	this.element.src = url + "crosshair.png";
	this.element.style.position = "absolute";
	//this.element.style.zIndex = 2222222;
	document.body.appendChild(this.element);
}

Crosshair.prototype.setState = function(state) {
	if (state) {
		this.element.style.display = "";
	} else {
		this.element.style.display = "none";
	}
}

Crosshair.prototype.center = function() {
	var padding_left = (window.innerWidth - this.element.width) / 2;
	var padding_top = (window.innerHeight - this.element.height) / 2;
	this.element.style.left = padding_left + "px";
	this.element.style.top = padding_top + "px";
}