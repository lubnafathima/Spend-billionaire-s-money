document.addEventListener("DOMContentLoaded", function () {
  var boxes = document.querySelectorAll(".box");

  boxes.forEach(function (box) {
    box.addEventListener("click", function () {
      var src = box.getAttribute("data-src");
      var name = box.getAttribute("data-name");
      var amount = box.getAttribute("data-amount");

      window.location.href = `cart.html?src=${src}&name=${encodeURIComponent(
        name
      )}&amount=${amount}`;
    });
  });
});
