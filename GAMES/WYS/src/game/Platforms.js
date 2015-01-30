game.module('game.Platforms')
.require(
	'game.Items'
)
.body(function(){

	PlatformController = game.Class.extend({
		
		/**
		 * container Container
		 * width int
		 * height int
		 * time: int
		 * platformLines: PlatformLine[]
		 * separationRatio: Point
		 * enabled: boolean
		 */
		
		init: function(parentContainer){
			this.container = new game.Container();
			
			this.width = 3;
			this.height = (game.GAME_MODES[game.GAME_MODE]=='arcade')? 20 : game.LENGTH_VALUE;
			this.time = game.TIME_VALUE;
			this.platformLines = [];
			this.separationRatio = {x: 0, y: 1.3};
			this.enabled = false;
			
			this.populate();
			
			parentContainer.addChild(this.container);
		},
		
		populate: function(){
			if (game.GAME_MODES[game.GAME_MODE] == 'normal' || game.GAME_MODES[game.GAME_MODE] == 'time-attack'){
				this.platformLines.push(new PlatformLine(this, null, 0, true, false));
				for(var i=1; i<this.height-1; i++){
					this.platformLines.push(new PlatformLine(this, this.platformLines[i-1], i,false, false));
				}
				this.platformLines.push(new PlatformLine(this, null, this.height-1,true, true));
			}else if (game.GAME_MODES[game.GAME_MODE] == 'arcade'){
				this.platformLines.push(new PlatformLine(this, null, 0, true, false));
				for(var i=1; i<this.height; i++){
					this.platformLines.push(new PlatformLine(this, this.platformLines[i-1], i,false, false));
				}
			}
		},
		
		addMoreLines: function(){
			for(var i=this.height; i<this.height+20; i++){
				this.platformLines.push(new PlatformLine(this, this.platformLines[i-1], i, false, false));
				this.platformLines[i].enable();
			}
			this.height += 20;
			game.scene.game.hero.moveToTop();
		},
		
		onTimeUp: function(){
			console.log('TODO!');//TODO
		},
		
		start: function(){
			this.enabled = true;
			for ( var i = 0; i < this.platformLines.length; i++) {
				this.platformLines[i].enable();
			}
		},
		
		stop: function(){
			this.enabled = false;
			for ( var i = 0; i < this.platformLines.length; i++) {
				this.platformLines[i].disable();
			}
		},
		
		getPlatform: function(x, y){
			if (x >= 0 && x <this.width &&
				y >= 0 && y <this.height){
				return this.platformLines[y].getPlatform(x);
			}
			return null;
//			throw new Error('No se encuentra la plataforma en x: '+x+' y: '+y);
		},
		
		keydown: function(k){
			if (!this.enabled) return;
			if (k!='A' && k!='S' && k!='D') return;
			
			var h = game.scene.game.hero;
			var p;
			
			if (k == 'A') p = this.getPlatform(0, h.location.y+1);
			else if (k == 'S') p = this.getPlatform(1, h.location.y+1);
			else if (k == 'D') p = this.getPlatform(2, h.location.y+1);
			
			if (h.location.y == this.height - 2){
				p = this.platformLines[this.platformLines.length-1].platforms[0];
			}
			
			if (p != null) h.jumpToPlatform(p);
			else{
				if (game.GAME_MODES[game.GAME_MODE] == 'arcade') game.scene.game.gameOver();
			}
		}
		
		
	});
	
	/**
	 * @class PlatformLine
	 */
	
	PlatformLine = game.Class.extend({
		
		/**
		 * parentController: PlatformController
		 * previousLine: PlatformLine
		 * platforms: Platform[]
		 * hpos: int
		 * isLarge: boolean
		 * isHeaven: boolean
		 * visited: boolean
		 * platformChance: float
		 * obstacleChance: float
		 */
		
		init: function(parent, previousLine, hpos, large, heaven){
			
			this.parentController = parent;
			this.previousLine = previousLine;
			this.platforms = [];
			this.hpos = hpos;
			this.isLarge = large;
			this.isHeaven = heaven;
			this.visited = false;
			this.platformChance = game.PLATFORM_CHANCE; if (game.GAME_MODES[game.GAME_MODE]=='arcade') this.platformChance *= 0.75;
			this.obstacleChance = game.OBSTACLE_CHANCE; if (game.GAME_MODES[game.GAME_MODE]=='arcade') this.obstacleChance *= 3;
			
			this.generate();
		},
		
		generate: function(){
			if (this.isLarge){
				this.platforms.push(new LargePlatform(this, 0));
			}else{
				var c = 0;
				for (var i=0; i<this.parentController.width; i++){
					if (Math.random()<this.platformChance){
						this.createPlatform(i);
						c++;
					}
				}
				if (c == 0)	this.createPlatform(Math.randomInt(0, this.parentController.width-1));
			}
			//Check sprikes
			var c = 0; var p;
			for (var i=0; i<this.platforms.length; i++){
				if (this.platforms[i] instanceof PikesPlatform){
					c++;
					p = this.platforms[i];
				}
			}
			if ((c > 1) || (this.platforms.length == 1 && c==1)){
				var common = new CommonPlatform(this, p.wpos);
				var oldI = this.platforms.indexOf(p);
				this.platforms[oldI].remove();
				this.platforms[oldI] = common;
			}
		},
		
		createPlatform: function(wpos){
			var r = Math.random();
			
			if (r < this.obstacleChance){
				var o = Math.random();
				if (o < game.OBST_PIKES){
					this.platforms.push(new PikesPlatform(this, wpos));
				}else if(o < game.OBST_PIKES + game.OBST_DRY){
					this.platforms.push(new DryPlatform(this, wpos));
				}
			}else{
				this.platforms.push(new CommonPlatform(this, wpos));
			}
		},
		
		getPlatform: function(wpos){
			for (var i=0; i<this.platforms.length; i++){
				if (this.platforms[i].wpos == wpos)
					return this.platforms[i];
			}
		},
		
		onEnter: function(){
			if (game.GAME_MODES[game.GAME_MODE] == 'arcade'){
				if (this.hpos > this.parentController.height-10){
					this.parentController.addMoreLines();
				}
			}
//			if (!this.visited){
//				this.visited = true;
				game.scene.game.stepAdd();
//			}
		},
		
		onLeave: function(){
			
		},
		
		enable: function(){
			for (var i=0; i<this.platforms.length; i++){
				this.platforms[i].enable();
			}
		},
		
		disable: function(){
			for (var i=0; i<this.platforms.length; i++){
				this.platforms[i].disable();
			}
		}
		
	});
	
	/**
	 * @class Platform
	 */
	
	Platform = game.Sprite.extend({
		
		/**
		 * parentLine: PlatformLine
		 * wpos: int
		 * visited: boolean
		 * item: Item
		 * breakTimer: int
		 * fallingTime: int
		 */
		
//		parentLine: {},
//		wpos: 0,
		visited: false,
//		item: {},
//		breakTimer: 2200,
//		fallingTime: 1000,
		
		init: function(parent, wpos, imgPath){
			this._super(imgPath);
			
			this.parentLine = parent;
			this.wpos = wpos;
			this.visited = false;
			this.item = null;
			this.breakTimer = 2500;//2000//3000//4000
			this.fallingTime = 1000;
			
			this.scale = {x: game.SCALE, y: game.SCALE};
			this.anchor = {x: 0.5, y: 0.5};
			
			var pcontroller = this.parentLine.parentController;
			var blockW = game.system.width/pcontroller.width;
			this.position.x = (blockW*wpos) + blockW/2;
			this.position.y = game.system.height - (parent.hpos*this.height*pcontroller.separationRatio.y) - this.height*pcontroller.separationRatio.y/2;
			
			this.addTo(pcontroller.container);
		},
		
		onEnter: function(){
			this.visited = true;
			if (this.item !=null){
				this.item.onCollect();
				this.item = null;
			}
				
			this.parentLine.onEnter();
		},
		
		onLeave: function(){
			this.parentLine.onLeave();
		},
		
		onFall: function(){
			this.disable();
			this.fallAnimate();
			if (game.scene.game.hero.getCurrentPlatform() == this){
				game.scene.game.hero.onFall();
			}
		},
		
		fallAnimate: function(){
			var newPos = this.position.clone();
			newPos.y += 30;
			
			var t = game.scene.addTween(this.position, newPos, this.fallingTime, {easing: game.Tween.Easing.Quadratic.Out}).start();
			var ta = game.scene.addTween(this, {alpha: 0}, this.fallingTime, {easing: game.Tween.Easing.Quadratic.InOut}).start();
			ta.onComplete(function(){
				this.remove();
			});
		},
		
		click: function(e){
			if (game.scene.game.hero.canJumpToPlatform(this))
				game.scene.game.hero.jumpToPlatform(this);
		},
		
		enable: function(){
			this.setInteractive(true);
		},
		
		disable: function(){
			this.setInteractive(false);
		}
		
	});
	
	LargePlatform = Platform.extend({
		
		
		init: function(parent, wpos){
			this._super(parent, wpos, 'res/dirt_long.png');
			this.position.x = game.system.width/2;
		},
		
		onEnter: function(){
			this._super();
			if (this.parentLine.isHeaven)
				game.scene.game.gameOver();
		}
		
		
	});
	
	ShortPlatform = Platform.extend({
		
		init: function(parent, wpos, imgPath){
			this._super(parent, wpos, imgPath);
			this.breakTimer *= (game.GAME_MODES[game.GAME_MODE]=='normal')? 1 : 0.5; 
			this.placeItem();
		},
		
		onEnter: function(){
			this._super();
			if (this.breakTimer > 0){
				var t = game.scene.addTimer(this.breakTimer, this.onFall.bind(this), false);
				var t2 = game.scene.addTimer(this.breakTimer*0.65, this.startShake.bind(this), false);
			}
		},
		
		placeItem: function(){},
		
		startShake: function(){
			var t = game.scene.addTween(this, {rotation: 0.1}, 80, {easing: game.Tween.Easing.Circular.InOut}).repeat().yoyo().start();
		}
		
	});
	
	CommonPlatform = ShortPlatform.extend({
		
		init: function(parent, wpos){
			this._super(parent, wpos, 'res/dirt.png');
		},
		
		placeItem: function(){			
			if (Math.random() < game.ITEM_CHANCE){
				var i = Math.random();
				
				if (i < game.ITEM_TOMATO){
					this.item = new TomatoItem(this);
				}else if (i < game.ITEM_TOMATO + game.ITEM_BURGER){
					this.item = new BurgerItem(this);
				}else if (i < game.ITEM_TOMATO + game.ITEM_BURGER + game.ITEM_COIN){
					this.item = new CoinItem(this);
				}else if (i < game.ITEM_TOMATO + game.ITEM_BURGER + game.ITEM_COIN + game.ITEM_MONEY){
					this.item = new MoneyItem(this);
				}
			}else if (game.GAME_MODES[game.GAME_MODE]=='normal' && Math.random() < game.MULTIPLIER_CHANCE){
				var m = Math.random();
				
				if (m < game.MUL_2){
					this.item = new x2Item(this);
				}else if (m < game.MUL_2 + game.MUL_5){
					this.item = new x5Item(this);
				}else if (m < game.MUL_2 + game.MUL_5 + game.MUL_10){
					this.item = new x10Item(this);
				}
			}
		}
		
	});
	
	DryPlatform = ShortPlatform.extend({
		
		init: function(parent, wpos){
			this._super(parent, wpos, 'res/dirt_dry.png');
			this.breakTimer *= 0.6;
			this.fallingTime *= 0.5;
		},
		
		placeItem: function(){
			if (game.GAME_MODES[game.GAME_MODE]=='normal' && Math.random() < game.MULTIPLIER_CHANCE*2){
				var m = Math.random();
				
				if (m < game.MUL_2){
					this.item = new x2Item(this);
				}else if (m < game.MUL_2 + game.MUL_5){
					this.item = new x5Item(this);
				}else if (m < game.MUL_2 + game.MUL_5 + game.MUL_10){
					this.item = new x10Item(this);
				}
			}
		}
		
	});
	
	PikesPlatform = ShortPlatform.extend({
		
		init: function(parent, wpos){
			this._super(parent, wpos, 'res/dirt_pikes.png');
			this.breakTimer = -1;
		},
		
		placeItem: function(){
			this.item = new PikesItem(this);
			if (game.GAME_MODES[game.GAME_MODE] == 'arcade') this.item = null;
		},
		
		onEnter: function(){
			this._super();
//			console.log(this.parentLine.platforms.length);
			if (game.GAME_MODES[game.scene.game.score.game_mode] == 'arcade') game.scene.game.gameOver();
		}
		
	});
	
});
