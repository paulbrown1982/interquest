function Player() {
	this.scene = getScene();
	this._uniqueInventory = {};
	this.inventory = [];
};

Player.prototype._rebuildInventory = function() {
	var newInventory = [];
	for (var artefactId in this._uniqueInventory) {
		if (inventory.hasOwnProperty(artefactId)) {
			newInventory.push(artefactId);
		}
	}
	this.inventory = newInventory;
};

Player.prototype.addArtefactToInventory = function(artefact) {
	this._uniqueInventory[artefact.id] = true;
	this._rebuildInventory();
};

Player.prototype.removeArtefactFromInventory = function(artefactId) {
	var isThere = this._uniqueInventory[artefactId];
	if (isThere) {
		delete this._uniqueInventory[artefactId];
	}
	this._rebuildInventory();
	return Artefacts[artefactId];
};

Player.prototype.listPlayersInventory = function() {
	var inventoryList = [];
	this.inventory.forEach(function(artefactId)) {
		inventoryList.push(Artefacts[artefactId]);
	});
	return inventoryList;
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
	if (this.scene > 0) {
		this.scene -= 1;
	}
	setScene(this.scene);
};

Player.prototype.getPlayersCurrentScene = function() {
	return Scenes[this.scene+""];	
};

var CurrentPlayer = new Player();