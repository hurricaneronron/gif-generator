// Initial array of comedy shows
var shows = ["Parks and Recreation", "Community", "The Office", "New Girl", "Archer", "Bob's Burgers", "Brooklyn Nine-Nine", "Always Sunny", "The Good Place"]




// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {

  var search = $(this).attr("data-name")
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=TPkknxWdQpkKRLv8i8ltWSEvO25tksP1&limit=10")

  // GIPHY API
  xhr.done(function(data) { 
    console.log("success got data", data)

    // Div to hold current gifs
    var gifsDiv = $("<div class='currentShow'>")

    for( var i = 0; i < data.data.length; i ++ ) {
      var stillSource = data.data[i].images.original_still.url
      var animateSource = data.data[i].images.original.url
      var rating = data.data[i].rating
      console.log(rating)
      var image = $("<div class='text-center'><img src='"+stillSource+"' alt='GIF via GIPHY' class='rounded img-fluid gif' data-state='still' data-still='"+stillSource+"' data-animate='"+animateSource+"'><p>Rating: "+rating+"</p></div>")
      $(".currentShow").append(image)
      $("#gifs-view").html(gifsDiv)
    }
    
    $(".gif").on("click", function( ) {
      var state = $(this).attr("data-state")
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
      }
      else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
      }
    })

  })

}

// Function for displaying initial buttons
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < shows.length; i++) {
    var a = $("<button type='button' class='btn btn-secondary btn-small'>")
    a.addClass("show")
    a.attr("data-name", shows[i])
    a.text(shows[i])
    $("#buttons-view").append(a)
  }
}

// Add new buttons based on user input
$("#add-show").on("click", function(event) {
  event.preventDefault()
  var newShow = $("#show-input").val().trim()
  shows.push(newShow)
  renderButtons()
  $("#show-input").val("")
})

// Show GIFs when buttons clicked
$(document).on("click", ".show", displayGifs)

// Display initial buttons
renderButtons()