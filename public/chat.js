window.onload = function() {

	var messages = [];
	var socket = io.connect('http://hh0487.hhi.net.au:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++) {
				console.log(messages[i]);
				html += '<p><span class="label" style="background-color:'+messages[i].color+';">' + (messages[i].username ? messages[i].username : 'Server') + ': </span> ';
				html += messages[i].message + '</p>';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = sendMessage = function() {
		if(name.value == "") {
			alert("Please type your name!");
		} else if (hex.value == ""){
			alert("Please add a hex colour.");			
		} else {
			var text = field.value;
			socket.emit('send', { 
				message: text,
				color: hex.value,
				username: name.value
			});
			field.value = "";
		}
	};

	$("#field").keyup(function(e) {
		if(e.keyCode == 13) {
			if(name.value == "") {
				alert("Please type your name!");
			} else if (hex.value == ""){
				alert("Please add a hex colour.");			
			} else {
				var text = field.value;
				socket.emit('send', { 
					message: text,
					color: hex.value,
					username: name.value
				});
				field.value = "";
			}
		}
	});
}
