var wordsContainer = $("#words_container");

function buildInputElement(textLabel, idInput) {
  //console.log("inside buildElement");
  var div = $("<div>");
  div.addClass("form-group");
  var label = $("<label>");
  label.addClass("fadeInRight");
  label.attr("for", "word");
  label.text(textLabel);
  var input = $("<input>");
  input.addClass("form-control");
  input.attr("type", "text");
  input.attr("id", idInput);
  div.append(label, input);
  wordsContainer.append(div);
}

function buildButton(btnId, btnText) {
  var button = $("<button>");
  button.addClass("shake");
  button.attr("type", "submit");
  button.attr("id", btnId);
  button.text(btnText)
  wordsContainer.append(button);
}

/* function buildSelectionElement(titleString, selectId, option1String, option2String, option3String) {
    var title = $("<h6>");
    title.text(titleString);
    var select = $("<select>");
    select.addClass("chosen-select");
    select.addClass("form-control");
    select.attr("id", selectId);
    var option1 = $("<option>");
    option1.attr("value", option1String);
    option1.attr("id", option1String);
    option1.text(option1String);
    console.log(option1);
    var option2 = $("<option>");
    option2.attr("value", option2String);
    option2.attr("id", option2String);
    option2.text(option2String);
    var option3 = $("<option>");
    option3.attr("value", option3String);
    option3.attr("id", option3String);
    option3.text(option3String);
    select.append(option1, option2, option3);
    //var btn = buildButton("Continue");
    wordsContainer.append(title, select, $("<br>"));
} */

function buildForm() {
  buildInputElement("German word: ", "input_word");
  buildInputElement("Translation: ", "input_translation");
  buildInputElement("Figure of Speech: ", "input_figureOfSpeech");
  buildInputElement("Article: ", "input_article");
  buildInputElement("Gender: ", "input_gender");
  buildInputElement("Pluralform: ", "input_plural");
  buildButton("input_submit", "Submit");
}

$(document).ready(function() {
  buildForm();
  $("#input_submit").on("click", function(event) {
    var newWord = {
      word: $("#input_word").val().trim(),
      translation1: $("#input_translation").val().trim(),
      figureOfSpeech: $("#input_figureOfSpeech").val().trim(),
      article: $("#input_article").val().trim(),
      gender: $("#input_gender").val().trim(),
      plural: $("#input_plural").val().trim()
    }
    console.log("newWord: ", newWord);
    $.ajax("/api/words/", {
      method: "POST",
      data: newWord
    }).then(function() {
      location.reload();
    });
  });
})
