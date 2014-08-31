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

      setTimeout(function () {
        for (var i = 0; i < list.length; i++) {
          list[i].apply(null, slice);
        }
      }, 10);
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
          attrs.style.filter = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")';
          attrs.style.WebkitFilter = 'grayscale(100%)';
          attrs.style.cursor = 'pointer';
          attrs.onClick = function () {
            dispatcher.dispatch('text:change', 'This page is locked. Find the artefact needed to unlock it!');
          };
          attrs.onClick();
        } else {
          if (!this.props.rendered) {
            dispatcher.dispatch('text:change', props.character.bio);
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
        return React.DOM.li(null, React.DOM.a(attrs, props.key));
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
    }),
    
    renderHomepageBios: React.createClass({
      render: function() {
        return React.DOM.p(null, Characters[this.props].bio);
      }
    }),
    
    timelineItem: React.createClass({
      onClick: function () {
        CurrentPlayer.moveToScene(this.props.scene.id);
        dispatcher.dispatch('scene:change', this.props.description);
      },

      render: function () {
        var props = this.props;
        var attrs = {
          className: 'timeline-item',
          style: {
          }
        };
        var enabled = true;
        if (props.scene) {
          var requiredId = props.scene.unlockedByArtefactWithId;
          if (requiredId) {
            enabled = CurrentPlayer.containsArtefactWithId(parseInt(requiredId, 10));
          }
        }
        if (enabled) {
          attrs.style.backgroundImage = 'url(' + props.avatarURL + ')';
          if (props.scene) {
            attrs.style.cursor = "pointer";
            attrs.onClick = this.onClick;
            if (CurrentPlayer.scene == parseInt(props.scene.id, 10)) {
              attrs.style.border = '1px solid #00FFFB';
            }
          }
        } else {
          attrs.style.backgroundImage = 'url(' + ')';
        }
        return React.DOM.li(attrs);
      }
    }),

    renderTimeline: React.createClass({
      updateTimeline: function() {
        this.setProps({ timeline: getCharactersForTimeline() });
      },

      render: function() {
        var props = this.props,
            attrs = {};
        dispatcher.register('inventory:change', this.updateTimeline);
        dispatcher.register('scene:change', this.updateTimeline);
        return React.DOM.ul(attrs, props.timeline.map(components.timelineItem));
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
      key: 'reset',
      action: function () {
        CurrentPlayer.reset();
        dispatcher.dispatch('scene:change');
        dispatcher.dispatch('inventory:change');
        window.showBioFor(null);
        setElementDisplay('game-container', 'none');
        setElementDisplay('homepage', 'block');
      }
    },
    {
      key: '« Previous',
      action: function () {
        CurrentPlayer.moveToPreviousScene();
        dispatcher.dispatch('scene:change');
      }
    },
    {
      key: 'Next »',
      action: function () {
        CurrentPlayer.moveToNextScene();
        dispatcher.dispatch('scene:change');
      }
    }
  ];

  function setElementDisplay(elementId, display) {
    document.getElementById(elementId).style.display = display;
  }

  window.showBioFor = function(name) {
    var self = window.showBioFor;
    self.adasBioElement = self.adasBioElement || document.getElementById("ada-bio");
    self.alansBioElement = self.alansBioElement || document.getElementById("alan-bio");
    self.adasImageElement = self.adasImageElement || document.getElementById("ada-image");
    self.alansImageElement = self.alansImageElement || document.getElementById("alan-image");
    
    var currentBioElement;
    
    if (name == "ada") {
      currentBioElement = self.adasBioElement;
      currentBioElement.style.display = "block";
      self.alansBioElement.style.display = "none";
      self.adasImageElement.style.display = "block";
      self.alansImageElement.style.display = "none";
    } else if (name == "alan") {
      currentBioElement = self.alansBioElement;
      currentBioElement.style.display = "block";
      self.adasBioElement.style.display = "none";
      self.adasImageElement.style.display = "none";
      self.alansImageElement.style.display = "block";
    } else {
      self.adasBioElement.style.display = "none";
      self.alansBioElement.style.display = "none";
      self.adasImageElement.style.display = "block";
      self.alansImageElement.style.display = "block";
      return;
    }
    
    var characterId = currentBioElement.getAttribute("data-character-id");
    React.renderComponent(components.renderHomepageBios(characterId), currentBioElement);
  };

  window.startGame = function () {
    setElementDisplay('homepage', 'none');
    setElementDisplay('game-container', 'block');

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

    var timelineElement = document.getElementById('timeline');
    React.renderComponent(components.renderTimeline({ timeline: getCharactersForTimeline() }), timelineElement);

    var scene = CurrentPlayer.getPlayersCurrentScene();
    if (renderScene(scene)) {
      dispatcher.dispatch('inventory:change');
    }
  };

  window.onload = function() {
	  if (CurrentPlayer.hasPlayedBefore()) {
		  window.startGame();
	  } else {
      setElementDisplay('homepage', 'block');
	  }
  }
}).call(this, React, document, window);
