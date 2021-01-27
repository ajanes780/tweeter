$(document).ready(function () {
  console.log(" loading ... your jQuerry sir !.");

  $(".tweetinput").on("input ", function () {
    let myLength = $(".tweetinput").val().length;
    $(".counter").text(140 - myLength);
    if (myLength > 140) {
      $(".counter").removeClass("black").addClass("red");
    } else {
      $(".counter").removeClass("red").addClass("black");
    }
  });
});
