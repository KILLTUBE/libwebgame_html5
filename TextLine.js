/**
 * @constructor
 * @param {string} text 
 * @param {number} fontsize 
 * @param {boolean} glow 
 */

var TextLine = function(text, fontsize, glow) {
	this.text = text;
	this.time = gametime();
	this.dispose = false;
	this.element = document.createElement("div")
	this.element.innerText = text;
	this.element.style.position = "absolute";
	this.element.style.fontSize = fontsize + "px";
	this.element.style.fontFamily = "Arial";
	this.element.style.fontWeight = "bold";
	//this.element.style.color = "rgba(255,255,255,0.9)"
	
	if (glow) {
		this.element.style.color = "white"
		this.element.style.textShadow = "0px 0px 20px #000"
	} else {
		this.element.style.color = "black"		
	}
	//this.measuredWidth = ctx.measureText("text").width; // completly out of touch with reality
	this.measuredWidth = text.length * fontsize/2; // really nice approximation, 36 is font size
	document.body.appendChild(this.element)
	this.fadingOut = false;
}

TextLine.prototype.destroy = function() {
	document.body.removeChild( this.element );
}

/**
 * @param {number} left_
 * @param {number} top_
 */

TextLine.prototype.setPosition = function(left_, top_) {
	var scaleLeft = window.innerWidth / 640;
	var scaleTop = window.innerHeight / 480;

	//left_ *= scaleX;
	//top_ *= scaleY;

	var blaLeft = left_ * scaleLeft;
	if (left_ == -1) {
		blaLeft = (window.innerWidth - this.measuredWidth) / 2
	}
	
	//centerLeft = this.measuredWidth;
	//centerLeft *= scaleX;

	this.element.style.left = blaLeft+ "px";
	this.element.style.top = top_ * scaleTop  + "px";
}

/**
 * @param {number} seconds
 */

TextLine.prototype.fadeOut = function(seconds) {
	if (this.fadingOut)
		return;
	this.element.style.transition = "opacity " + seconds + "s linear"
	this.element.style.opacity = "0";
}
