var prefix = "https://cors-anywhere.herokuapp.com/";

var url = 'http://api.icndb.com/jokes/random';

var $button = $('#get-joke').click(function() {
	getJoke();
});

var $paragraph = $('#joke');

function getJoke() {
$.ajax({
	method: 'GET',
	url: url, //here's a weird construction, but on the left we have the name of the parameter, and to the right is the name of the variable that holds the value
	success: function(res) {
		$paragraph.text(res.value.joke);
	}

});
}

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"

function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false });
}

function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    $('.quote').text(quoteText);
	    $('.author').text("Author: " + quoteAuthor);
	    $('.tweet').attr('href', tweet);
	}
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});