/*.
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const result = createTweetElement(tweet);
      $(".tweetsContainer").prepend(result);
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
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $form = $(".tweetform");
  // submiting tweets and tweet protection logic
  $form.submit(function (event) {
    event.preventDefault();
    const userTextXSS = escape($("textarea").val());
    console.log("userTextXSS  ", userTextXSS);
    const $errorcontainer = $("#error");
    $errorcontainer.hide("fast");
    let textLength = $("textarea").val().length;
    if (textLength === 0) {
      $errorcontainer.slideToggle("fast", function () {
        $errorcontainer.text(" How about telling me how you feel really ? ");
        $errorcontainer.css("display", "block");
      });
    } else if (textLength > 140) {
      $errorcontainer.slideToggle("fast", function () {
        $errorcontainer.text(" Slow down there gabby.... keep it under 140  ");
        $errorcontainer.css("display", "block");
      });
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
  loadTweets();
});
