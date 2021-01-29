$(document).ready(function () {
  //Get the button:
  let mybutton = document.getElementById("myBtn");
  let rootElement = document.documentElement;
  mybutton.addEventListener("click", scrollToTop);
  window.onscroll = function () {
    scrollFunction();
  };
  // logic to determine  when to show button
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
  // the magic button
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
