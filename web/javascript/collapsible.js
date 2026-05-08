var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    arrow = this.querySelectorAll(".arrow")
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      arrow[0].classList.toggle('active')
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      arrow[0].classList.add('active')
    }
  });
}

const collapsible = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", (e) =>
    e.currentTarget.classList.toggle("active"),
  );
}

