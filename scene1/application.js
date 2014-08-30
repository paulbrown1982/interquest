(function (React) {
  'use strict';

  var dispatcher = {
    dispatch: function () {
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
        alert(description);
      },

      render: function () {
        var props = this.props;
        var artefact = props.artefact;
        var imageUrl = artefact.imageURL;
        var transform = "translate(" + props.positionX + "px, " + props.positionY + "px)";
        var divStyle = {
          src:imageUrl,
          onClick: this.onClick,
          class: 'overlay-object',
          style: {
            transform: transform,
            width: artefact.dimX,
            height: artefact.dimY
          }
        };

        return React.DOM.img(divStyle, null);
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
  };
}).call(this, React);
