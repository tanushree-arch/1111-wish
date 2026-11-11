const opening = document.getElementById("openFlowers");

function goToFlowers() {
  window.location.href = "flowers.html";
}

if (opening) {
  opening.addEventListener("click", goToFlowers);
  opening.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToFlowers();
    }
  });
}
