//console.log("inside gamesController.js");

function buildCards(num, numCardsInMatch, word_array, partner1_array, partner2_array, partner3_array) {
    //console.log("inside buildCards");
    num_cards = num;
    num_each_group = num_cards / numCardsInMatch;
    //console.log("num_cards: ", num_cards);
    //console.log("num_each_group: ", num_each_group);
    $(".games_cards_container").empty();
    var div_array = [];
    for (var i = 0; i < num_each_group; i++) {
        //console.log("inside forloop, i: ", i);
        var card_word = $("<button>");
        card_word.addClass("cards");
        card_word.attr("id", "word" + (i + 1));
        card_word.text(word_array[i]);
        //console.log("card_word: ", card_word);
        var card_partner1 = $("<button>");
        card_partner1.addClass("cards");
        card_partner1.attr("id", "partner1-" + (i + 1));
        card_partner1.text(partner1_array[i]);
        //console.log("card_partner1: ", card_partner1);
        div_array.push(card_word, card_partner1);
    }
    shuffled_div_array = fisherYates(div_array);
    //console.log("inside buildCards, shuffled_div_array: ", shuffled_div_array);

    for (var k = 0; k < shuffled_div_array.length; k++) {
        $(".games_cards_container").append(shuffled_div_array[k]);
    }



    /*  if (partner2_array.length > 0)
         console.log("inside if partner2");
         var card_partner2 = $("<div>");
         card_partner2.addClass("card");
         card_partner2.attr("id", "partner2-" + (i+1));
         card_partner2.text(partner2_array);
         $(".games_cards_container").append(card_partner2);
     if (partner3_array)
         console.log("inside if partner3");
         var card_partner3 = $("<div>");
         card_partner3.addClass("card");
         card_partner3.attr("id", "partner3-" + (i+1));
         card_partner3.text(partner3_array);
         $(".games_cards_container").append(card_partner3); */
}

function fisherYates(card_array) {
    //console.log("inside shuffleCards, card_array: ", card_array);
    var i = card_array.length;
    if (i == 0)
        return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = card_array[i];
        var tempj = card_array[j];
        card_array[i] = tempj;
        card_array[j] = tempi;
    }
    //console.log("card_array after shuffle: ", card_array)
    return card_array;
}

function emptyResultsTable() {
    $("#results_table").empty();
}

function matchPartners(response, chosenCards) {
    //console.log("inside matchPartners, chosenCards: ", chosenCards);
    //console.log("response: ", response);
    console.log("response[0].word: ", response[0].word);
    console.log("inside matchPartners, chosenCards[0]", chosenCards[0]);
    var chosenWord1 = chosenCards[0];
    var chosenWord2 = chosenCards[1];
    console.log("chosenWord1: ", chosenWord1);
    console.log("chosenWord2: ", chosenWord2);
    console.log("response.length: ", response.length);
    var responseWord = "";
    var check = false;
    for (var n =0; n< response.length; n++) {
        //console.log("n: ", n);
        responseWord = response[n].word;
        //console.log("responseWord: ", responseWord);
        //console.log("response[n].word: ", response[n].word);
        if (chosenWord1 === responseWord) {
            console.log("inside if");
            check = checkMatch(response[n], chosenWord2);
            if (check) {
                break;
            }

        } else if (chosenWord2 === responseWord) {
            console.log("inside else if");
            check = checkMatch(response[n], chosenWord1);
            if (check) {
                break;
            }
        } else {
            $("#games_message").empty();
            var msg = $("<span>")
            msg.attr = ("id", "noMainWord");
            msg.text("One of your choices (and only one) needs to be the main German word.");
            $("#games_message").append(msg);
        }
    }
    console.log("outside for loop");
}

function checkMatch(responseRow, partner) {
    var match = false;
    for (var property in responseRow) {
        if (property === partner) {          
            match = true;
            break;
        } 
    }
    
    if (match) {
        $("#games_message").text("That's a match!")
    } else {
        $("#games_message").text("Not a match. Try again!")
    }
    return match;
}

$(document).ready(function () {
    //console.log("inside ready");
    var word_array = [];
    var partner_array = [];
    var clickCounter = 0;
    var chosenCards = [];
    $("#select_words_choice").on("click", function (event) {
        //buildCards(16, 2, ["Tisch", "Schrank", "Hut", "Stift", "Mann", "Stein", "Teppich", "Schalter"], ["der", "der", "der", "der", "der", "der", "der", "der"]);
        event.preventDefault();
        $.ajax("/api/words/", {
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var m=0; m<response.length; m++) {
                console.log("response[m].word: ", response[m].word);
                console.log("response[m].article: ", response[m].article);
                word_array.push(response[m].word);
                partner_array.push(response[m].article);
            }
            buildCards(16, 2, word_array, partner_array);
            emptyResultsTable();
            $(".cards").on("click", function(event) {
                $(".message").empty();
                console.log("inside click cards");
                console.log("this: ", this);
                var card = this.innerHTML;
                chosenCards.push(card);
                console.log("card: ", card);
                console.log("chosenCards: ", chosenCards);
                event.preventDefault();
                clickCounter +=1;
                console.log("clickCounter: ", clickCounter);
                if (clickCounter === 2) {
                    matchPartners(response, chosenCards);
                    clickCounter = 0;
                    chosenCards = [];
                }
            })
        })
    });  
});