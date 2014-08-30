function Player() {
	this.scene = "1";
	this.inventory = {};	
};

Player.prototype.addArtefactToInventory = function(artefact) {
	this.inventory[artefact.id] = artefact;
};

Player.prototype.removeArtefactFromInventory = function(artefactId) {
	var artefact = this.inventory[artefactId];
	if (!!artefact) {
		delete this.inventory[artefactId];
	}
	return artefact;
};

Player.prototype.moveToNextScene = function() {
	var sceneCount = 0;
	for (var s in Scenes) {
		if (Scenes.hasOwnProperty(s)) {
			sceneCount++;
		}
	}
	if (this.scene == (sceneCount - 1)) {
		this.scene += 1;
	}
};

Player.prototype.moveToPreviousScene = function() {
	if (this.scene > 0) {
		this.scene -= 1;
	}
};

Player.prototype.getPlayersCurrentScene = function() {
	return Scenes[this.scene];	
};

var CurrentPlayer = new Player();