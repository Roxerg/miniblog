



var current_card = null;

var mode = "move";
var modes = ["resize", "move"]

var hidden = false;

$(document).mousedown(function(event) {
    console.log("clicked");
    if ($(event.target).hasClass("card")) {
        current_card = event;
    }
})

$(document).mouseup(function(event) {
    current_card = null;
})

$(document).mousemove(function(event) { updateSize(event); } );


function toggleMenu() {
    var menu_content = $(document).find('.side-menu-content');
    var menu = $(document).find('.side-menu');
    var cont = $(document).find('.card-container');

    if (hidden) {
        //menu_content.css("visibility", "visible");
        menu_content.fadeIn();
        menu.css("width", "200px");
        cont.css("min-width", "86.2%");
        hidden = false;
    }
    else {
        //menu_content.css("visibility", "hidden");
        menu_content.fadeOut();
        menu.css("width", "0px");
        cont.css("min-width", "100%");
        hidden = true;
    }
    

}


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

