copyMeIntoClipboard = "";

copy_to_clipboard = function(textaddress) {
	try {
		var text = addressToString(textaddress);
		//console.log("copy_to_clipboard...", text);
		// copyToClipboard(text) doesnt work here, because WebAssembly is in the wrong security context
		// so I just check "copyMeIntoClipboard.length != 0" in the keyup event
		copyMeIntoClipboard = text;
	} catch (e) {
		console.log("copy_to_clipboard", e)
	}
}

// Copies a string to the clipboard. Must be called from within an 
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+, 
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is 
// used (per session).
copyToClipboard = function(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

clipboard_c = 0;
document.onpaste = function(e) {
	//console.log("onpaste");
	var pasted = e.clipboardData.getData('Text');
	if (clipboard_c != 0)
		_free(clipboard_c);
	clipboard_c = alloc_string(pasted)
	_set_clipboard_text(clipboard_c);
}