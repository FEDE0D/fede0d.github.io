game.module('game.Camera').require('engine.camera').body(function(){
	

	/**
	 * @class Camera
	 */
	
	Camera = game.Camera.extend({
		
//		hero: {},
//		controller: {},
		
		init: function(hero){
			this._super();
			this.minX = this.maxX = 0;
			this.maxY = 0;
			this.offset.y = game.system.height*0.8;
			
			this.hero = hero;
			this.controller = game.scene.controller;
			
			this.follow(this.hero);
		}
		
	});
	
});