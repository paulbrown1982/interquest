function Player() {
	this.scene = getScene();
	if (this.scene < 1) {
		this.moveToNextScene();
	}
};

Player.prototype.addArtefactToInventory = function(artefactIdToAdd) {
	var artefacts = getArtifacts() || [];
	var alreadyThere = false;
	artefacts.forEach(function(artefactId) {
		if (artefactId == artefactIdToAdd) {
			alreadyThere = true;
		}
	});
	if (!alreadyThere) {
		artefacts.add(artefactIdToAdd);
	}
	setArtifacts(artefacts);
};

Player.prototype.removeArtefactFromInventory = function(artefactIdToRemove) {
	var artefacts = getArtifacts();
	var newArtefacts = [];
	artefacts.forEach(function(artefactId) {
		if (artefactId != artefactIdToRemove) {
			newArtefacts.push(artefactId);
		}
	});
	setArtifacts(newArtefacts);
};

Player.prototype.listPlayersInventory = function() {
	return getArtifacts();
}

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