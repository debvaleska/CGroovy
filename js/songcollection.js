const carousels = document.querySelectorAll(".carousel");
const state = {}; 

carousels.forEach((carousel) => {
  const id = carousel.id;
  const cards = carousel.querySelectorAll(".song-card");
  state[id] = { index: 1, cards };

  updateCarousel(id);
});

function updateCarousel(id) {
  const { index, cards } = state[id];
  const total = cards.length;
  const left = (index - 1 + total) % total;
  const right = (index + 1) % total;

  cards.forEach((card) => {
    card.classList.remove("active", "left", "right");
    card.style.display = "none";
  });

  cards[left].classList.add("left");
  cards[left].style.display = "block";

  cards[index].classList.add("active");
  cards[index].style.display = "block";

  cards[right].classList.add("right");
  cards[right].style.display = "block";
}

document.querySelectorAll(".prevBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.carousel;
    const total = state[id].cards.length;
    state[id].index = (state[id].index - 1 + total) % total;
    updateCarousel(id);
  });
});

document.querySelectorAll(".nextBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.carousel;
    const total = state[id].cards.length;
    state[id].index = (state[id].index + 1) % total;
    updateCarousel(id);
  });
});



const genreMap = {
  "Pop": "Top Pop Songs",
  "K-Pop": "Top K-Pop Songs",
  "R&B": "Top R&B Songs"
};

const genreCards = document.querySelectorAll(".genre-card");
const songSections = document.querySelectorAll(".list-songs");

genreCards.forEach(card => {
  card.addEventListener("click", () => {
    const genreName = card.textContent.trim(); 
    const heading = genreMap[genreName];
    songSections.forEach(section => {
      const title = section.querySelector("h1")?.textContent.trim();
      section.style.display = (title === heading) ? "block" : "none";
    });
  });
});


songSections.forEach((section, i) => {
  section.style.display = (i === 0) ? "block" : "none";
});

document.getElementById('detailBtn').addEventListener('click', function() {
  window.location.href = 'songdetails.html';
});

