//таб
let tabLinks = document.querySelectorAll(".tablinks");
let tabContents = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function(link, index) {
   link.addEventListener("click", function() {
      tabLinks.forEach(function(item) {
         item.classList.remove("active");
      });
      tabContents.forEach(function(content) {
         content.style.display = "none";
      });
      link.classList.add("active");
      tabContents[index].style.display = "block";
   });
});

tabLinks[0].click();

//slider
$(document).ready(function(){
   $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow:$(".arrow-l"),
      nextArrow:$(".arrow-r"),
   });
 });