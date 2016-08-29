	var hero = {
		x:300,
		y:300
	}

	var enemies1 = [{x:50,y:50},{x:250,y:50},{x:450,y:50},{x:50,y:250},{x:50,y:450},{x:350,y:350},{x:500,y:500}];

	var enemies2 = [{x:40,y:150},{x:450,y:100},{x:150,y:250},{x:200,y:200}];

	var bullets = [];

	var score = 0;

	function displayHero(){
		document.getElementById('hero').style['top']= hero.y + "px";
		document.getElementById('hero').style['left']= hero.x + "px";
	}

	function displayEnemies(){
		var output = '';
		for(var i = 0; i <enemies1.length; i++)
		{
			output += "<div class='enemy1' style='top:"+enemies1[i].y+"px; left:"+enemies1[i].x+"px;'></div>";
		}
		document.getElementById('enemies1').innerHTML = output;
	}

	function displayEnemies2(){
		var output2 = '';
		for(var i = 0; i < enemies2.length; i++)
		{
			output2 += "<div class='enemy2' style='top:"+enemies2[i].y+"px; left:"+enemies2[i].x+"px;'></div>";
		}
		document.getElementById('enemies2').innerHTML = output2;
	}	



	function moveEnemies(){
		for(var i = 0; i <enemies1.length; i++){
			enemies1[i].y += 5;
			if(enemies1[i].y > 540)
			{
				enemies1[i].y = 0;
				enemies1[i].x = Math.random()*500;
			}
		}		
	}

	function moveEnemies2(){
		for(var i = 0; i <enemies2.length; i++){
			enemies2[i].y += 5;
			if(enemies2[i].y > 540)
			{
				enemies2[i].y = 0;
				enemies2[i].x = Math.random()*500;
			}
		}
	}

	function displayBullets(){
		var output = '';
		for(var i = 0; i <bullets.length; i++){
			output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>"
		}
		document.getElementById('bullets').innerHTML = output;		
	}

	function moveBullets(){
		for(var i = 0; i <bullets.length; i++){
			bullets[i].y -= 5;
			if(bullets[i].y < 0)
			{
				bullets[i] = bullets[bullets.length-1];
				bullets.pop();
			}
		}
	}	

	function gameLoop(){
		displayHero();
		moveEnemies();
		displayEnemies();
		moveEnemies2();
		displayEnemies2();
		moveBullets();	
		displayBullets();
		detectCollision();
	}

	function detectCollision(){
		for(var i = 0; i <bullets.length; i++)
		{
			for(var j = 0; j <enemies1.length; j++)
			{
				if(Math.abs(bullets[i].x - enemies1[j].x) < 10 && Math.abs(bullets[i].y - enemies1[j].y) < 10)
				{
					score += 10;
				}
				document.getElementById('score').innerHTML = 'Score:' + score;
			}
		}

		for(var i = 0; i <bullets.length; i++)
		{
			for(var j = 0; j <enemies2.length; j++)
			{
				if(Math.abs(bullets[i].x - enemies2[j].x) < 10 && Math.abs(bullets[i].y - enemies2[j].y) < 10)
				{
					score += 10;
				}
				document.getElementById('score').innerHTML = 'Score:' + score;
			}
		}

		for(var j = 0; j <enemies1.length; j++)
		{
			if(Math.abs(hero.x - enemies1[j].x) < 5 && Math.abs(hero.y - enemies1[j].y) < 5)
			{
				score -= 500;
			}
			document.getElementById('score').innerHTML = 'Score:' + score;
		}	

		for(var j = 0; j <enemies2.length; j++)
		{
			if(Math.abs(hero.x - enemies2[j].x) < 10 && Math.abs(hero.y - enemies2[j].y) < 10)
			{
				score -= 500;
			}
			document.getElementById('score').innerHTML = 'Score:' + score;
		}			
	}

	setInterval(gameLoop,50);

	document.onkeydown = function(a){
		
		if(a.keyCode == 37)
		{
			hero.x -= 10;
		}
		else if(a.keyCode == 39)
		{
			hero.x += 10;
		}
		else if(a.keyCode == 38)
		{
			hero.y -= 10;
		}
		else if(a.keyCode == 40)
		{
			hero.y += 10;
		}
		else if(a.keyCode == 32)
		{
			bullets.push({x:hero.x+8,y:hero.y-15});
		}
	}

	displayHero();
	displayEnemies();