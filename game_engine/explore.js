var Explore = {

    init : function(){
        this.bindKeys();
    },

    cycle : function(){
        this.move();
    },

    bindKeys : function(){
        document.onkeydown = function(e) {
            e = e || window.event;
            e.preventDefault(); //prevent default scrolling
            switch(e.keyCode) {
                case 38: //Up
                    player.speed = 1;
                    break;
                case 40: //Down
                    player.speed = -1;
                    break;
                case 37: //Left
                    player.dir = -1;
                    break;
                case 39: //Right
                    player.dir = 1;
                    break;
				case 69: //e
					var text = "Hello World";
					Dialogue.cycle(text);
					break;
            }
        }

        document.onkeyup = function(e) {
            e = e || window.event;
            switch(e.keyCode){
                case 38:
                case 40:
                    player.speed = 0;
                    break;
                case 37:
                case 39:
                    player.dir = 0;
                    break;
            }
        }
    },

    move : function(){
        var moveStep = player.speed * player.moveRate; //determines how far player should move
        player.rot += player.dir * player.rotRate; //rotation modified by direction

        // Calculate new x, y pos of player with trig
        var newX = player.x + Math.cos(player.rot) * moveStep; //Cos gets the x value of rotation, which determines how far along the x axix moveStep should being modified
        var newY = player.y + Math.sin(player.rot) * moveStep;

        // Check if new x, y is out of bounds
        if (newY < 0 || newY >= MapHeight*MiniMapScale || newX < 0 || newX >= MapWidth*MiniMapScale) {
            console.log(newX + " " + newY);
            return;
        }

        // Check if new x, y is occupying a wall
        // Use both ceil and floor to consider both ends of the walls
        if(Map[Math.floor(newY)][Math.floor(newX)] != 0){
            return;
        }

        // Set new position
        player.x = newX;
        player.y = newY;
    }
}
