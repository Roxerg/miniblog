


var current_card = null;

var mode = "move";
var modes = ["resize", "move"]

var hidden = false;
/*
$(document).mousedown(function(event) {
    console.log("clicked");
    var target = $(event.target);
    if (target.hasClass("card")) {
        current_card = event;
    }
    else if (target.is("#card-text")) {
        event.target = target.parent(); 
        current_card = event;
    }
})
*/



function toggleExpand(elem) {
    var card = elem.parentNode
    var cardtext = card.querySelector("#card-text");
    cardtext.classList.toggle("card-text-toggle");
    card.classList.toggle("card-toggle");

    var btns = card.getElementsByClassName("twitter-share-button")
    btns[0].classList.toggle("hidden");
    btns[1].classList.toggle("hidden");
    btns[2].classList.toggle("hidden");
}


var nodes = document.getElementsByClassName("cutoff");


for (var i=0; i<(nodes.length); i++) {
    var el = document.createElement("div");
    el.innerHTML = "Expand";
    el.id = "expand";
    nodes[i].parentNode.insertBefore(el, nodes[i]);
}







$(document).mouseup(function(event) {
    current_card = null;
})


document.querySelector('.button').addEventListener('click', () => {
    document.querySelector('.side-menu').classList.toggle('hidden');
    document.querySelector('.padding.left').classList.toggle('hidden');
    document.querySelector('.padding.right').classList.toggle('hidden');
})

var hover_main = false;
var hover_second = false;


document.querySelector('.rokasg').addEventListener("click", () => {
    
    if (hover_main) {
        hover_main = false;
    }
    else {
        hover_main = true;
    }
    
    hoverHandler();
}, false)

document.querySelector('.rokasg-menu').addEventListener("mouseover", () => {
    hover_second = true;
    hoverHandler();
}, false)

document.querySelector('.rokasg-menu').addEventListener("mouseout", () => {
    hover_second = false;
    hoverHandler();
}, false)

document.querySelector('.rokasg').addEventListener("mouseover", () => {
    hover_main = true;
    hoverHandler();
    //document.querySelector('.rokasg-menu').classList.remove("hidden");
}, false)

document.querySelector('.rokasg'),addEventListener("mouseout", () => {
    hover_main = false;
    hoverHandler();
        //document.querySelector('.rokasg-menu').classList.add("hidden");
}, false)

function hoverHandler() {
    if (hover_main || hover_second) {
        document.querySelector('.rokasg-menu').classList.remove("hidden");
        console.log("either");
    }
    else {
        document.querySelector('.rokasg-menu').classList.add("hidden");
        console.log("none");
    }
}



var containingDiv = document.getElementById('cards');

function doSomething() {
  alert("Something");
}

containingDiv.addEventListener('click', function(e) {
    console.log(e.target.tagName);


  //if("card-text" == e.target.getAttribute("id")) {
  //    window.location.href = e.target.getAttribute("href");
  //}

  //if("P" == e.target.tagName || "H2" == e.target.tagName || "H3" == e.target.tagName || "H4" == e.target.tagName || "H1" == e.target.tagName) {
    
  //  window.location.href = e.target.parentNode.getAttribute("href");
  //}
    
  if('button-1' == e.target.getAttribute("id")) {
    e.target.parentNode.remove();
  }

  if("expand" == e.target.getAttribute("id")) {
    e.target.parentNode.getElementsByClassName("cutoff")[0].classList.toggle("show");
  }
}, false);  





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

