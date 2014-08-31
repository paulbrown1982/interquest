function Character(id, name, yearofbirth, yearofdeath, url, bio, sizex, sizey) {
	this.id = id;
	this.name = name;
	this.yearofbirth = parseInt(yearofbirth, 10);
	this.yearofdeath = parseInt(yearofdeath, 10);
	if (isNaN(this.yearofdeath)) {
  	this.yearofdeath = 0;
	}
	this.avatarURL = url;
	this.bio = bio,
	this.sizex = sizex;
	this.sizey = sizey;
};

Character.prototype.setSceneWhichImIn = function(scene) {
  this.scene = scene;
}

var Characters = {};

function getCharactersForTimeline() {
  var list = [];
  for (var characterId in Characters) {
    if (Characters.hasOwnProperty(characterId)) {
      var character = Characters[characterId];
      if (character.avatarURL != "") {
        list.push(character);
      }
    }
  }
  list = list.sort(function(a, b) {
    return (a.date - b.date);
  });
  return list;
}
