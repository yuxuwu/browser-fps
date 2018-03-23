var Raycaster = {

    castRays : function() {


        /**********************************************
         *              Helper Methods
         *********************************************/
        function castSingleRay(rayAngle, stripNum) {


            function drawRay(ray_x, ray_y, p_x, p_y){
                var minimap = document.getElementById("minimap");
                var ctx = minimap.getContext("2d");

                ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p_x*MiniMapScale, p_y*MiniMapScale);
                ctx.lineTo(ray_x*MiniMapScale, ray_y*MiniMapScale);
                ctx.closePath();
                ctx.stroke();
            }


            let twoPI = Math.PI * 2;

            var previous_x = 0;

            // first make sure the angle is between 0 and 360 degrees
            rayAngle %= twoPI;
            if (rayAngle < 0) rayAngle += twoPI;

            // moving right/left? up/down? Determined by which quadrant the angle is in.
            var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
            var up = (rayAngle < 0 || rayAngle > Math.PI);

            // only do these once
            var angleSin = Math.sin(rayAngle);
            var angleCos = Math.cos(rayAngle);


            var dist = 0;   // the distance to the block we hit
            var xHit = 0;   // the x and y coord of where the ray hit the block
            var yHit = 0;

            var textureX;   // the x-coord on the texture of the block, ie. what part of the texture are we going to render
            var wallX;  // the (x,y) Map coords of the block
            var wallY;

            var textureType = 0; //type of texture

            // first check against the vertical Map/wall lines
            // we do this by moving to the right or left edge of the block we're standing in
            // and then moving in 1 Map unit steps horizontally. The amount we have to move vertically
            // is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).

            var slope = angleSin / angleCos; 	// the slope of the straight line made by the ray
            var dX = right ? 1 : -1;    // we move either 1 Map unit to the left or right
            var dY = dX * slope;    // how much to move up or down

            var x = right ? Math.ceil(player.x) : Math.floor(player.x);	// starting horizontal position, at one of the edges of the current Map block
            var y = player.y + (x - player.x) * slope;  // starting vertical position. We add the small horizontal step we just made, multiplied by the slope.

            while (x >= 0 && x < MapWidth && y >= 0 && y < MapHeight) {
                var wallX = Math.floor(x + (right ? 0 : -1));
                var wallY = Math.floor(y);

                // is this point inside a wall block?
                if (Map[wallY][wallX] > 0) {

                    var distX = x - player.x;
                    var distY = y - player.y;
                    dist = distX*distX + distY*distY;   // the distance from the player to this point, squared.

                    textureX = y % 1;   // where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use when texturing the wall.
                    if (!right) textureX = 1 - textureX; // if we're looking to the left side of the Map, the texture should be reversed

                    xHit = x;   // save the coordinates of the hit. We only really use these to draw the rays on miniMap.
                    yHit = y;

                    textureType = Map[wallY][wallX];

                    break;
                }
                x += dX;
                y += dY;
            }



            // now check against horizontal lines. It's basically the same, just "turned around".
            // the only difference here is that once we hit a Map block, 
            // we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
            // If so, we only register this hit if this distance is smaller.

            var slope = angleCos / angleSin;
            var dY = up ? -1 : 1;
            var dX = dY * slope;
            var y = up ? Math.floor(player.y) : Math.ceil(player.y);
            var x = player.x + (y - player.y) * slope;

            while (x >= 0 && x < MapWidth && y >= 0 && y < MapHeight) {
                var wallY = Math.floor(y + (up ? -1 : 0));
                var wallX = Math.floor(x);
                if (Map[wallY][wallX] > 0) {
                    var distX = x - player.x;
                    var distY = y - player.y;
                    var blockDist = distX*distX + distY*distY;
                    if (!dist || blockDist < dist) {
                        dist = blockDist;
                        xHit = x;
                        yHit = y;
                        textureX = x % 1;
                        textureType = Map[wallY][wallX];
                        if (up) textureX = 1 - textureX;
                    }
                    break;
                }
                x += dX;
                y += dY;
            }

            if (dist) {
                dist = Math.sqrt(dist);

                var num_blocks = (Math.atan(FOV)*dist)/2;
                var strip_width = Texture.width/num_blocks;
                var start_x = previous_x;
                previous_x = (previous_x + strip_width) % Texture.width;

                Strips[stripNum] =
                {
                    //height: ((ScreenHeight/dist)*ViewDist),
                    height: Math.round(ViewDist/dist),
                    texture_x: textureX,
                    texture_type: textureType,
                    strip_width: strip_width,
                    start_x: start_x,
                    dark: (yHit % 1 == 0 ? true:false)
                };
                drawRay(xHit, yHit, player.x, player.y);
            }
        }
        /*********************************************************/


        for(let i = 0; i < NumStrips; i++){
            var ray_screen_pos = (-NumStrips/2 + i) * StripWidth;
            var ray_view_dist = Math.sqrt(ray_screen_pos*ray_screen_pos + ViewDist*ViewDist);
            var ray_angle = Math.asin(ray_screen_pos / ray_view_dist);

            castSingleRay(player.rot+ray_angle, i);

        }


    },

}
