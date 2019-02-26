

//callback_repl = function(selection_start, selection_end, replbuffer_) {
//	var code = addressToString(replbuffer_);
//	//console.log(code);
//	try {
//		if (selection_start != selection_end) {
//			if (selection_start > selection_end) {
//				code = code.substr(selection_end, selection_start - selection_end);
//			} else {
//				code = code.substr(selection_start, selection_end - selection_start);
//			}
//		}
//		//log("selection_start: ", selection_start, "selection_end: ", selection_end, "code: ", code);
//		ans = eval(code);
//		//log(util.inspect(ans));
//		//console.log(ans);
//		console.log(ans);
//		console.log("\n");
//	} catch (e) {
//		//try {
//			//log("eval exception: ", util.inspect(e));
//			console.log("eval exception: ", e);
//			console.log(String(e))
//			console.log("\n");
//		//} catch (e) {
//		//	console.log("even fuckin util.inspect(e) fails\n");
//		//}
//	}
//	fixGlobals();
//}

getLineStartFromPos = function(str, pos) {
	var i = pos-1;
	for (; i>=0; i--) {
		if (str[i] == "\n" || str[i] == "\r")
			return i + 1;
		//log("i=" + i)
	}
	return i + 1;
}

getLineEndFromPos = function(str, pos) {
	var i = pos;
	for (; i<str.length; i++) {
		if (str[i] == "\n" || str[i] == "\r")
			return i;
		//log("i=" + i)
	}
	return i;
}

callback_repl_alt_enter = function(selection_start, selection_end, replbuffer_) {
	var code = addressToString(replbuffer_);
	//console.log(arguments);
	
	try {
		var startPos = getLineStartFromPos(code, selection_start)
		var endPos = getLineEndFromPos(code, selection_start)
		//console.log("startPos", startPos, "endpos", endPos);
		code = code.substring(startPos, endPos);
		
		//log("selection_start: ", selection_start, "selection_end: ", selection_end, "code: ", code);
		ans = eval(code);
		//log(util.inspect(ans));
		//console.log(ans);
		log(ans);
		log("\n");
	} catch (e) {
		//try {
			//log("eval exception: ", util.inspect(e));
			console.log("eval exception: ", e);
			log(String(e))
			log("\n");
		//} catch (e) {
		//	console.log("even fuckin util.inspect(e) fails\n");
		//}
	}	
	fixGlobals();
}