//console.log("inside gamesController.js");
function buildCards(num, numCardsInMatch, allMatchArray) {
  //console.log("inside buildCards");
  numCards = num;
  numEachGroup = numCards / numCardsInMatch;
  //console.log("num_cards: ", num_cards);
  //console.log("num_each_group: ", num_each_group);
  $(".games_cards_container").empty();
  var wordArray = [];
  var partnerArray = [];
  var cardWordArray = [];
  var cardPartner1Array = [];
  var shuffledMatchArray = fisherYates(allMatchArray);
  //console.log("shuffled_match_array: ", shuffled_match_array);

  for (var x = 0; x < 8; x++) {
    wordArray.push(shuffledMatchArray[x][0]);
    partnerArray.push(shuffledMatchArray[x][1]);
  }
  var shuffledPartnerArray = fisherYates(partnerArray);
  //console.log("wordArray: ", wordArray);
  //console.log("partnerArray: ", partnerArray);

  for (var i = 0; i < numEachGroup; i++) {
    //console.log("inside forloop, i: ", i);
    var cardWord = $("<button>");
    cardWord.addClass("cards");
    cardWord.addClass("word");
    cardWord.addClass("animated fadeIn");
    cardWord.attr("id", wordArray[i]);
    cardWord.text(wordArray[i]);
    //console.log("card_word: ", card_word);
    var cardPartner1 = $("<button>");
    cardPartner1.addClass("cards");
    cardPartner1.addClass("partner");
    cardPartner1.addClass("animated fadeIn");
    cardPartner1.attr("id", i);
    cardPartner1.text(shuffledPartnerArray[i]);
    //console.log("cardPartner1: ", cardPartner1);
    cardWordArray.push(cardWord);
    cardPartner1Array.push(cardPartner1);
  }
  //console.log("inside buildCards, shuffled_div_array: ", shuffled_div_array);

  for (var k = 0; k < cardWordArray.length; k = k + 2) {
    $(".games_cards_container").append(
      cardWordArray[k], cardWordArray[k + 1],
      cardPartner1Array[k], cardPartner1Array[k + 1]);
  }
}

function fisherYates(cardArray) {
  //console.log("inside shuffleCards, card_array: ", card_array);
  var i = cardArray.length;
  if (i === 0) {
    return false;
  };
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = cardArray[i];
    var tempj = cardArray[j];
    cardArray[i] = tempj;
    cardArray[j] = tempi;
  }
  //console.log("card_array after shuffle: ", card_array)
  return cardArray;
}

function matchPartners(response, chosenCards) {
  //console.log("inside matchPartners, chosenCards: ", chosenCards);
  //console.log("response: ", response);
  //console.log("response[0].word: ", response[0].word);
  //console.log("inside matchPartners, chosenCards[0]", chosenCards[0]);
  var chosenWord1 = chosenCards[0];
  var chosenWord2 = chosenCards[2];
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
      partnerId = chosenCards[3];
      //console.log("inside matchPartners, in if, parnerId: ", partnerId);
      //console.log("in matchPartners, inside if");
      //console.log("word: ", word);
      //console.log("partner: ", partner);
      check = checkMatch(response[n], word, partner, partnerId);
      //console.log("check: ", check);
      if (check) {
        break;
      }

    } else if (chosenWord2 === responseWord) {
      //console.log("inside else if");
      word = chosenWord2;
      partner = chosenWord1;
      partnerId = chosenCards[1];
      //console.log("inside matchPartners, in else if, parnerId: ", partnerId);
      //console.log("word: ", word);
      //console.log("partner: ", partner);
      check = checkMatch(response[n], word, partner, partnerId);
      //console.log("check: ", check);
      if (check) {
        break;
      }
    } else {
      $("#games_message").empty();
      $("#games_message").text("Not a Match! Try again");
    }
  }
  //console.log("outside for loop");
}

function checkMatch(responseRow, word, partner, partnerId) {
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
    deployResults(word, partner, partnerId)
  } else {
    $("#games_message").text("Not a match. Try again!")
  }
  return match;
}

function deployResults(word, partner, partnerId) {
  var tableElement = $("#results_table");
  //console.log("tableElement: ", tableElement);
  //console.log("tableElement.children: ", tableElement.children);
  var numElements = tableElement.children().length;
  //console.log("inside deployResults, numElements: ", numElements);
  var matchResult = $("<h4>");
  matchResult.addClass("result");
  matchResult.attr("id", "matchResult" + (numElements + 1));
  if (partner === "der" || partner === "die" || partner === "das") {
    //console.log("in deployResults, inside if");
    matchResult.text(partner + " " + word);
  } else {
    matchResult.text(word + " " + partner);
  }
  tableElement.append(matchResult);
  //console.log("document.getElementById(word): ", document.getElementById(word));
  document.getElementById(word).style.visibility = 'hidden';
  //console.log("word + partner: ", word + "-" + partner)
  document.getElementById(partnerId).style.visibility = 'hidden';
  if (numElements === 7) {
    displayEnd();
  }
}

function displayEnd() {
  $(".games_cards_container").empty();
  var msgElement = $("#games_message");
  msgElement.addClass("animated");
  msgElement.addClass("zoomIn");
  msgElement.text("Congratulations! You have matched every single word!");
}

$(document).ready(function () {
  //console.log("inside ready");

  $("#start").on("click", function (event) {
    //buildCards(16, 2, ["Tisch", "Schrank", "Hut", "Stift", "Mann", "Stein", "Teppich", "Schalter"], ["der", "der", "der", "der", "der", "der", "der", "der"]);
    event.preventDefault();
    var matchClickCounter = 0;
    var chosenCards = [];
    var singleMatchArray = [];
    var allMatchArray = [];
    $.ajax("/api/words/", {
      method: "GET"
    }).then(function (response) {
      //console.log(response);
      for (var m = 0; m < response.length; m++) {
        //console.log("response[m].word: ", response[m].word);
        //console.log("response[m].article: ", response[m].article);
        singleMatchArray.push(response[m].word, response[m].article);
        allMatchArray.push(singleMatchArray);
        singleMatchArray = [];
        //word_array.push(response[m].word);
        //partner_array.push(response[m].article);
      }
      buildCards(16, 2, allMatchArray);
      $("#results_table").empty();
      $("#games_message").empty();

      $(".cards").on("click", function (event) {
        $(".message").empty();
        //console.log("inside click cards");
        //console.log("this: ", this);
        var cardText = this.innerHTML;
        var cardId = this.id;
        //console.log("cardId: ", cardId);
        chosenCards.push(cardText, cardId);
        //console.log("chosenCards: ", chosenCards);
        //console.log("card: ", card);
        //console.log("chosenCards: ", chosenCards);
        event.preventDefault();
        matchClickCounter += 1;
        //console.log("clickCounter: ", clickCounter);
        if (matchClickCounter === 2) {
          var matchCheck = matchPartners(response, chosenCards);
          matchClickCounter = 0;
          chosenCards = [];
        }
      });
    });
  });
});