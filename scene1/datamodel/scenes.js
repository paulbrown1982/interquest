function Scene(id, backgroundURL, unlockedByArtefactWithId) {
	this.id = id;
	this.backgroundURL = backgroundURL;
	this.artefactsInPosition = [];
	this.character = null;
	this.unlockedByArtefactWithId = unlockedByArtefactWithId;
};
Scene.prototype.addArtefact = function(artefact, positionX, positionY) {
	this.artefactsInPosition.push({
		"artefact": artefact,
		"positionX": positionX,
		"positionY": positionY
	});
};
Scene.prototype.setCharacter = function(character) {
	this.character = character;
	character.setSceneWhichImIn(this);
}

var Scenes = {};