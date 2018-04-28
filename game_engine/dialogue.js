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
		textBoxtx.fillText(text,0,( ScreenHeight * ScreenScale) * (1-.25) );
	
	},
}
