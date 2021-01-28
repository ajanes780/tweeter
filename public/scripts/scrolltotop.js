$(document).ready(function () {
  //Get the button:
  mybutton = document.getElementById("myBtn");

  // top = document.getElementById("top");
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.documentElement.scrollTop = 1;
  }
  // When the user clicks on the button, scroll to the top of the document
});
