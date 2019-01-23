


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


document.querySelector('.button').addEventListener('click', () => {
	document.querySelector('.side-menu').classList.toggle('hidden');
})

//$(document).find(".card").hover( cardOptionsIn, cardOptionsOut );

/*
var cards = document.getElementsByClassName('card');


console.log(cards.length);

for (let card of cards) {
    console.log(card);
    card.onmouseenter = function() {cardOptionsIn(card);}
    card.onmouseleave = function() {cardOptionsOut(card);}
}


function cardOptionsIn(e) {
    console.log("hovered");
}


function cardOptionsOut(e) {
    
}
*/

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

