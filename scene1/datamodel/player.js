function Player() {
	this.scene = getScene();
	var sceneCount = this.getNumberOfScenes();
	// Sanitize scene variable
	if (this.scene <= 0 || this.scene > sceneCount) {
		this.scene = 0;
		this.moveToNextScene();
	}
};

Player.prototype.addArtefactToInventory = function(artefactToAdd) {
	var artefacts = getArtifacts() || [];
	var alreadyThere = false;
	artefacts.forEach(function(artefactId) {
		if (artefactId == artefactToAdd.id) {
			alreadyThere = true;
		}
	});
	if (!alreadyThere) {
		artefacts.push(parseInt(artefactToAdd.id, 10));
	}
	setArtifacts(artefacts);
};

Player.prototype.removeArtefactFromInventory = function(artefactToRemove) {
	var artefacts = getArtifacts();
	var newArtefacts = [];
	artefacts.forEach(function(artefactId) {
		if (artefactId != artefactToRemove.id) {
			newArtefacts.push(artefactId);
		}
	});
	setArtifacts(newArtefacts);
};

Player.prototype.clearPlayersInventory = function() {
	setArtifacts([]);
};

Player.prototype.listPlayersInventory = function() {
	var artefactIds = getArtifacts();
	var artefacts = [];
	artefactIds.forEach(function(artefactId) {
		artefacts.push(Artefacts[artefactId]);
	});
	return artefacts;
};

Player.prototype.getNumberOfScenes = function() {
	var sceneCount = 0;
	for (var s in Scenes) {
		if (Scenes.hasOwnProperty(s)) {
			sceneCount++;
		}
	}
	return sceneCount;
};

Player.prototype.moveToNextScene = function() {
	var sceneCount = this.getNumberOfScenes();
	if (this.scene <= sceneCount) {
		this.scene += 1;
	}
	setScene(this.scene);
};

Player.prototype.moveToPreviousScene = function() {
	if (this.scene > 1) {
		this.scene -= 1;
	}
	setScene(this.scene);
};

Player.prototype.getPlayersCurrentScene = function() {
	return Scenes[this.scene+""];	
};

var CurrentPlayer = new Player();
