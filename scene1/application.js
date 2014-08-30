(function (React, document, window) {
  'use strict';

  var dispatcher = {
    register: function (callbackId, callback) {
    },

    dispatch: function (callbackId) {
    }
  };

  var components = {
    root: React.createClass({
      render: function() {
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

        return React.DOM.div(attrs, artefacts.map(components.overlay));
      }
    }),

    overlay: React.createClass({
      addToInventory: function () {},

      onClick: function () {
        var props = this.props;
        var artefact = props.artefact;
        var description = artefact.description;
        dispatcher.dispatch('text:change', artefact.description);
      },

      render: function () {
        var props = this.props;
        var artefact = props.artefact;
        var imageUrl = artefact.imageURL;
        var transform = "translate(" + props.positionX + "px, " + props.positionY + "px)";
        var divStyle = {
          src:imageUrl,
          onClick: this.onClick,
          className: 'overlay-object',
          style: {
            transform: transform,
            width: artefact.dimX,
            height: artefact.dimY
          }
        };

        return React.DOM.img(divStyle, null);
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
        console.log('RENDER');
        return React.DOM.p(null, text);
      }
    })
  };

  var sceneElement;
  function renderScene(scene) {
    if (!scene) {
      alert('something broke');
    }
    React.renderComponent(components.root(scene), sceneElement);
  };

  window.onload = function () {
    sceneElement = document.getElementById('game-bg-layer');
    var scene = CurrentPlayer.getPlayersCurrentScene();
    renderScene(scene);

    var textElement = document.getElementById('text-bg-layer');
    React.renderComponent(components.text(), textElement);
  };
}).call(this, React, document, window);
