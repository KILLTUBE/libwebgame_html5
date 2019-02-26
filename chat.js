cg_servercommand_chat = function(textaddr) {
	var text = addressToString(textaddr)
	//console.log("cg_servercommand_chat", text)
	//aht_chat.addText(text)
	addChat(text)
}

cg_servercommand_teamchat = function(textaddr) {
	var text = addressToString(textaddr)
	//console.log("cg_servercommand_teamchat", text)
	//aht_teamchat.addText(text)
	addChat("teamchat> " + text)
}

cg_servercommand_print = function(textaddr) {
	var text = addressToString(textaddr)
	//console.log("cg_servercommand_print", text)
	aht_print.addText(text)
}

cg_servercommand_centerprint = function(textaddr) {
	var text = addressToString(textaddr)
	//console.log("cg_servercommand_centerprint", text)
	aht_centerprint.addText(text)
}

colorize = function($name) {
	$name = '<font class="colorcode_7">' + $name; // white by default
	$name = str_replace('^0', '<\/font><font class="colorcode_0">', $name);
	$name = str_replace('^1', '<\/font><font class="colorcode_1">', $name);
	$name = str_replace('^2', '<\/font><font class="colorcode_2">', $name);
	$name = str_replace('^3', '<\/font><font class="colorcode_3">', $name);
	$name = str_replace('^4', '<\/font><font class="colorcode_4">', $name);
	$name = str_replace('^5', '<\/font><font class="colorcode_5">', $name);
	$name = str_replace('^6', '<\/font><font class="colorcode_6">', $name);
	$name = str_replace('^7', '<\/font><font class="colorcode_7">', $name);
	$name = str_replace('^8', '<\/font><font class="colorcode_8">', $name);
	$name = str_replace('^9', '<\/font><font class="colorcode_9">', $name);
	$name += "<\/font>";
	return $name;
}
		
str_replace = function(search, replace, subject, count) {
var i = 0,
j = 0,
temp = '',
repl = '',
sl = 0,        fl = 0,
f = [].concat(search),
r = [].concat(replace),
s = subject,
ra = Object.prototype.toString.call(r) === '[object Array]',        sa = Object.prototype.toString.call(s) === '[object Array]';
s = [].concat(s);
if (count) {
this.window[count] = 0;
} 
for (i = 0, sl = s.length; i < sl; i++) {
if (s[i] === '') {
continue;
}        for (j = 0, fl = f.length; j < fl; j++) {
temp = s[i] + '';
repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
s[i] = (temp).split(f[j]).join(repl);
if (count && s[i] !== temp) {                this.window[count] += (temp.length - s[i].length) / f[j].length;
}
}
}
return sa ? s : s[0];
}

emojify = function(str) {
	str = str_replace(':poop:'    , "<div class=emoji>\uD83D\uDCA9</div>", str);
	str = str_replace(':D'        , "<div class=emoji>\uD83D\uDE04</div>", str);
	str = str_replace(':drooling:', "<div class=emoji>\uD83E\uDD24</div>", str);
	str = str_replace(':eyes:'    , "<div class=emoji>\uD83D\uDC40</div>", str);
    return str;
}

htmlspecialchars = function(str) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function(m) {return map[m];});
}

chat_add_html = function(html) {
	var td = document.createElement("td");
	var tr = document.createElement("tr");
	td.innerHTML = html;
	tr.appendChild(td);
	document.getElementById("chattable").appendChild(tr);
}

addChat = function(text) {
	text = htmlspecialchars(text); // make sure a player cant write xss attacks
	text = emojify(text);
	text = colorize(text); // turn ^1 into <red> etc.
	chat_add_html(text);
	//chatdiv.scrollTop = chatdiv.scrollHeight // is 0 when chatdiv is hidden, so it fails
	chatdiv.scrollTop = 99999999999 // should add a button to disable force-scrolling to end on a message...
}

chatHide   = function() { chat.style.display = "none";  }
chatShow   = function() { chat.style.display = "block"; }
isChatOpen = function() { return chat.style.display == "block"; }

chatinput_onkeydown = function(e) {
	// text be like "hi all!" or "/giveall"
	const text = chatinput.value;
	
	if (e.key == "Enter") {
		//console.log("Chat: ", chatinput.value);
		//addChat(chatinput.value);
		if (text[0] == "/" || text[0] == "\\") {
			const puretext = text.substr(1); // remove \ or /
			Cmd_ExecuteString(puretext);
		} else {
			//Cmd_ExecuteString("say " + text);
			socket.emit("msg", text);
		}
		chatinput.value = "";
		//chatHide(); // todo: might make sense to fade out the chat like 20s after
		hookKeyEvents(); // back to game, press "t" again to chat further
	}
}

chat_init = function() {
	chatdiv = document.getElementById("chatdiv")
	chatinput = document.getElementById("chatinput")	
	chatinput.onkeydown = function(e) {
		chatinput_onkeydown(e);
	}

	chat.onclick = function(e) {
		console.log("chatinput.onclick");
		document.onkeydown = null;
		document.onkeyup = null;
		e.preventDefault();
	}
	
	chat_close = document.createElement("button");
	chat_close.innerText = "[X]";
	chat.appendChild(chat_close);
	chat_close.style.position = "absolute";
	chat_close.style.top = "10px";
	chat_close.style.right = "10px";
	chat_close.onclick = function(e) {
		chatHide();
		hookKeyEvents();
	}
	
	chatHide();
}

chat_open_and_focus = function() {
	chatShow();
	chatinput.focus();
	unhookKeyEvents();
	chatdiv.scrollTop = chatdiv.scrollHeight; // scroll to latest messages	
}