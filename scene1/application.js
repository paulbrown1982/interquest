

var data={
    background_image: "images/unicorn-background.jpg",
    orverlay_images:[
        {
            image_url:"images/scroll.jpg",
            position: [
                100,
                100
            ]
        }
    ]
}

var root_component = React.createClass({

    render: function(){
        var props = this.props;
        var background_image = props.background_image;
        var overlay_images = props.orverlay_images;

        return React.DOM.div({},
            React.DOM.img({src:background_image }, null ),
            overlay_component(overlay_images[0])
        );
    }

});



var overlay_component = React.createClass({
    render: function(){
        var props = this.props;
        var image_url = props.image_url;
        var position = props.position;
        
        var transform = "translate(" + position[0] + "px, " + position[1] + "px)";
        var divStyle = {
            src:image_url,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                transform: transform
                }
        };
        
        return React.DOM.img(divStyle, null);
    }
});


var run_application = function() {
    var main_element_id = document.getElementById('content');

    React.renderComponent(root_component(data), main_element_id);

}

window.onload=run_application;