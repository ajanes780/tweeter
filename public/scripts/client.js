/*.
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const result = createTweetElement(tweet);
      $(".tweetsContainer").append(result);
    });
  };

  function createTweetElement(tweetObject) {
    console.log("tweetObject ", tweetObject.content);
    console.log("userTextXSS ", tweetObject.content.text["userTextXSS"]);
    const markup = ` <div class= "tweetContainer ">
        <article>
          <articleheader>
          <div class ="user">   
          <img class=" headerimage" src= ${tweetObject.user.avatars} />
            <p class= "headerusername"> ${tweetObject.user.name}</p >
            </div>
            
            <p class ="handle" >  ${tweetObject.user.handle}  </p>
          </articleheader>
        <p>${tweetObject.content.text} </p>
    <footer>
    <p> ${tweetObject.created_at}</p>
    <div class= "icongroup">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    </div>
    `;
    return markup;
  }
  // renderTweets(tweetData);

  const $form = $(".tweetform");

  $form.submit(function (event) {
    event.preventDefault();
    const userTextXSS = $("textarea").text($("textarea").val());
    console.log("userTextXSS  ", userTextXSS);
    let textLength = $("textarea").val().length;
    if (textLength === 0) {
      $(".errorMessages").append(error);
      // alert(" How about telling me how you feel really ? ");
    } else if (textLength > 140) {
      alert(" Slow down there gabby ! Keep it under  140 ");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: `text=${userTextXSS}`,
      }).then(function () {
        loadTweets();
        $("textarea").val("");
      });
    }
  });

  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (response) => {
        renderTweets(response);
      },
    });
  }

  jQuery(function ($) {
    let validator = $("#form").validate({
      rules: {
        first: {
          required: true,
        },
      },
      messages: {},
      errorElement: "div",
      errorLabelContainer: ".errorTxt",
    });
  });

  loadTweets();
});
