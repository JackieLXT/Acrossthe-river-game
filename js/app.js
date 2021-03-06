// 这是我们的玩家要躲避的敌人
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x=x;
    this.y=y;
    this.speed = Math.random() * 200 + 100;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 505){
        this.x = -10;
    };
};


// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x,y) {
    this.x=200;
    this.y=320;
    this.sprite='images/char-boy.png';
};
var count=0;
Player.prototype.update = function (dt) {
    if(this.y < -10){
      $('div').css("display","block");   
    }
    this.checkCollisions();
};


Player.prototype.handleInput = function (allowedKeys) {
    switch(allowedKeys){   
        case 'left':
            if(this.x>90){
                this.x -= TILE_WIDTH;
            }
            break;
        case 'up':
            if (this.y>10){
                this.y -= TILE_HEIGHT;
            }
            break;
        case 'right':
            if(this.x<400){
                this.x += TILE_WIDTH;
            }
            break;
        case 'down':
            if(this.y<350){
                this.y += TILE_HEIGHT;
            }
            break;
    }
};
Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies= [];
for(var i=0;i<3;i++){
  var bugs = new Enemy(-30, 83 * (i % 3) + 72);

  allEnemies.push(bugs);

}
var player=new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


 Player.prototype.checkCollisions = function() {
 for (var i = 0; i < allEnemies.length; i++) {
    
     // 判断 y 轴方向是否发生碰撞
     if (Math.abs(this.y - allEnemies[i].y) < 60) {
        // console.log(this.y);
        // console.log(allEnemies[i].y);
         // 判断  x 轴方向是否发生碰撞
         if ((Math.abs(this.x - allEnemies[i].x)) < 60) {
             this.x = 200;
             this.y = 403;
         }
     }
 }
};
function open_win() //开始新的游戏
{
location.reload();
}


