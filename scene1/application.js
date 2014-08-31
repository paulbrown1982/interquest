(function (React, document, window) {
  'use strict';

  var Dispatcher = function () {
    var callbacks = {};

    this.register = function (callbackId, callback) {
      var list = callbacks[callbackId] = callbacks[callbackId] || [];
      if (list.indexOf(callback) === -1) {
        list.push(callback);
      }
    };

    this.dispatch = function (callbackId) {
      var list = callbacks[callbackId] || [],
          slice = Array.prototype.slice.call(arguments, 1, arguments.length);

      for (var i = 0; i < list.length; i++) {
        list[i].apply(null, slice);
      }
    };
  };
  var dispatcher = new Dispatcher();

  var components = {
    root: React.createClass({
      onInventoryChange: function () {
        this.setState({});
      },

      render: function () {
        var props = this.props,
            background_image = props.backgroundURL,
            artefacts = props.artefactsInPosition,
            attrs = {
              style: {
                backgroundImage: 'url("' + background_image + '")',
                width: '100%',
                height: '100%'
              },
            };

        var remaining = [];
        if (props.disabled) {
          attrs.style.WebkitFilter = 'grayscale(100%)';
          attrs.style.cursor = 'pointer';
          attrs.onClick = function () {
            dispatcher.dispatch('text:change', 'This page is locked');
          };
          attrs.onClick();
        } else {
          if (!this.props.rendered) {
            dispatcher.dispatch('text:change', props.charactersInPosition[0].character.bio);
            this.props.rendered = true;
          }
          var inventory = CurrentPlayer.listPlayersInventory();
          remaining = artefacts.filter(function (entity) {
            entity.key = entity.artefact.id;
            return inventory.indexOf(entity.artefact) === -1;
          });
        }

        dispatcher.register('inventory:change', this.onInventoryChange);
        return React.DOM.div(attrs, remaining.map(components.overlay));
      }
    }),

    navigation: React.createClass({
      render: function () {
        var attrs = {};
        return React.DOM.ul(attrs, actions.map(components.action))
      }
    }),

    action: React.createClass({
      render: function () {
        var props = this.props;
        var attrs = {
          href: '#',
          onClick: props.action
        };
        return React.DOM.li(null, React.DOM.a(attrs, props.text));
      }
    }),

    inventory: React.createClass({
      onInventoryChange: function () {
        this.setState({ items: CurrentPlayer.listPlayersInventory() });
      },

      render: function () {
        var items = [],
            state = this.state,
            attrs = {
              className: 'inventory'
            };
        if (state) {
          items = state.items.map(function (item) {
            item.key = item.id;
            return item;
          });
        }
        dispatcher.register('inventory:change', this.onInventoryChange);

        return React.DOM.ul(attrs, items.map(components.inventoryItem));
      }
    }),

    overlay: React.createClass({
      onClick: function () {
        var props = this.props,
            artefact = props.artefact,
            description = artefact.description;
        CurrentPlayer.addArtefactToInventory(artefact);
        dispatcher.dispatch('text:change', artefact.description);
        dispatcher.dispatch('inventory:change');
      },

      render: function () {
        var props = this.props;
        var artefact = props.artefact;
        var imageUrl = artefact.imageURL;
        var transform = "translate(" + props.positionX + "px, " + props.positionY + "px)";
        var attrs = {
          src:imageUrl,
          onClick: this.onClick,
          className: 'overlay-object',
          style: {
            WebkitTransform: transform,
            transform: transform,
            width: artefact.dimX,
            height: artefact.dimY
          }
        };

        return React.DOM.img(attrs, null);
      }
    }),

    text: React.createClass({
      onTextChange: function (text) {
        this.setState({ text: text });
      },

      render: function () {
        var text,
            state = this.state;
        if (state) {
          text = state.text;
        }
        dispatcher.register('text:change', this.onTextChange);
        return React.DOM.p(null, text);
      }
    }),

    inventoryItem: React.createClass({
      onClick: function () {
        dispatcher.dispatch('text:change', this.props.description);
      },

      render: function () {
        var props = this.props,
            attrs = {
              className: 'inventory-item',
              onClick: this.onClick,
              style: {
                backgroundImage: 'url(' + props.imageURL + ')'
              }
            };
        return React.DOM.li(attrs);
      }
    }),
    
    clearInventory: React.createClass({
      onClick: function () {
        CurrentPlayer.clearPlayersInventory();
        dispatcher.dispatch('scene:change');
        dispatcher.dispatch('inventory:change');
      },
      render: function() {
        var attrs = {
          href: "#",
          onClick: this.onClick
        };
        return React.DOM.a(attrs, "Clear Inventory");
      }
    }) 
  };

  var sceneElement;
  function renderScene(scene) {
    if (!scene) {
      alert('Oh no, something broke');
      return false;
    }

    var requiredId = scene.unlockedByArtefactWithId;
    if (requiredId) {
      if (!CurrentPlayer.containsArtefactWithId(parseInt(requiredId, 10))) {
        scene.disabled = true;
      } else {
        delete scene.disabled;
      }
    }

    React.renderComponent(components.root(scene), sceneElement);
    return true;
  };
  
  dispatcher.register('scene:change', function () {
    var scene = CurrentPlayer.getPlayersCurrentScene();
    if (scene) {
      renderScene(scene);
    }
  });

  var actions = [
    {
      text: 'reset',
      action: function () {
        CurrentPlayer.reset();
        dispatcher.dispatch('scene:change');
        dispatcher.dispatch('inventory:change');
      }
    },
    {
      text: '< Previous',
      action: function () {
        CurrentPlayer.moveToPreviousScene();
        dispatcher.dispatch('scene:change');
      }
    },
    {
      text: 'Next >',
      action: function () {
        CurrentPlayer.moveToNextScene();
        dispatcher.dispatch('scene:change');
      }
    }
  ];

  function showGameContainer() {
  	var gameContainerElement = document.getElementById('game-container');
  	gameContainerElement.style.display = "block";
  }

  function hideHomepage() {
	var homepageElement = document.getElementById('homepage');
  	homepageElement.style.display = "none";
  }
  
  function showHomepage() {
	  var homepageElement = document.getElementById('homepage');
  	homepageElement.style.display = "block";
  }

  window.startGame = function () {
  	hideHomepage();
  	showGameContainer();

  	CurrentPlayer.setPlayedBefore();
    sceneElement = document.getElementById('game-bg-layer');
    var textElement = document.getElementById('text-bg-layer');
    React.renderComponent(components.text(), textElement);

    var inventoryElement = document.getElementById('inv-bg-layer');
    React.renderComponent(components.inventory(), inventoryElement);

    var navigationElement = document.getElementById('navigation');
    React.renderComponent(components.navigation(), navigationElement);

    var clearInventoryElement = document.getElementById('clear-inventory');
    React.renderComponent(components.clearInventory(), clearInventoryElement);

    var scene = CurrentPlayer.getPlayersCurrentScene();
    if (renderScene(scene)) {
      dispatcher.dispatch('inventory:change');
    }
  };

  window.onload = function() {
	  if (CurrentPlayer.hasPlayedBefore()) {
		  window.startGame()
	  } else {
		  showHomepage();
	  }
  }
}).call(this, React, document, window);
