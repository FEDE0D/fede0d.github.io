game.module('game.Scenes')
.require('game.Game','game.GameUI')
.body(function() {
	
	/**
	 * XXX
	 * SCENE GAME
	 */
	
	SceneGame = game.Scene.extend({

		/**
		 * game: Game
		 * gui: GameUI
		 */
		
		init: function(){
			this.game = new Game(this.stage);
			this.gui = new GameUI(this.stage);
			this.gui.onShow();
			
			if (game.GAME_MODES[game.GAME_MODE]=='normal'){
				if (game.audio.currentMusic != 'normal_music'){
					game.audio.stopMusic();
					if (game.MUSIC_ON) game.audio.playMusic('normal_music', 0.8);
				}
			}else if (game.GAME_MODES[game.GAME_MODE]=='arcade'){
				if (game.audio.currentMusic != 'arcade_music'){
					game.audio.stopMusic();
					if (game.MUSIC_ON) game.audio.playMusic('arcade_music', 0.8);
				}
			}
		},
		
		onStart: function(){
			this.game.start();
			this.gui.onStart();
		},
		
		onRestart: function(){
			game.system.setScene(SceneGame);
		},
		
		onGameOver:function(){
			this.gui.onGameOver();
		},
		
		onScoreChanged: function(){
			this.gui.onScoreChanged();
		},
		
		goToMainMenu: function(){
			if (confirm('Do you want to abandon this play?'))
				game.system.setScene(MenuScene);
		},
		
		keydown: function(k){
			if (!this.game.isStarted){
				this.gui.pressStartBtn.onAction();
				return;
			}
			this.game.keydown(k);
		}
		
	});
	
	
	/**
	 * XXX
	 * MENU SCENE
	 */
	
	MenuScene = game.Scene.extend({
		
		backgroundColor: 0x000000,
		started: false,
		
		init: function(){
			//LOAD-SETTINGS
			this.loadData();
			
			this.upThing = new game.TilingSprite('res/gui/up.png');
			this.upThing.scale = {x: 3.125, y: 3.125};
			this.upThing.position = {x: 0*this.upThing.scale.x, y: -100};
			this.upThing.addTo(this.stage);
			
			this.downThing = new game.TilingSprite('res/gui/down.png');
			this.downThing.scale = {x: 3.125, y: 3.125};
			this.downThing.position = {x: 0*this.downThing.scale.x, y: game.system.height+100};
			this.downThing.addTo(this.stage);
			
			var tUp = this.addTween(this.upThing.position, {y: 0*this.upThing.scale.y}, 400, {easing: game.Tween.Easing.Bounce.Out}).start();
			var tDown = this.addTween(this.downThing.position, {y: 170*this.downThing.scale.y}, 400, {easing: game.Tween.Easing.Bounce.Out}).start();
			
			//ANIMATE UP-DOWN
			this.upThing.speed = {x: 100, y: 0};
			this.downThing.speed = {x: -100, y: 0};
			this.addObject(this.upThing);
			this.addObject(this.downThing);
			
			this.title = {};
			this.title.watch = new game.Sprite('res/gui/menu/watch.png');
			this.title.your= new game.Sprite('res/gui/menu/your.png');
			this.title.step = new game.Sprite('res/gui/menu/step.png');
			
			this.title.watch.anchor = {x: 0.5, y: 0.5};
			this.title.your.anchor = {x: 0.5, y: 0.5};
			this.title.step.anchor = {x: 0.5, y: 0.5};
			
			this.title.watch.position = {x: game.system.width/2, y: -100};
			this.title.your.position = {x: game.system.width/2, y: -100};
			this.title.step.position = {x: game.system.width/2, y: -100};
			
			var t1 = this.addTween(this.title.watch.position, {y: game.system.height*0.25}, 1000, {easing: game.Tween.Easing.Bounce.Out}).start();
			var t2 = this.addTween(this.title.your.position, {y: game.system.height*0.35}, 1000, {easing: game.Tween.Easing.Bounce.Out}).start();
			var t3 = this.addTween(this.title.step.position, {y: game.system.height*0.45}, 1000, {easing: game.Tween.Easing.Bounce.Out}).start();
			
			t3.onComplete(function(){
				game.scene.start();
			});
			
			this.title.watch.addTo(this.stage);
			this.title.your.addTo(this.stage);
			this.title.step.addTo(this.stage);
			
			
			if (game.audio.currentMusic != 'menu_music'){
				if (game.MUSIC_ON){
					game.audio.playMusic('menu_music', 0.8);
				}
			}
		},
		
		start: function(){
			this.started = true;
			
			//ANIMATE TITLE
			var t1 = this.addTween(this.title.watch.scale, {x: 1.1, y: 1.1}, 500).repeat().yoyo().start();
			var t2 = this.addTween(this.title.your.scale, {x: 1.1, y: 1.1}, 510).repeat().yoyo().start();
			var t2 = this.addTween(this.title.step.scale, {x: 1.1, y: 1.1}, 520).repeat().yoyo().start();
			
			
			//SHOW OPTIONS
			this.play = new game.BitmapText('Play', {font:'crazyPixels'});
			this.options = new game.BitmapText('Options', {font:'crazyPixels'});
			this.credits = new game.BitmapText('Credits', {font:'crazyPixels'});
			
			this.play.position = {
				x: game.system.width*0.1,
				y: game.system.height*0.6
			};
			this.options.position = {
				x: game.system.width*0.1,
				y: game.system.height*0.7
			};
			this.credits.position = {
				x: game.system.width*0.1,
				y: game.system.height*0.8
			};
			
			this.play.setInteractive(true); this.play.buttonMode = true;
			this.options.setInteractive(true); this.options.buttonMode = true;
			this.credits.setInteractive(true); this.credits.buttonMode = true;
			
			this.play.click = this.play.tap = function(e){
				game.scene.onPlay();
			};
			this.options.click = this.options.tap = function(e){
				game.scene.onOptions();
			};
			this.credits.click = this.credits.tap = function(e){
				game.scene.onCredits();
			};
			
			var controls = new game.BitmapText('Controls:\n\n  Touchscreen\n  Mouse\n  A S D keys',{font:'pixelated'});
			controls.position.x = game.system.width*0.6;
			controls.position.y = game.system.height*0.6;
			
			this.stage.addChild(this.play);
			this.stage.addChild(this.options);
			this.stage.addChild(this.credits);
			this.stage.addChild(controls);
			
		},
		
		loadData: function(){
			game.GAME_MODE = game.storage.get('gm', 0);
			game.LENGTH_VALUE = game.storage.get('lv',25);
			game.TIME_VALUE = game.storage.get('tv',10);
			game.SHOW_BACKGROUND = game.storage.get('sb', true);
			game.MUSIC_ON = game.storage.get('mo', true);
		},
		
		transitionOut: function(time, onCompleteFunc){
			var g = new PIXI.Graphics();
			g.beginFill(0xFFFFFF);
			g.drawRect(0, 0, game.system.width, game.system.height);
			g.endFill();
			g.alpha = 0;
			this.stage.addChild(g);
			
			var t = this.addTween(g, {alpha: 1}, time, {easing: game.Tween.Easing.Quadratic.Out}).start();
			t.onComplete(function(){
				onCompleteFunc();
			});
		},
		
		onPlay: function(){
			this.transitionOut(1000, function(){
				game.system.setScene(SceneGame);
			});
		},
		
		onOptions: function(){
			this.transitionOut(250, function(){
				game.system.setScene(OptionsScene);
			});
		},
		
		onCredits: function(){
			this.transitionOut(250, function(){
				game.system.setScene(CreditsScene);
			});
		}
		
	});
	
	/**
	 * XXX
	 * OPTIONS SCENE
	 */
	
	OptionsScene = game.Scene.extend({
		
//		backgroundColor: 0xBC8349,
//		gameMode: game.GAME_MODE,
		
		init: function(){
			this.options = new game.Sprite('res/gui/options/options.png',game.system.width/2,-100,{anchor: {x:0.5, y:0.5}})
			.addTo(this.stage);
			var t = this.addTween(this.options.position, {y: game.system.height*0.2}, 300, {easing: game.Tween.Easing.Bounce.Out}).start();
			t.onComplete(function(){
				var t2 = game.scene.addTween(game.scene.options.scale, {x: 1.2, y:1.2}, 500, {easing:game.Tween.Easing.Quadratic.InOut}).repeat().yoyo().start();
			});

			this.home = new HomeButton(function(){
				game.system.setScene(MenuScene);
			});
			this.home.addTo(this.stage);
			
			this.showOptions();
			
			game.scene.gameModeChanged();
		},
		
		showOptions: function(){
			/*OPTIONS*/
			
			this.gameMode = new game.BitmapText('GAME MODE: ', {font: 'crazyPixels'});
			this.gameMode.position = {
				x: game.system.width*0.1,
				y: game.system.height * 0.3
			};
			this.gameMode.setInteractive(true); this.gameMode.buttonMode = true;
			this.gameMode.click = this.gameMode.tap = function(e){
				game.GAME_MODE ++; game.GAME_MODE %= game.GAME_MODES.length;
				game.scene.gameModeChanged();
			};
			this.stage.addChild(this.gameMode);
			
			this.gameModeName = new game.BitmapText(''+game.GAME_MODES[game.GAME_MODE], {font: 'crazyPixels'});
			this.gameModeName.scale = {x: 0.5, y: 0.5};
			this.gameModeName.position = {
				x: this.gameMode.position.x + this.gameMode.textWidth + 4,
				y: this.gameMode.position.y + 16
			};
			this.stage.addChild(this.gameModeName);
			
			this.goFullscreen = new game.BitmapText('GO FULLSCREEN', {font: 'crazyPixels'});
			this.goFullscreen.position = {
				x: game.system.width*0.1,
				y: game.system.height*0.5
			};
			this.goFullscreen.setInteractive(true); this.goFullscreen.buttonMode = true;
			this.goFullscreen.click = this.goFullscreen.tap = function(e){
				game.fullscreen();
			};
			if (game.fullscreenSupport()) this.stage.addChild(this.goFullscreen);

			this.showBG = new game.BitmapText('BACKGROUND: '+((game.SHOW_BACKGROUND)?'ON':'OFF'),  {font: 'crazyPixels'});
			this.showBG.position.x = this.goFullscreen.position.x;
			this.showBG.position.y = game.system.height*0.6;
			this.showBG.setInteractive(true); this.showBG.buttonMode = true;
			this.showBG.click = this.showBG.tap = function(e){
				game.SHOW_BACKGROUND = !game.SHOW_BACKGROUND;
				game.scene.showBGChanged();
			};
			this.stage.addChild(this.showBG);
			var optMsg = new game.BitmapText('(change this if the game runs slowly)', {font:'pixelated'});
			optMsg.position.x = game.system.width*0.1;
			optMsg.position.y = game.system.height*0.66;
//			optMsg.scale.x = optMsg.scale.y = 0.95;
			optMsg.alpha = 0.75;
			this.stage.addChild(optMsg);
			
			this.musicOn = new game.BitmapText('MUSIC: '+((game.MUSIC_ON)? 'ON':'OFF'), {font:'crazyPixels'});
			this.musicOn.position.x = game.system.width*0.1;
			this.musicOn.position.y = game.system.height*0.7;
			this.musicOn.setInteractive(true); this.musicOn.buttonMode = true;
			this.musicOn.click = this.musicOn.tap = function(e){
				game.MUSIC_ON = !game.MUSIC_ON;
				game.scene.musicOnChanged();
			};
			this.stage.addChild(this.musicOn);
			
			
			/*SELECTORS*/
			this.lengthSelector = new Selector('Length: ', '- ', ' +', game.LENGTH_VALUE, '000', 'crazyPixels',
				this.goFullscreen.position.x,
				this.gameMode.position.y + 50
			);
			this.lengthSelector.onValueChanged(function(){
				game.LENGTH_VALUE = this.numberObject;
				game.storage.set('lv', game.LENGTH_VALUE);
			});
			this.lengthSelector.addTo(this.stage);
			
			this.timeSelector = new Selector('Time: ', '-', '+', game.TIME_VALUE, '000', 'crazyPixels',
				this.goFullscreen.position.x,
				this.gameMode.position.y + 128
			);
			this.timeSelector.onValueChanged(function(){
				game.TIME_VALUE = this.numberObject;
				game.storage.set('tv', game.TIME_VALUE);
			});
			this.timeSelector.addTo(this.stage);
			
			//Reset storage
			this.reset = new game.Sprite('res/gui/options/x.png', game.system.width - 1, game.system.height - 1,
				{
				anchor: {x: 1, y: 1},
				scale: {x: 3, y: 3}
				}
			);
			this.reset.setInteractive(true); this.reset.buttonMode = true;
			this.reset.click = this.reset.tap = function(){
				if (confirm('Do you want to remove all saved data?\nThis will restart the game')){
					game.storage.reset();
					game.system.setScene(MenuScene);
				}
			};
			this.stage.addChild(this.reset);
			
		},
		
		gameModeChanged: function(){
			game.storage.set('gm',game.GAME_MODE);
			
			this.gameModeName.setText(game.GAME_MODES[game.GAME_MODE]);
			
			this.lengthSelector.remove(); this.timeSelector.remove();
			if (game.GAME_MODES[game.GAME_MODE] == 'normal'){
				this.lengthSelector.addTo(this.stage);
			}else if (game.GAME_MODES[game.GAME_MODE] == 'time-attack'){
				this.lengthSelector.addTo(this.stage);
				this.timeSelector.addTo(this.stage);
			}
		},
		
		showBGChanged: function(){
			this.showBG.setText('BACKGROUND: '+((game.SHOW_BACKGROUND)?'ON':'OFF'));
			game.storage.set('sb', game.SHOW_BACKGROUND);
		},
		
		musicOnChanged: function(){
			this.musicOn.setText('MUSIC: '+((game.MUSIC_ON)? 'ON':'OFF'));
			game.storage.set('mo', game.MUSIC_ON);
			if (!game.MUSIC_ON) game.audio.stopMusic();
		}
		
	});
	
	
	/**
	 * XXX
	 * CREDITS SCENE
	 */
	
	CreditsScene = game.Scene.extend({
		
		init: function(){
			this.home = new HomeButton(function(){
				game.system.setScene(MenuScene);
			});
			this.home.addTo(this.stage);
			
			this.credits = new game.Sprite('res/gui/credits/credits.png',
					game.system.width/2,
					-100,
					{
						anchor: {x: 0.5, y: 0.5}
					}
			);
			this.credits.addTo(this.stage);
			
			var t = this.addTween(this.credits.position, {y: game.system.height*0.2}, 300, {easing: game.Tween.Easing.Bounce.Out}).start();
			t.onComplete(function(){
				var t2 = game.scene.addTween(game.scene.credits.scale, {x: 1.2, y:1.2}, 500, {easing:game.Tween.Easing.Quadratic.InOut}).repeat().yoyo().start();
			});
			
			this.addText();
		},
		
		addText: function(){
			var c = new game.Container();
			
			this.text = new game.BitmapText('FEDE0D - Pixelated Gears 2014', {font:'pixelated'});
			this.twitterBtn = new SpriteButton('res/gui/credits/twitter.png', {x:50, y: 60}, 1.4);
			this.mailBtn = new SpriteButton('res/gui/credits/mail.png', {x:50, y: 120}, 0.4);
			this.webBtn = new SpriteButton('res/gui/credits/web.png', {x:50, y: 180}, 1);
			
			this.twitterBtn.onAction = function(e){
				window.open('https://twitter.com/fede0d','_blank');
			};this.twitterBtn.enable();
			this.mailBtn.onAction = function(e){
				window.open('mailto:federicogpacheco@gmail.com', '_blank');
			};this.mailBtn.enable();
			this.webBtn.onAction = function(e){
				window.open('http://www.pixelatedgears.com.ar/','_blank');
			};this.webBtn.enable();
			
			var t = new game.BitmapText('@FEDE0D', {font:'pixelated'}); t.position.x = 80; t.position.y = 50;
			var m = new game.BitmapText('federicogpacheco@gmail.com', {font:'pixelated'}); m.position.x = 80; m.position.y = 110;
			var w = new game.BitmapText('pixelatedgears.com.ar', {font:'pixelated'}); w.position.x = 80; w.position.y = 170;
			this.musicText = new game.BitmapText('Music by SketchyLogic', {font:'pixelated'}); this.musicText.position.x = 0; this.musicText.position.y = 250;
			
			c.position.x = 40; c.position.y = 200;
			c.addChild(this.text);
			c.addChild(this.twitterBtn); c.addChild(t);
			c.addChild(this.mailBtn); c.addChild(m);
			c.addChild(this.webBtn); c.addChild(w);
			c.addChild(this.musicText);
			this.stage.addChild(c);
			
		}
		
	});
	
});