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
    let textLength = $("textarea").val().length;
    if (textLength === 0) {
      alert(" How about telling me how you feel really ? ");
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

  loadTweets();
});

// const $form = $('#tweet-form')
// $form.submit(function (event) {
//   event.preventDefault();
//   // logic to handle XSS
//   const userText = $('#tweet-text').val();
//   const userTextXSS = $('#tweet-text').text($('#tweet-text').val())
//   const textLength = $('#tweet-text').val().length;
//   // error handling conditions
//   if (textLength === 0) {
//     alert("Please type in a tweet");
//   } else if (textLength > 140) {
//     alert("You exceeded character limit in your tweet");
//   } else if (typeof userTextXSS === "object") {
//     alert("Are you trying to hack us? haha try again!")
//   } else {
//     // logic to post tweet
//     $.post("/tweets/", `text=${userTextXSS}`)
//       // when response comes refresh page and clear form
//       .then((response) => {
//         loadTweets();
//         $("#tweet-text").val("");
//       })
//   }
// });
