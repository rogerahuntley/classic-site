	var passwords = [
		{code: "debugmode", activates:"Debug Mode", complete: 0
	}];
	
	//checks what the player is typing against the special function database
	var cheatCheck = function(){
		for(var i = 0; i < passwords.length; i++) {
    	pass_code = passwords[i].code;
    	characters_complete = passwords[i].complete;
    	if(pass_code.charAt(characters_complete) === String.fromCharCode(currentletter).toLowerCase()){
    		passwords[i].complete++;
    		if(passwords[i].complete === passwords[i].code.length){
      		if(debug===true) {
      			debug = false;
      		}
      		else {
      				debug = true;
      		}
      		passwords[i].complete = 0;
    		}
    	}
    	else{
      	passwords[i].complete = 0;
    	}
		}
	};