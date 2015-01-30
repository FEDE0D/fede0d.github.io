game.module('game.Items').require('engine.sprite').body(function(){
	

	Item = game.Class.extend({
		
//		parentPlatform: {},
//		scoreValue: 0,
//		multiplyValue: 1,
		
		init: function(parent, scoreValue, multiplyValue){
			this.parentPlatform = parent;
			
			this.scoreValue = scoreValue;
			this.multiplyValue = multiplyValue;
		},
		
		onCollect: function(){
			if (this.scoreValue != 0){
				game.scene.game.scoreAdd(this);
			}else if (this.multiplyValue != 1){
				game.scene.game.scoreMultiply(this);
			}
		}
		
	});
	
	DrawableItem = Item.extend({
		
//		item: {},
		
		init: function(parent, scoreValue, multiplyValue, imgPath){
			this._super(parent, scoreValue, multiplyValue);
			this.item = new game.Sprite(imgPath);
			this.item.anchor = {x:0.5, y:1};
			
			parent.addChild(this.item);
			
			var t = game.scene.addTween(this.item.position, {y: this.item.position.y - 5}, 300, {easing: game.Tween.Easing.Quadratic.InOut}).repeat().yoyo().start();
		},
		
		onCollect: function(){
			this._super();
			var self = this;
			var t = game.scene.addTween(this.item, {alpha: 0}, 100).start();
			t.onComplete(function(){
				self.item.remove();
			});
		}
		
	});
	
	PikesItem = Item.extend({
		
		init: function(parent){
			this._super(parent, 0, 0.5);
		}
		
	});
	
	TomatoItem = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 1, 1, 'res/items/tomato.png');			
		}
		
	});
	
	BurgerItem = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 5, 1, 'res/items/burger.png');
		}
		
	});
	
	CoinItem = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 10, 1, 'res/items/coin.png');
		}
		
	});
	
	MoneyItem = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 100, 1, 'res/items/money.png');
		}
		
	});
	
	x2Item = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 0, 2, 'res/multipliers/x2.png');
		}
		
	});
	
	x5Item = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 0, 5, 'res/multipliers/x5.png');
		}
		
	});
	
	x10Item = DrawableItem.extend({
		
		init: function(parent){
			this._super(parent, 0, 10, 'res/multipliers/x10.png');
		}
		
	});
	
});