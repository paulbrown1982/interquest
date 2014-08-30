var data={
    background_image: "images/unicorn-background.jpg",
    orverlayImages:[
        {
            imageUrl:"images/scroll.jpg",
            position: [
                100,
                100
            ],
            description: "scrolls are really cool."
        },
        {
            imageUrl:"images/rocket.jpg",
            position:[
                500,
                50
            ],
            description:"rockets are also cool!"
        }
    ]
}

var root_component = React.createClass({

    render: function(){
        var props = this.props;
        var background_image = props.background_image;
        var overlay_images = props.orverlayImages;

        return React.DOM.div({},
            React.DOM.img({src:background_image }, null ),
            overlay_images.map(overlayComponent),
            textComponent(),
            inventoryComponent()
        );
    }

});



var overlayComponent = React.createClass({
    
    addToInventory: function(){
        
    },
    
    onClick: function(){
        var props = this.props;
        var description = props.description;
        alert(description);
    },
    
    render: function(){
        var props = this.props;
        var imageUrl = props.imageUrl;
        var position = props.position;
        var transform = "translate(" + position[0] + "px, " + position[1] + "px)";
        var divStyle = {
            src:imageUrl,
            onClick: this.onClick,
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

var textComponent = React.createClass({
    render: function(){
        return React.DOM.div(
            {
                style:{
                    backgroundColor:"brown",
                    display:"inline-block"
                }
            },
            "Text will go here"
        );
    }
})


var inventoryComponent = React.createClass ({
    render: function(){
        return React.DOM.div(
        {
            style:
            {
                backgroundColor:"beige" ,
                display:"inline-block"
            }
        },
        "inventory will go here");
    }
    
});


var run_application = function() {
    var main_element_id = document.getElementById('content');

    React.renderComponent(root_component(data), main_element_id);

}

window.onload=run_application;
