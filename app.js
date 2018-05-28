var memory_array = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
var memory_array6x6 = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18'];
var memmory_array_shufled = [];
var memory_values = [];
var memory_card_ids = [];
var cards_flipped = 0;
var button = document.getElementById("b");

// select the grid
function getvalue() {
    var radio = document.getElementsByName("a");
    var result;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            result = radio[i].value;
        }
    }
    return parseInt(result);
}

// Shuffling function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


newboard();

// onclick new board will generate
button.onclick = newboard;

// Generate the newboard function
function newboard() {
    memmory_array_shufled = [];
    if (getvalue() === 6) {
        memmory_array_shufled = shuffleArray(memory_array6x6);
    } else if (getvalue() === 4) {
        memmory_array_shufled = shuffleArray(memory_array);
    }

    document.getElementById('memory_board').innerHTML = "";
    cards_flipped = 0;
    var board = '';

    for (var i = 0; i < memmory_array_shufled.length; i++) {
        var d = document.createElement("div");
        d.setAttribute("class", "tile");

        var divcontainer = document.createElement("div");
        var value = memmory_array_shufled[i];

        if (getvalue() === 6) {
            divcontainer.setAttribute("class", "col-2 divcontainer");
            divcontainer.style.height = "16%";
        } else if (getvalue() === 4) {

            divcontainer.setAttribute("class", "col-3 divcontainer");
        }
        divcontainer.style.float = "left";
        d.id = "card" + i;

        d.value = memmory_array_shufled[i];

        d.addEventListener("click", function () {
            check(this);
        }, false);

        divcontainer.appendChild(d);

        document.getElementById('memory_board').appendChild(divcontainer);

        $(divcontainer).hide().slideDown("slow");
    }
}

// Check the shuffle card is matched or not...
function check(card) {
    var memory_return;
    if (card.innerHTML === "" && memory_values.length < 2) {
        card.innerHTML = card.value;
        $(card).animate({
            backgroundColor: "white",
        }, 500);

        if (memory_values.length === 0) {
            memory_values.push(card.value);
            memory_card_ids.push(card.id);

        } else if (memory_values.length == 1) {

            memory_values.push(card.value);
            memory_card_ids.push(card.id);

            if (memory_values[0] == memory_values[1]) {

                cards_flipped += 2;
                var a = document.getElementById(memory_card_ids[0]);
                var b = document.getElementById(memory_card_ids[1]);
                $(a).add(b).css("border", "#4CAF50 1px solid");

                $(a).add(b).animate({
                    backgroundColor: "#4CAF50",
                    color: "white"
                }, 300);

                memory_values.length = 0;
                memory_card_ids.length = 0;

                if (cards_flipped === memmory_array_shufled.length) {

                    $("#memory_board").empty();
                    var p = $("<p>");
                    p.text("Congratulations! You have done it");

                        p.css({
                            "font-size": "250%",
                            "color": "#14DBB3",
                            "margin": "200px auto",
                            "text-align": "center",
                            "font-weight": "700"
                        });

                    p.hide();
                    $("#memory_board").append(p);
                    p.slideDown("slow");
                }
            } else

                memory_return = function () {
                var a = document.getElementById(memory_card_ids[0]);
                var b = document.getElementById(memory_card_ids[1]);

                a.innerHTML = "";
                $(a).animate({
                    backgroundColor: "#14DBB3"
                }, 500);

                b.innerHTML = "";
                $(b).animate({
                    backgroundColor: "#14DBB3"
                }, 500);
                memory_values.length = 0;
                memory_card_ids.length = 0;
            };
            setTimeout(memory_return, 700);
        }
    }
}
