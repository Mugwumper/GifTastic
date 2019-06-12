var topics = ["minnow", "salamander", "snail", "gar"];


function doSearch() {
  var topic = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=5vU2gmvTW6FNUZrGnz6GPTGw43uPSDx1&limit=12";
  queryAPI(queryURL);
}

function renderButtons() {
  $("#buttons").empty();
  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("topic");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttons").append(button);
  }
}

function queryAPI(queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#images").empty();
    //console.log(response.data[0].images.downsized.url);    
    $.each(response.data, function (index, value) {
      var rating = value.rating;
      // still_url image starts with a number and needs to use [] type assignment
      var url_still = value.images["480w_still"].url;
      var url_moving = value.images.downsized.url;
      var imgpanel = $("<div>");
      imgpanel.addClass('imgPanel');
      imgpanel.attr("rating", rating);
      imgpanel.attr("url_moving", url_moving);
      imgpanel.attr("url_still", url_still);
      imgpanel.attr("animated", 0);
      show_url_still(imgpanel);
      $("#images").append(imgpanel);
    });
  });
}

function show_url_still(imgpanel) {
  imgpanel.empty();
  imgpanel.addClass('imgPanel');
  imgpanel.attr("animated", 0);
  imgpanel.append("<div>Rating: "+imgpanel.attr("rating")+"</div>");
  imgpanel.append('<img src="'+imgpanel.attr("url_still")+'">');
  //imgpanel.append('<img src="'+imgpanel.attr("url_still")+'"  style="height=350px; width=350px;"/>');

}


function show_url_moving(imgpanel) {
  imgpanel.empty();
  imgpanel.addClass('imgPanel');
  imgpanel.attr("animated", 1);
  imgpanel.append("<div>Rating: "+imgpanel.attr("rating")+"</div>");
  imgpanel.append('<img src="'+imgpanel.attr("url_moving")+'">');
}

function doMovie()  {
  //var imgpanel = $(this);
  var isAnimated = $(this).attr("animated");
  if (isAnimated === '1') {
     show_url_still($(this));
  } else {
    show_url_moving($(this));
  }


//    show_url_moving($(this));
}

// new item button click
$("#add-item").on("click", function(event) {
  event.preventDefault();
  var newTopic = $("#item-input").val().trim();
  if (newTopic !== "") {
    if (topics.indexOf(newTopic) === -1) {
      topics.push(newTopic);
      renderButtons ();  
    } else {
      console.log("repeated entries of the same value: '" + newTopic + "' - ignored");
    }
  } else {
    console.log("entry is blank - ignored");
  }
});

function init() {
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=5vU2gmvTW6FNUZrGnz6GPTGw43uPSDx1&limit=12";
  queryAPI(queryURL);
  renderButtons();
}
$(document).on("click", ".topic", doSearch);
$(document).on("click", ".imgPanel", doMovie);

init();

