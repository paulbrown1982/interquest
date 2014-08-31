function Scene(id, backgroundURL, unlockedByArtefactWithId) {
	this.id = id;
	this.backgroundURL = backgroundURL;
	this.artefactsInPosition = [];
	this.charactersInPosition = [];
	this.unlockedByArtefactWithId = unlockedByArtefactWithId;
};
Scene.prototype.addArtefact = function(artefact, positionX, positionY) {
	this.artefactsInPosition.push({
		"artefact": artefact,
		"positionX": positionX,
		"positionY": positionY
	});
};
Scene.prototype.addCharacter = function(character, positionX, positionY) {
	this.charactersInPosition.push({
		"character": character,
		"positionX": positionX,
		"positionY": positionY
	});
}


var Scenes = {};