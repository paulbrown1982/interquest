function Scene(id, backgroundURL) {
	this.id = id;
	this.backgroundURL = backgroundURL;
	this.artefactsInPosition = [];
	this.charactersInPosition = [];
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