game.module('game.main')
.require('game.Scenes')
.body(function() {
	PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;//TODO exite una opcion en config.js ?
	
	game.SCENES = [];//TODO Para usar mas adelante
	
	//SETTINGS
	game.GAME_MODES = ['normal', 'arcade'];
	game.GAME_MODE = 0;
	game.LENGTH_VALUE = 10;
	game.TIME_VALUE = 30;
	game.SHOW_BACKGROUND = true;
	game.MUSIC_ON = true;
	
	
	game.SCALE = 3;
	
	game.ITEM_CHANCE = 0.32;
	game.MULTIPLIER_CHANCE = 0.12;
	game.OBSTACLE_CHANCE = 0.25;
	game.PLATFORM_CHANCE = 0.5;
	
	//ITEM CHANCES
	game.ITEM_MONEY = 0.01;
	game.ITEM_COIN = 0.09;
	game.ITEM_BURGER = 0.25;
	game.ITEM_TOMATO = 0.65;
	
	//MULTIPLIERS CHANCE
	game.MUL_10 = 0.05;
	game.MUL_5 = 0.15;
	game.MUL_2 = 0.8;
	
	//OBSTACLE CHANCES
	game.OBST_PIKES = 0.4;
	game.OBST_DRY = 0.6;
	
	
	game.Loader.inject({
		initStage: function(){
			this.logo = new game.Sprite(game.Texture.fromImage('data:image/png;base64,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'));
			this.logo.anchor = {x: 0.5, y: 0.5};
			this.logo.scale = {x: 0.75, y: 0.75};
			this.logo.position = {x: game.system.width/2, y: game.system.height/2};
			this.logo.addTo(this.stage);
			
			this.text = new game.Sprite(game.Texture.fromImage('data:image/png;base64,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'));
			this.text.anchor.x = this.text.anchor.y = 0.5;
			this.text.scale.x = this.text.scale.y = 1;
			this.text.position.x = game.system.width/2;
			this.text.position.y = this.logo.position.y + this.logo.height;
			this.text.addTo(this.stage);
		},
		
		onPercentChange: function(){
			var t = new game.Tween(this.logo)
				.to({rotation: (this.percent/100)*2*Math.PI}, 100)
				.easing(game.Tween.Easing.Quadratic.InOut)
				.start();
		}
	});
	
	game.randomizeChances = function(){
		game.OBSTACLE_CHANCE = Math.randomBetween(0.4, 0.8);
	};
	
	game.start(MenuScene);
});
