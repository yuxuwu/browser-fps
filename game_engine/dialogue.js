var Dialogue = {

	cycle: function (text) {
		var textBox = document.getElementById("screen-dialogue");
		textBox.width = ScreenWidth * ScreenScale;
		textBox.height = ScreenHeight * ScreenScale;
		textBox.style.width = (ScreenWidth * ScreenScale) + "px";
		textBox.style.height = (ScreenHeight * ScreenScale) + "px";
		var textBoxtx = textBox.getContext("2d");

	//	textBoxtx.beginPath();
	//	textBoxtx.rect(0,0 ,1000,1000);
		textBoxtx.fillStyle = "gray";
		textBoxtx.fillRect(0,(ScreenHeight * ScreenScale) * (1-.3),ScreenWidth * ScreenScale,(ScreenHeight * ScreenScale) * .3);

		textBoxtx.font = "20px Arial";
		textBoxtx.fillStyle = "black";
		var offset = 0.00;
		var count = 0;
		var endText;
		var beginText = text;
		console.log(text.substr(5));
		if(text.length > 57){
			while(count <= text.length) {
				if( (count % 57) == 0){		
					endText = beginText.substr(57);
					beginText = beginText.slice(0,57);	
					textBoxtx.fillText(beginText,0,( ScreenHeight * ScreenScale) * (1-.25+offset) );
					offset = offset + 0.04;
					beginText = endText;
				}
				
				count++;
			}
		}
		else{
			textBoxtx.fillText(text,0,( ScreenHeight * ScreenScale) * (1-.25) );
		}
		if(beginText.length > 0){
			textBoxtx.fillText(beginText,0,( ScreenHeight * ScreenScale) * (1-.25+offset) );
		}
	},
}
