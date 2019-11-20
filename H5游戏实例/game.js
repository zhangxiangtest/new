//创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var xingtai="小形态";
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//背景图像
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//英雄图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};

heroImage.src = "images/xiao1.png";

var heroImage1 = new Image();
heroImage1.src = "images/xiao1.png";

var heroImage2 = new Image();
heroImage2.src = "images/xiao2.png";

var heroImage3 = new Image();
heroImage3.src = "images/xiao3.png";

var heroImage4 = new Image();
heroImage4.src = "images/xiao4.png";

//怪物形象
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/book.png";

var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
monsterImage2.src = "images/zd.png";



//游戏对象
var hero = {
	speed: 256 //每秒像素移动
};
var monster = {};
var monster2 = {};

var monstersCaught = 0;

//手柄键盘控件
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//当玩家抓到怪物时重置游戏
var herofuyuan = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;

	//把怪物随便扔到屏幕上
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
var reset2 = function () {
	
	//把怪物随便扔到屏幕上
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));
};
var restart = function(){
	alert("游戏结束，你的经验值低于0!");
	location.reload();
    
}



//更新游戏对象
var update = function (modifier) {
	if (38 in keysDown && hero.y>20) { // Player holding up
		hero.y -= hero.speed * modifier;
		heroImage = heroImage4;
	}
	if (40 in keysDown && hero.y<400) { // Player holding down
		hero.y += hero.speed * modifier;
		heroImage = heroImage1;
	}
	if (37 in keysDown && hero.x>20) { // Player holding left
		hero.x -= hero.speed * modifier;
		heroImage = heroImage2;
	}
	if (39 in keysDown && hero.x<450) { // Player holding right
		hero.x += hero.speed * modifier;
		heroImage = heroImage3;
	}

	//他们在碰吗？
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		herofuyuan();
		reset();
		if(monstersCaught>5){
			heroImage1.src = "images/zdown.png";
			heroImage2.src = "images/zleft.png";
			heroImage3.src = "images/zright.png";
			heroImage4.src = "images/zup.png";
			// guanka++;
			xingtai="中形态";
		}else if(monstersCaught<5){
			heroImage1.src = "images/xiao1.png";
			heroImage2.src = "images/xiao2.png";
			heroImage3.src = "images/xiao3.png";
			heroImage4.src = "images/xiao4.png";
			// guanka++;
			xingtai="小形态";

		}
		
	}

	if (
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		--monstersCaught;
		herofuyuan();
		reset2();
		if(monstersCaught>=5){
			heroImage1.src = "images/zdown.png";
			heroImage2.src = "images/zleft.png";
			heroImage3.src = "images/zright.png";
			heroImage4.src = "images/zup.png";
			
			xingtai="中形态";
		}
		else if(monstersCaught<5){
			heroImage1.src = "images/xiao1.png";
			heroImage2.src = "images/xiao2.png";
			heroImage3.src = "images/xiao3.png";
			heroImage4.src = "images/xiao4.png";
			// guanka++;
			xingtai="小形态";

		}	
	}
		
	if(monstersCaught<0){
		restart();
	}


};

//画出所有的东西
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}

	//得分
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("经验值: " + monstersCaught, 32, 32);
	ctx.fillText("等级: "+parseInt(monstersCaught/5), 32, 60);
	ctx.fillText("当前进化形态: "+xingtai, 200, 22);
};

//主游戏循环
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	//请求尽快再次执行此操作
	requestAnimationFrame(main);
};

//对requestAnimationFrame的跨浏览器支持
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
herofuyuan();
reset();
reset2();
main();

