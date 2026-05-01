function searchService() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let name = card.getAttribute("data-name");
    card.style.display = name.includes(input) ? "block" : "none";
  });
}

function bookService() {
  alert("Booking Confirmed!");
}

function openService(service) {
  window.location.href = `service.html?service=${encodeURIComponent(service)}`;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}