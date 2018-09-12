// adjust sidebar depending on game_choice:
    // if game_choice ...   show dropdown for matching figureOfSpeech choice and options
    // if figureOfSpeech ... show dropdown for matching options
    // if figureOfSpeech is "any" - option is translation1 only

// check that necessary fields are provided for each option

// options for nouns - matching pairs (later with triplets, quartetts?):
    // match word with translation1
    // match article and nouns
    // match nouns and plural forms
    // match nouns and gender

// options for verbs - matching pairs:
    // match word with translation1
    // match present tense and past tense
    // match present tense and present perfect

// options for adjectives - matching pairs:
    // match word with translation1
    // match word with comparative
    // match word with superlative

    // function create cards for each word in selection
        // for word in selection from word_db
            //create card div
            // word other side

    // function build result table
        // column title depends on chosen option
        // draw table

    // function matchPairs()
        // if partner matches word in word_db then:
            // show matching pair in result table
            // count wins +1
            // hide cards
        // else
           // indicate that they don't match
           // wait 3 seconds
           // flip cards back

    // function showCard()
        //when counter less than or equal to 2 show front side

