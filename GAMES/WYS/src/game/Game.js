game.module('game.Game')
.require(
	'game.Score',
	'game.Platforms',
	'game.Hero',
	'game.Backgrounds',
	'game.Camera'
).body(function(){
	
	Game = game.Class.extend({
		
		/**
		 * container: Container
		 * score: Score
		 * background: Background
		 * pcontroller: PlatformController
		 * hero: Hero
		 * camera: Camera
		 * cmanager: CloudManager
		 * isGameOver: boolean
		 * isStarted: boolean
		 */
		
		init: function(parentContainer){
			this.container = new game.Container();
			
			this.score = new Score();
			this.background = game.getBackground();
			this.pcontroller = new PlatformController(this.container);
			this.hero = new Hero(this.container);
			this.camera = new Camera(this.hero); this.camera.addTo(this.container);
			this.cmanager = new CloudManager(this.container);
			this.isGameOver = false;
			this.isStarted = false;
			
			parentContainer.addChild(this.container);
		},
		
		start: function(){
			this.isStarted = true;
			
			this.background.enable();
			this.pcontroller.start();
			this.cmanager.start();
		},
		
		gameOver: function(){
			if (this.isGameOver) return;
			
			this.isGameOver = true;
			
			this.hero.partyAnimate();
			this.background.disable();
			this.pcontroller.stop();
			this.cmanager.stop();
			this.saveScore();
			
			game.scene.onGameOver();
		},
		
		scoreAdd: function(item){
			this.score.addScore(item.scoreValue);
			
			game.scene.gui.popText((item.scoreValue>0?'+':'')+item.scoreValue, item.parentPlatform.position);
			game.scene.onScoreChanged();
		},
		
		scoreMultiply: function(item){
			this.score.multiplyScore(item.multiplyValue);
			
			game.scene.gui.popText(item.multiplyValue>1? 'x'+item.multiplyValue:'%'+Math.round(1/item.multiplyValue), item.parentPlatform.position);
			game.scene.onScoreChanged();
		},
		
		stepAdd: function(){
			this.score.player_steps = this.hero.location.y;
			game.scene.onScoreChanged();
		},
		
		saveScore: function(){
			var hdata = new HighscoreData();
			var score = game.scene.game.score;
			
			score.player_steps = this.hero.location.y;
			
			hdata.addScore(score);
		},
		
		keydown: function(k){
			if (this.hero.position.y > this.camera.position.y )
				this.pcontroller.keydown(k);
		}
	
		
	});
	
});