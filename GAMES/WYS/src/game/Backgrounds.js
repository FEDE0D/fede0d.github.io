game.module('game.Backgrounds').require('engine.sprite').body(function(){

	
	game.getBackground = function(){
		if (game.GAME_MODES[game.GAME_MODE] == 'normal') return new WaterBackground();
		else if (game.GAME_MODES[game.GAME_MODE] == 'arcade') return new LavaBackground();
	};
	
	
	Background = game.Class.extend({
		/**
		 * container: Container
		 * bgColor: 0x000000
		 */
		init: function(color){
			this.container = new game.Container(game.system.width, game.system.height);

			this.bgColor = color || 0x000000;
			game.system.stage.setBackgroundColor(this.bgColor);
			
			game.scene.stage.addChild(this.container);
		},
		
		enable: function(){
			this.container.setInteractive(true);
			this.container.hitArea = new game.HitRectangle(0, 0, game.system.width, game.system.height);
			var self = this;
			this.container.click = this.container.tap = function(e){
				self.onHit(e);
			};
		},
		
		disable: function(){
			this.container.setInteractive(false);
		},
		
		onHit: function(e){}
		
	});
	
	
	TBackground = Background.extend({
		
		/**
		 * sprite: TilingSprite
		 * tween: Tween
		 * popMsg: String
		 */
		
		init: function(bgColor, imgPath, speed, scale){
			this._super(bgColor);
			
			this.sprite = null;
			this.tween = null;
			this.popMsg = null;
			
			if (game.SHOW_BACKGROUND){
				this.sprite = new game.TilingSprite(imgPath, game.system.width, game.system.height);
				this.sprite.speed.x = speed.x;
				this.sprite.speed.y = speed.y;
				this.sprite.scale.x = scale.x;
				this.sprite.scale.y = scale.y;
				
				this.container.addChild(this.sprite);
				game.scene.addObject(this.sprite);
			}
		},
		
		enable: function(){
			this._super();
			if (this.sprite != null)	this.addTween();
		},
		
		disable: function(){
			this._super();
			if (this.tween) this.tween.stop();
		},
		
		onHit: function(e){
			if (this.popMsg) game.scene.gui.popText(this.popMsg, e.getLocalPosition(game.scene.game.container));
			if (game.GAME_MODES[game.GAME_MODE] == 'arcade' || game.GAME_MODES[game.GAME_MODE]=='time-attack'){
				game.scene.game.gameOver();
			}
		},
		
		addTween: function(){}
		
	});
	
	LavaBackground = TBackground.extend({
		
		init: function(){
			this._super(0xEA8D00, 'res/bg/lava.png', {x: 2, y: 25}, {x: 4, y: 4});
			this.popMsg = 'ouch!';
		},
	
		addTween: function(){
			this.tween = new game.scene.addTween(this.sprite.speed, {x: 20, y: 15}, 4000, {easing: game.Tween.Easing.Back.InOut}).repeat().yoyo().start();
		}
		
	});
	
	WaterBackground = TBackground.extend({
		
		init: function(){
			this._super(0x08C8F8, 'res/bg/water.png', {x: 0, y: 50}, {x: 4, y: 4});
		}
		
	});
	
	
	
	
	/**
	 * Clouds
	 */
	
	CloudManager = game.Class.extend({
		
		/**
		 * container: Container
		 * clouds: Cloud[]
		 * timeBetween: int
		 * timer: Timer
		 */
		
		init: function(parentContainer){
			this.container = new game.Container();
			
			this.clouds = [];
			this.timeBetween = (game.GAME_MODES[game.GAME_MODE]=='normal')? 5000 : 2000;
			this.timer = null;
			
			parentContainer.addChild(this.container);
		},
		
		start: function(){
			this.timer = game.scene.addTimer(Math.random()*this.timeBetween, this.onSpawn.bind(this), false);
		},
		
		stop: function(){
			game.scene.removeTimer(this.timer);
		},
		
		onSpawn: function(){
			var c = new Cloud(this);
						
			this.start();
		}
		
	});
	
	Cloud = game.Sprite.extend({
		
		/**
		 * parentManager: CloudManager
		 */
		
		init: function(parent){
			this._super(['res/bg/cloud0.png','res/bg/cloud1.png'].random());
			this.parentManager = parent;
			
			this.scale.x = this.scale.y = 4;
			this.alpha = Math.randomBetween(0.8, 1);
			this.speed = new PIXI.Point(-100, 0);
			
			this.position.y = (game.scene.game.camera.position.y) + (game.system.height*0.4) - game.system.height*Math.random() - 32*4;
			this.position.x = (this.position.y+32*4 < game.scene.game.camera.position.y)? game.system.width*Math.random() : game.system.width;
			
			this.addTo(this.parentManager.container);
			game.scene.addObject(this);
		},
		
		update: function(){
			this.position.x += this.speed.x * game.system.delta;
			this.position.y += this.speed.y * game.system.delta;
			if (this.position.x + this.width < 0 || this.position.x > game.system.width){
				this.remove();
				game.scene.removeObject(this);
			}
		}
		
	});
	
	
});