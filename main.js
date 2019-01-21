



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

        var move_X = e.clientX-$(current_card.target).position().left
        var move_Y = e.clientY-$(current_card.target).position().top;

        if (move_X >= 200) {
        $(current_card.target).width(e.clientX-$(current_card.target).position().left);
        }
        if (move_Y >= 200) {
        $(current_card.target).height(e.clientY-$(current_card.target).position().top);
        }
    }
}

