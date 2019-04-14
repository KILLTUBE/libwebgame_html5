/**
 * @constructor
 * @param {number} left_ 
 * @param {number} top_ 
 * @param {number} fontsize_ 
 * @param {boolean} glow_ 
 */

var AnimatedHistoryText = function(left_, top_, fontsize_, glow_) {
	this.left = left_;
	this.top = top_;
	this.fontsize = fontsize_;
	this.glow = glow_;
	this.textlines = [];
}

/**
 * @param {string} text
 */

AnimatedHistoryText.prototype.addText = function(text) {
	this.textlines.push( new TextLine(text, this.fontsize, this.glow) )
	if (this.textlines.length > 6) { // remove oldest TextLine when reaching limit
		this.textlines[0].destroy();
		this.textlines.shift()
	}
}

AnimatedHistoryText.prototype.update = function() {
	var gt = gametime()
	var deltaTop = 0; // 0 alpha = deltaTop=0, but 1 alpha = 40 deltaTop, so elements go up when fading out and let the others replace them
	var belowNormal = 40
	var first = true;
	var counter = 0;
	for (var i=this.textlines.length - 1; i>=0; i--) {
		var textline = this.textlines[i]
		var displayedTime = gt - textline.time;
		
		if (displayedTime > 2000)
			textline.dispose = true;
		if (displayedTime > 1000)
			textline.fadeOut(1);
		if (displayedTime > 2000)
			textline.dispose = true; // mark for destruction when outside of loop
		//	textline.destroy();
		//}
		
		/*
		// if displayedTime goes over 1, start to fade out from 1 to 2, interval from alpha 1 to 0
		alpha = 1; // full color
		overtime = displayedTime - 1000
		if (overtime > 0) {
			// overtime 0 = alpha 1
			// overtime 1000 = alpha 0
			alpha = 1 - (overtime / 1000)
		}
		*/
		
		/*
		// time under 1 second is considered new, so it is still "sliding in"
		slideIn = 0
		if (displayedTime <= 1000) {
			// slideIn == 0, no slide at all
			// slideIn == 1, fully slide it, that means, it has replaced the previous text
			slideIn = displayedTime / 1000
			// if the textline is new, consider it below the normal y offset
			belowNormal += slideIn * 40;
			if (first) {
				//belowNormal -= 40;
				first = false;
			}
			
			//renderText(textline.text + " time: " + displayedTime, 320, (400 - (counter * 40)) - belowNormal, alpha)
		}
		*/
		
		textline.setPosition(this.left, (this.top - (counter * 18)))
		counter++;
	}
	if (this.textlines.length > 0) {
		if (this.textlines[0].dispose) {
			this.textlines[0].destroy()
			this.textlines.shift()
		}
	}
}