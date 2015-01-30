game.module('game.Score')
.body(function(){
	
	/**
	 * @class Score
	 */
	
	Score = game.Class.extend({
		/**
		 * game_mode: int
		 * length_value: int
		 * time_value: int
		 * player_score: int
		 * player_steps: int
		 * player_time: int
		 * isHighscore: boolean
		 */
		
		init: function(){
			this.game_mode = game.GAME_MODE;
			this.length_value = game.LENGTH_VALUE;
			this.time_value = game.TIME_VALUE;
			this.player_score = 0;
			this.player_steps = 0;
			this.player_time = 0;
			this.isHighscore = false;
		},
		
		imBetterThan: function(other){
			if (other == null) return true;
			
			if (game.GAME_MODES[this.game_mode] == 'normal'){
				return (this.player_score > other.player_score);
			}else if (game.GAME_MODES[this.game_mode] == 'time-attack'){
				return (this.player_score/this.player_time > other.player_score/other.player_time);
			}else if (game.GAME_MODES[this.game_mode] == 'arcade'){
				return (this.player_steps > other.player_steps);
			}
				
			return false;
		},
		
		addScore: function(value){
			this.player_score += value;
			if (this.player_score < 0) this.player_score = 0;
		},
		
		multiplyScore: function(value){
			this.player_score *= value;
			this.player_score = Math.round(this.player_score);
		},
		
		getString: function(){
			if (game.GAME_MODES[this.game_mode] == 'normal')		return '+'+this.player_score+'';
			else if (game.GAME_MODES[this.game_mode] == 'arcade')	return this.player_steps+'\n+'+this.player_score;
		},
		
		getScoreString: function(){
			if (game.GAME_MODES[this.game_mode] == 'normal')		return this.player_score+' points';
			else if (game.GAME_MODES[this.game_mode] == 'arcade')	return this.player_steps+' steps\n'+this.player_score+' points';
		}
		
	});
	
	
	/**
	 * @class HighscoreData
	 */
	
	HighscoreData = game.Class.extend({
		
//		normalMode: null,
//		timeMode: null,
//		arcadeMode: null,
//		current_score: null,
		current_highscore: false,
		
		init: function(){
			this.recoverFromStorage();
		},
	
		addScore: function(score){
			var highscore = false;
			if (game.GAME_MODES[score.game_mode] == 'normal'){
				if (score.imBetterThan(this.normalMode)){
					this.normalMode = score;
					highscore = true;
				}
			}else if (game.GAME_MODES[score.game_mode] == 'arcade'){
				if (score.imBetterThan(this.arcadeMode)){
					this.arcadeMode = score;
					highscore = true;
				}
			}
			score.isHighscore = highscore;
			this.saveToStorage();
		},
				
		recoverFromStorage: function(){
			this.normalMode = game.storage.get('nmHS', null);
			this.timeMode = game.storage.get('tmHS', null);
			this.arcadeMode = game.storage.get('amHS', null);
		},
		
		saveToStorage: function(){
			game.storage.set('nmHS', this.normalMode);
			game.storage.set('tmHS', this.timeMode);
			game.storage.set('amHS', this.arcadeMode);
		}
		
	});
	
	
});