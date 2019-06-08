


function queryAPI() {
  // Example queryURL for Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=5vU2gmvTW6FNUZrGnz6GPTGw43uPSDx1&limit=12";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].images.downsized.url);
    

    $.each(response.data, function (index, value) {
      $('#images').append('<img src="' + value.images.downsized.url + '" />'); 

    });

  });
}

queryAPI();


