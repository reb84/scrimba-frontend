const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const messageContainer = document.getElementById("message");

async function handleClick(e) {
  e.preventDefault();
  const query = searchInput.value;

  if (!query) {
    messageContainer.textContent =
      "Unable to find what you’re looking for. Please try another search.";
  } else {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=59a9ee25`,
    );
    const data = await res.json();

    const searchResults = await Promise.all(
      data.Search.map((movie) =>
        fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=59a9ee25`,
        ).then((res) => res.json()),
      ),
    );
    render(searchResults);
  }
}

// if added so i don't get an error on my watchlist page
if (searchBtn) {
  searchBtn.addEventListener("click", handleClick);
}

const render = (movies) => {
  resultsContainer.innerHTML = movies
    .map(
      (data) => `
    <article class="film-card">
      <img
        src="${data.Poster}"
        alt="${data.Title} poster"
      />
      <div class="film-info">
        <div class="film-title-row">
          <h2>${data.Title}</h2>
        <span class="year">(${data.Year})</span>
          <span class="rating">
            <i class="fa-solid fa-star fa-xs"></i>${data.imdbRating}
          </span>
        </div>
        <div class="meta-row">
          <span class="runtime">${data.Runtime}</span>
          <span class="dot"></span>
          <span class="genres">${data.Genre}</span>
          <button class="watchlist-add" data-id="${data.imdbID}">
  <i class="fa-solid fa-circle-plus"></i>
  Watchlist
</button>
        </div>
        <p class="synopsis">${data.Plot}</p>
      </div>
    </article>
  `,
    )
    .join("");
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".watchlist-add");
  if (btn) {
    const id = btn.dataset.id;
    btn.classList.toggle("remove");

    if (btn.classList.contains("remove")) {
      btn.innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`;
    } else {
      btn.innerHTML = `<i class="fa-solid fa-circle-plus"></i> Watchlist`;
    }
  }
});
