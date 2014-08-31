
function importCharacters(json) {
	json.feed.entry.forEach(function(character) {
		with (character) {
			var character = new Character(gsx$character.$t, gsx$name.$t, gsx$url.$t, gsx$bio.$t, gsx$dimx.$t, gsx$dimy.$t);
			Characters[character.id] = character;
		}
	});
}

function importScenes(json) {
	json.feed.entry.forEach(function(scene) {
		with (scene) {
			var scene = new Scene(gsx$scene.$t, gsx$background.$t, gsx$unlockedby.$t);
			Scenes[scene.id] = scene;
		}
	});
}

function importArtefacts(json) {
	json.feed.entry.forEach(function(artefact) {
		with (artefact) {
			var artefact = new Artefact(gsx$artefact.$t, gsx$name.$t, gsx$description.$t, gsx$dimx.$t, gsx$dimy.$t, gsx$url.$t );
			Artefacts[artefact.id] = artefact;
		}
	});
}

function importSceneArtefacts(json) {
	json.feed.entry.forEach(function(sceneArtefacts) {
		with (sceneArtefacts) {
			var artefact = Artefacts[gsx$artefact.$t];
			var scene = Scenes[gsx$scene.$t];
			scene.addArtefact(artefact, gsx$positionx.$t, gsx$positiony.$t);
		}
	});
}

function importSceneCharacters(json) {
	json.feed.entry.forEach(function(sceneCharacters) {
		with (sceneCharacters) {
			var scene = Scenes[gsx$scene.$t];
			var character = Characters[gsx$character.$t];
			scene.addCharacter(character, gsx$positionx.$t, gsx$positiony.$t);
		}
	});
}


