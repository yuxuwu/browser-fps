var Minimap = {
	draw : function() {
		//Draw topdown view of minimap
		var miniMap = document.getElementById("minimap");
		//Resize the internal canvas dimensions
		miniMap.width = MapWidth * MiniMapScale;
		miniMap.height = MapHeight * MiniMapScale;
		//Reize the canvas CSS dimensions
		miniMap.style.width = (MapWidth * MiniMapScale) + "px";
		miniMap.style.height = (MapHeight * MiniMapScale) + "px";

		//Loop through all blocks on the map
		var ctx = miniMap.getContext("2d");
		for(let y = 0; y < MapHeight; y++){
			for(let x = 0; x < MapWidth; x++){
				//If there is a wall block at this (x,y)...
				if(Map[y][x] > 0) {
					ctx.fillStyle = "rgb(200, 200, 200)"; //Set draw color
					ctx.fillRect(x * MiniMapScale, y * MiniMapScale, MiniMapScale, MiniMapScale);
				}
			}
		}

		//Actual draw location of player should be modified by scaling factor
		var actualPlayerX = player.x*MiniMapScale-2;
		var actualPlayerY = player.y*MiniMapScale-2;

		//Draw player
		ctx.fillStyle = "rgb(100, 100, 0)";
		ctx.fillRect(actualPlayerX, actualPlayerY, MiniMapScale/2, MiniMapScale/2);
	}
}

var Screen = {
	draw : function() {
		var screen_canvas = document.getElementById("screen-canvas");
		var ctx = screen_canvas.getContext("2d");
		//Resize the internal canvas dimensions
		screen_canvas.width = ScreenWidth * ScreenScale;
		screen_canvas.height = ScreenHeight * ScreenScale;
		//Reize the canvas CSS dimensions
		screen_canvas.style.width = (ScreenWidth * ScreenScale) + "px";
		screen_canvas.style.height = (ScreenHeight * ScreenScale) + "px";


		var scaled_width = StripWidth*ScreenScale;
		var half_screen_height = ScreenHeight/2*ScreenScale;
		for(let i = 0; i < Strips.length; i++) {
			var half_strip_height = Strips[i].height/2*ScreenScale;

			var x_position = i*StripWidth*ScreenScale;
			var top_bot_height = half_screen_height-half_strip_height;

			//Middle
			if(Strips[i].texture_type != 1){
				if(Strips[i].dark)
					ctx.fillStyle = "rgb(255, 0, 0)";
				else
					ctx.fillStyle = "rgb(122, 0, 0)";
				ctx.fillRect(x_position, half_screen_height-half_strip_height, scaled_width, Strips[i].height*ScreenScale);
			} else {
				// drawImage(image, source_x, source_y, source_width, source_height, canvas_x, canvas_y, canvas_width, canvas_height); will resize image if canvas widtha and height given
				var texture_x = Math.floor(Strips[i].texture_x*Texture.width); // floor to optimize values
				ctx.drawImage(Texture.image, texture_x, 0, 1, Texture.height, x_position, half_screen_height-half_strip_height, scaled_width, Strips[i].height*ScreenScale);
			}

			ctx.fillStyle = "rgb(0, 0, 0)";
			//Top third
			ctx.fillRect(x_position, 0, scaled_width, top_bot_height);
			//Bottom third
			ctx.fillRect(x_position, half_screen_height+half_strip_height, scaled_width, top_bot_height);
		}
	}
}
