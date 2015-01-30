game.module('game.Hero').require('engine.sprite').body(function(){
	
	Hero = game.Sprite.extend({
		
		/**
		 * container: Container
		 * location: Point
		 * jumpTime: int
		 * fallTime: int
		 */
		
		init: function(parentContainer){
			this._super('res/hero-up.png');
			
			this.container = parentContainer;
						
			this.location = {x: 0, y:0};
			this.jumpTime = 140;
			this.fallTime = 1200;
			
			this.scale = {x: game.SCALE, y: game.SCALE};
			this.anchor = {x: 0.5, y: 0.5};
			this.position = {x: game.system.width*0.5, y: game.system.height*0.85};
			
			this.addTo(this.container);
		},
		
		getCurrentPlatform: function(){
			return game.scene.game.pcontroller.getPlatform(this.location.x, this.location.y);
		},
		
		canJumpToPlatform: function(p){
			return (
					(p.parentLine == this.getCurrentPlatform().parentLine)||
					(p.parentLine.hpos == this.getCurrentPlatform().parentLine.hpos+1)
				);
		},
		
		jumpToPlatform: function(p){
			this.getCurrentPlatform().onLeave();
			this.location.x = p.wpos;
			this.location.y = p.parentLine.hpos;
			this.getCurrentPlatform().onEnter();
			
			var newPos = this.getCurrentPlatform().position.clone();
			newPos.y -= 25;
			var anim = game.scene.addTween(this.position, newPos, this.jumpTime, {easing: game.Tween.Easing.Quadratic.InOut}).start();
		},
		
		onFall: function(){
			this.fallAnimate();
			game.scene.game.gameOver();
		},
		
		moveToTop: function(){
			this.remove();
			this.addTo(this.container);
		},
		
		fallAnimate: function(){
			var newPos = this.getCurrentPlatform().position.clone();
			newPos.y += 30;
			
			var anim = game.scene.addTween(this.position, newPos, this.fallTime, {easing: game.Tween.Easing.Quadratic.Out}).start();
			var animAlpha = game.scene.addTween(this, {alpha: 0}, this.fallTime, {easing: game.Tween.Easing.Quadratic.Out}).start();
		},
		
		partyAnimate: function(){
			if (!this.getCurrentPlatform().parentLine.isHeaven) return;
			var newPos = this.getCurrentPlatform().position.clone();
			
			this.position = {
				x: newPos.x,
				y: newPos.y - 25
			};
			newPos.y = this.position.y - 30;
			var anim = game.scene.addTween(this.position, newPos, 250, {easing: game.Tween.Easing.Back.In}).repeat().yoyo().start();
		}
		
	});
	
});