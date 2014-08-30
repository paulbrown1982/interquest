(function() {
	var userJSON = window.localStorage["User"];
	var Player = JSON.parse(userJSON);
	
	var content = document.getElementById("hello");
	React.renderComponent(
	  React.DOM.h1({"id":"welcome-banner"}, 'Hello ' + Player.name),
	  content
	);

})();