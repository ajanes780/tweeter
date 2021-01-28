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
    console.log("This if form", $form.serialize());
    console.log($form);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $form.serialize(),
    }).then(function (morePostsHtml) {});
    // $("text").reset();
  });

  function loadTweets() {
    $.ajax("/tweets", { method: "GET" }).then(function (morePostsJson) {
      renderTweets(morePostsJson);
    });
  }

  function checkTweets() {
    $("textarea").val();
    let valToCheckTweetForm = $("textarea").val().length;
    if (valToCheckTweetForm > 140) {
      alert(" Slow down there gabby ! Keep it under  140 ");
      return false;
    }
    if (valToCheckTweetForm === 0) {
      alert(" How about telling me how you feel really ? ");
      return false;
    } else {
      $.ajax({
        url: "/tweets",
        method: "post",
        data: $form.serialize,
      }).then(function (data) {
        loadTweets();
        console.log("the ajax request is successfull");
      });
    }
  }
  checkTweets();
});
