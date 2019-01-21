



var current_card = null;

var mode = "move";
var modes = ["resize", "move"]

$(document).mousedown(function(event) {
    console.log("clicked");
    current_card = event;
})

$(document).mouseup(function(event) {
    current_card = null;
})

$(document).mousemove(function(event) { updateSize(event); } );



function updateSize(e) {
    if (current_card != null) {
        $(current_card.target).width(e.clientX-$(current_card.target).position().left);
        $(current_card.target).height(e.clientY-$(current_card.target).position().top);
    }
}

