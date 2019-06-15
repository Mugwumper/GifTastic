var topics = ["minnow", "salamander", "snail", "gar", "bass", "crawdad"];

init();
function init() {
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=5vU2gmvTW6FNUZrGnz6GPTGw43uPSDx1&limit=12";
  queryAPI(queryURL);
  renderButtons();
  $("#ohWell").hide();
  showOhWell();
}

// topics buttons on click
$(document).on("click", ".topic", queryFromButton);
function queryFromButton() {
  var topic = $(this).attr("data-name");
  queryTopic(topic);
}

function queryTopic(topic) {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=5vU2gmvTW6FNUZrGnz6GPTGw43uPSDx1&limit=12";
  queryAPI(queryURL);
}

function queryAPI(queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#images").empty();
    $.each(response.data, function (index, value) {
      generateGUIforResponse(value);
    });
  });
}

function generateGUIforResponse(value) {
  var rating = value.rating;
  var url_still = value.images.fixed_width_still.url;
  var url_moving = value.images.fixed_width.url;

  var imgpanel = $("<div>");
  imgpanel.addClass('imgPanel');
  
  imgpanel.attr("rating", rating);
  imgpanel.attr("url_moving", url_moving);
  imgpanel.attr("url_still", url_still);
  show_url(imgpanel, true);
  $("#images").append(imgpanel);
}

function show_url(imgpanel, animated) {
  imgpanel.empty();
  imgpanel.append("<div>Rating: "+imgpanel.attr("rating")+"</div>");
  if (animated) {
    show_url_still(imgpanel);
  } else {
    show_url_moving(imgpanel);
  }
}

function show_url_still(imgpanel) {
  imgpanel.attr("animated", 0);
  imgpanel.append('<img src="'+imgpanel.attr("url_still")+'">');
}

function show_url_moving(imgpanel) {
  imgpanel.attr("animated", 1);
  imgpanel.append('<img src="'+imgpanel.attr("url_moving")+'">');
}

// on click of the gif
$(document).on("click", ".imgPanel", doMovie);
function doMovie()  {
  var isAnimated = $(this).attr("animated");
  var animated = (isAnimated === "1");
  show_url($(this), animated);
}

// new item button click
$("#add-item").on("click", function(event) {
  event.preventDefault();
  var newTopic = $("#item-input").val().trim();
  if (newTopic !== "") {
    if (topics.indexOf(newTopic) === -1) {
      topics.push(newTopic);
      renderButtons(newTopic);  
    } else {
      console.log("repeated entries of the same value: '" + newTopic + "' - ignored");
    }
  } else {
    console.log("entry is blank - ignored");
  }
});

// whipes out the buttons and creates them using an array
function renderButtons(newTopic) {
  $("#buttons").empty();
  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("topic");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttons").append(button);
  }
  if (newTopic) {
    queryTopic(newTopic);
  }
}

// 
function showOhWell() {
  setTimeout(showit, 4500);

  function showit() {
      $("#ohWell").fadeIn(500);
  }
}  


