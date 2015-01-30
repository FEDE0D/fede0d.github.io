game.module('game.GameUI').require('engine.sprite').body(function(){
	
	GameUI = game.Class.extend({
		
		/**
		 * container: Container
		 * scoreText: BitmapText
		 * gameOverText: BitmapText
		 * scoreStatText: BitmapText
		 * highscoreText: BitmapText
		 * pressStartBtn: SpriteButton
		 * restartBtn: SpriteButton
		 * arcadeTry: BitmapFont
		 * homeBtn: SpriteButton
		 */
		
		init: function(parentContainer){
			
			this.container = new game.Container();

			this.scoreText = new Text(game.scene.game.score.getString(), {x: 4, y: 0}, 0.7, 'Pixel');
			this.gameOverText = new Text('Game Over', {x: game.system.width*0.14, y: game.system.height*0.1}, 1.25, 'Pixel');
			this.scoreStatText = new Text('', {x: game.system.width*0.3, y: game.system.height*0.25}, 0.7, 'Pixel');
			this.highscoreText = new Text('New Highscore!', {x: game.system.width*0.1, y: game.system.height*0.42}, 1.25);
			this.pressStartBtn = new SpriteButton('res/press-to-start.png', {x: game.system.width*0.5, y: game.system.height*0.5}, 3);
			this.restartBtn = new SpriteButton('res/playAgain.png', {x: game.system.width*0.5, y: game.system.height*0.8}, 3);
			this.arcadeTry = new game.BitmapText('Or try X Mode', {font:'pixelated'}); this.arcadeTry.scale.x = this.arcadeTry.scale.y = 1.25; this.arcadeTry.position.x = game.system.width*0.2; this.arcadeTry.position.y = game.system.height*0.9;
				if (game.GAME_MODES[game.GAME_MODE]=='normal') this.arcadeTry.setText('Or try Arcade Mode');
				else if (game.GAME_MODES[game.GAME_MODE]=='arcade') this.arcadeTry.setText('Or try Normal Mode');
				this.arcadeTry.click = this.arcadeTry.tap = function(e){
					game.GAME_MODE ++; game.GAME_MODE %= game.GAME_MODES.length;
					game.storage.set('gm',game.GAME_MODE);
					game.scene.onRestart();
				};
			this.homeBtn = new SpriteButton('res/home.png', {x: game.system.width -1, y: 1}, 3); this.homeBtn.anchor = {x: 1, y: 0};
			
			parentContainer.addChild(this.container);
		},
		
		onShow: function(){
			
			this.homeBtn.enable();
			this.homeBtn.onAction = function(e){ 
				game.scene.goToMainMenu(); 
			};
			this.container.addChild(this.homeBtn);
			
			this.pressStartBtn.enable();
			this.pressStartBtn.onAction = function(e){
				this.disable();
				game.scene.onStart();
				var t = game.scene.addTween(this, {alpha: 0}, 300, {easing: game.Tween.Easing.Quadratic.Out}).start();
				t.onComplete(function(){
					this.remove();
				});
			};
			this.container.addChild(this.pressStartBtn);
			this.container.addChild(this.scoreText);
			
		},
		
		onStart: function(){
			
		},
		
		onGameOver: function(){
			this.container.addChild(this.gameOverText);
			this.container.addChild(this.restartBtn);
			this.container.addChild(this.arcadeTry);
			
			this.restartBtn.enable();
			this.restartBtn.onAction = function(e){
				game.scene.onRestart(); 
			};
			var t = new game.scene.addTween(this.restartBtn.scale, {x: 2.8, y: 2.8}, 500, {easing: game.Tween.Easing.Quadratic.InOut}).repeat().yoyo().start();
			
			this.arcadeTry.setInteractive(true); this.arcadeTry.buttonMode = true;
						
			this.showScoreStats();
			this.showHighscore();
		},
		
		onScoreChanged: function(){
			this.scoreText.setText(game.scene.game.score.getString());
		},
		
		showScoreStats: function(){
			var score = game.scene.game.score;
			if (game.GAME_MODES[score.game_mode] == 'normal'){
				this.scoreStatText.setText(score.getScoreString());
			}else if (game.GAME_MODES[game.scene.game.score.game_mode] == 'arcade'){
				this.scoreStatText.setText(score.getScoreString());
			} 
			
			this.container.addChild(this.scoreStatText);
			this.container.removeChild(this.scoreText);
		},
		
		showHighscore: function(){
			if (game.scene.game.score.isHighscore)	this.container.addChild(this.highscoreText);
			var t = game.scene.addTween(this.highscoreText, {alpha: 0.5}, 300, {easing: game.Tween.Easing.Quadratic.InOut}).repeat().yoyo().start();
		},
		
		popText: function(text, position){
			var pop = new Text(text, position, 0.6, 'Pixel');
			var tp = game.scene.addTween(pop.position, {y: pop.position.y - 30}, 1200, {easing: game.Tween.Easing.Quadratic.Out}).start();
			var t = game.scene.addTween(pop, {alpha: 0}, 1200, {easing: game.Tween.Easing.Exponential.In}).start();
				t.onComplete(function(){
					game.scene.game.container.removeChild(pop);
				});
			game.scene.game.container.addChild(pop);
		}
		
	});
	
	Text = game.BitmapText.extend({
		
		init: function(text, position, scale, fontName){
			fontName = fontName || 'crazyPixels';
			this._super(text+'', {font: fontName});
			
			this.scale = {x: scale, y: scale};
			if (position != null) this.position = {x: position.x, y: position.y};
			else{
				this.position = {
					x: (game.system.width - this.textWidth*this.scale.x)/2,
					y: (game.system.height *0.5)
				};
			}
		}
		
	});
	
	SpriteButton = game.Sprite.extend({
		
		init: function(path, position, scale){
			this._super(path);
			
			this.anchor = {x: 0.5, y: 0.5};
			this.scale = {x: scale, y: scale};
			if (position != null) this.position = position;
			
			this.click = this.tap = function(e){
				this.onAction(e);
			};
		},
		
		enable: function(){
			this.setInteractive(true);
			this.buttonMode = true;
		},
		
		disable: function(){
			this.setInteractive(false);
			this.buttonMode = false;
		},
		
		onAction: function(e){
			
		}
		
	});
	
	HomeButton = game.Sprite.extend({
		
		init: function(func){
			this._super('res/home.png',
				game.system.width - 1, 
				1,
				{
					anchor: {x: 1, y: 0},
					scale: {x: 3, y: 3}
				}
			);
			this.setInteractive(true); this.buttonMode = true;
			this.click = this.tap = function(e){
				func();
			};
		}
		
	});
	
	Selector = game.Class.extend({
		/*
		 * Sprite name
		 * Sprite minus
		 * Sprite plus
		 * Sprite number
		 * int numberWidth
		 * int charsLength
		 * Point position
		 */
		offset: 5,
		minNum: 5,
		maxNum: 200,
		
		init: function(name, minusSimbol, plusSimbol, numberObject, numberSizeSample, fontName, x, y){
			
			this.name = new game.BitmapText(name, {font: fontName});
			this.minus = new game.BitmapText(minusSimbol, {font: fontName});
			this.plus = new game.BitmapText(plusSimbol, {font: fontName});
			this.number = new game.BitmapText(numberSizeSample, {font: fontName});
			
			this.numberWidth = this.number.textWidth;
			this.charsLength = numberSizeSample.length;
			this.numberObject = numberObject;
			
			this.position = {x: x, y: y};
			
			this.redrawNumber();
			this.enable();
		},
		
		setOffset: function(n){
			this.offset = n;
		},
		
		setMinMax: function(min, max){
			this.minNum = min;
			this.maxNum = max;
		},
		
		enable: function(){
			var self = this;
			this.minus.setInteractive(true);
			this.minus.buttonMode = true;
			this.minus.click = this.minus.tap = function(e){
				self.onMinus();
			};
			
			this.plus.setInteractive(true);
			this.plus.buttonMode = true;
			this.plus.click = this.plus.tap = function(e){
				self.onPlus();
			};
		},
		
		disable: function(){
			this.minus.setInteractive(false); this.minus.buttonMode = false;
			this.plus.setInteractive(false); this.plus.buttonMode = false;
		},
		
		addTo: function(container){			
			this.name.position = {x: this.position.x, y: this.position.y};
			container.addChild(this.name);
			
			this.minus.position = {
				x: this.name.position.x + this.name.textWidth + 2,
				y: this.name.position.y + (this.name.textHeight - this.minus.textHeight)/2
			};
			container.addChild(this.minus);
			
			this.number.position = {
				x: this.minus.position.x + this.minus.textWidth + 2,
				y: this.minus.position.y
			};
			container.addChild(this.number);
			
			this.plus.position = {
				x: this.number.position.x + this.numberWidth + 2,
				y: this.minus.position.y
			};
			container.addChild(this.plus);
		},
		
		remove: function(){
			if (this.name.parent) this.name.parent.removeChild(this.name);
			if (this.minus.parent) this.minus.parent.removeChild(this.minus);
			if (this.number.parent) this.number.parent.removeChild(this.number);
			if (this.plus.parent) this.plus.parent.removeChild(this.plus);
		},
		
		redrawNumber: function(){
			var text = this.pad(this.numberObject+'', this.charsLength);
			this.number.setText(text);
		},
		
		onMinus: function(){
			this.numberObject -= this.offset;
			if (this.numberObject < this.minNum) this.numberObject = this.minNum;
			this.redrawNumber();
			if (this.onValueChangedFunction) this.onValueChangedFunction();
		},
		
		onPlus: function(){
			this.numberObject += this.offset;
			if (this.numberObject > this.maxNum) this.numberObject = this.maxNum;
			this.redrawNumber();
			if (this.onValueChangedFunction) this.onValueChangedFunction();
		},
		
		pad:function(str, max){
		  str = str.toString();
		  return str.length < max ? this.pad("0" + str, max) : str;
		},
		
		onValueChanged: function(func){
			this.onValueChangedFunction = func;
		}
	});
	
});