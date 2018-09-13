//console.log("inside gamesController.js");

function buildCards(num, numCardsInMatch, word_array, partner1_array, partner2_array, partner3_array) {
    //console.log("inside buildCards");
    num_cards = num;
    num_each_group = num_cards / numCardsInMatch;
    //console.log("num_cards: ", num_cards);
    //console.log("num_each_group: ", num_each_group);
    $(".games_cards_container").empty();
    var card_word_array = [];
    var card_partner1_array = [];
    for (var i = 0; i < num_each_group; i++) {
        //console.log("inside forloop, i: ", i);
        var card_word = $("<button>");
        card_word.addClass("cards");
        card_word.addClass("word");
        card_word.attr("id", word_array[i]);
        card_word.text(word_array[i]);
        //console.log("card_word: ", card_word);
        var card_partner1 = $("<button>");
        card_partner1.addClass("cards");
        card_partner1.addClass("partner");
        card_partner1.attr("id", word_array[i] + "-" + partner1_array[i]);
        card_partner1.text(partner1_array[i]);
        //console.log("card_partner1: ", card_partner1);
        card_word_array.push(card_word);
        card_partner1_array.push(card_partner1);
    }
    var shuffled_word_array = fisherYates(card_word_array);
    var shuffled_partner1_array = fisherYates(card_partner1_array);
    //console.log("inside buildCards, shuffled_div_array: ", shuffled_div_array);

    for (var k = 0; k < shuffled_word_array.length; k = k + 2) {
        $(".games_cards_container").append(
            shuffled_word_array[k], shuffled_word_array[k + 1],
            shuffled_partner1_array[k], shuffled_partner1_array[k + 1]);
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
    //console.log("response[0].word: ", response[0].word);
    //console.log("inside matchPartners, chosenCards[0]", chosenCards[0]);
    var chosenWord1 = chosenCards[0];
    var chosenWord2 = chosenCards[1];
    //console.log("chosenWord1: ", chosenWord1);
    //console.log("chosenWord2: ", chosenWord2);
    //console.log("response.length: ", response.length);
    var responseWord = "";
    var check = false;
    var word = "";
    var partner = "";
    for (var n = 0; n < response.length; n++) {
        //console.log("n: ", n);
        responseWord = response[n].word;
        //console.log("responseWord: ", responseWord);
        //console.log("response[n].word: ", response[n].word);
        if (chosenWord1 === responseWord) {
            word = chosenWord1;
            partner = chosenWord2;
            //console.log("in matchPartners, inside if");
            //console.log("word: ", word);
            //console.log("partner: ", partner);
            check = checkMatch(response[n], word, partner);
            //console.log("check: ", check);
            if (check) {
                break;
            }

        } else if (chosenWord2 === responseWord) {
            //console.log("inside else if");
            word = chosenWord2;
            partner = chosenWord1;
            //console.log("word: ", word);
            //console.log("partner: ", partner);
            check = checkMatch(response[n], word, partner);
            //console.log("check: ", check);
            if (check) {
                break;
            }
        } else {
            $("#games_message").empty();
            $("#games_message").text("One of your choices (and only one) needs to be the main German word.");
        }
    }
    //console.log("outside for loop");
}

function checkMatch(responseRow, word, partner) {
    //console.log("inside checkMatch");
    //console.log("responseRow: ", responseRow);
    var match = false;
    for (var property in responseRow) {
        //console.log("inside for loop, property: ", property);
        //console.log("responseRow[property]: ", responseRow[property]);
        if (responseRow[property] === partner) {
            //console.log("in checkMatch, inside if");
            match = true;
            break;
        }
    }

    if (match) {
        $("#games_message").text("That's a match!")
        deployResults(word, partner)
    } else {
        $("#games_message").text("Not a match. Try again!")
    }
    return match;
}

function deployResults(word, partner) {
    var tableElement = $("#results_table");
    console.log("tableElement: ", tableElement);
    console.log("tableElement.children: ", tableElement.children);
    var numElements = tableElement.children().length;
    console.log("inside deployResults, numElements: ", numElements);
    var matchResult = $("<h4>");
    matchResult.addClass("result");
    matchResult.attr("id", "matchResult" + (numElements + 1));
    if (partner === "der" || partner === "die" || partner === "das" ) {
        console.log("in deployResults, inside if");
        matchResult.text(partner + " " + word);
    } else {
        matchResult.text(word + " " + partner);
    }
    tableElement.append(matchResult);
    //console.log("document.getElementById(word): ", document.getElementById(word));
    document.getElementById(word).style.visibility = 'hidden';
    document.getElementById(word + "-" + partner).style.visibility = 'hidden';
}

function displayEnd() {
    $(".games_cards_container").empty();
    $("#games_message").text("Congratulations! You have matched every single word!")


}

$(document).ready(function () {
    //console.log("inside ready");
    var word_array = [];
    var partner_array = [];
    var matchClickCounter = 0;
    var totalClickCounter = 0;
    var chosenCards = [];
    $("#select_words_choice").on("click", function (event) {
        //buildCards(16, 2, ["Tisch", "Schrank", "Hut", "Stift", "Mann", "Stein", "Teppich", "Schalter"], ["der", "der", "der", "der", "der", "der", "der", "der"]);
        event.preventDefault();
        $.ajax("/api/words/", {
            method: "GET"
        }).then(function (response) {
            //console.log(response);
            for (var m = 0; m < response.length; m++) {
                //console.log("response[m].word: ", response[m].word);
                //console.log("response[m].article: ", response[m].article);
                word_array.push(response[m].word);
                partner_array.push(response[m].article);
            }
            buildCards(16, 2, word_array, partner_array);
            emptyResultsTable();
            $("#games_message").empty();
            $(".cards").on("click", function (event) {
                $(".message").empty();
                //console.log("inside click cards");
                //console.log("this: ", this);
                var card = this.innerHTML;
                chosenCards.push(card);
                //console.log("card: ", card);
                //console.log("chosenCards: ", chosenCards);
                event.preventDefault();
                matchClickCounter += 1;
                totalClickCounter +=1;
                //console.log("clickCounter: ", clickCounter);
                if (matchClickCounter === 2) {
                    var matchCheck = matchPartners(response, chosenCards);
                    matchClickCounter = 0;
                    chosenCards = [];
                }
                if (totalClickCounter === 16) {
                    displayEnd();
                }
            })
        })
    });
});