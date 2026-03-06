const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");

async function handleClick() {
  const query = searchInput.value;
  const res = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=59a9ee25`,
  );
  const data = await res.json();

  const searchResults = await Promise.all(
    data.Search.map((movie) =>
      fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=59a9ee25`).then(
        (res) => res.json(),
      ),
    ),
  );

  render(searchResults);
}

searchBtn.addEventListener("click", handleClick);

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
          <span class="rating">
            <i class="fa-solid fa-star fa-xs"></i>${data.imdbRating}
          </span>
        </div>
        <div class="meta-row">
          <span class="runtime">${data.Runtime}</span>
          <span class="dot"></span>
          <span class="genres">${data.Genre}</span>
          <span class="watchlist-add">
            <i class="fa-solid fa-circle-plus fa-lg"></i>
            Watchlist
          </span>
        </div>
        <p class="synopsis">${data.Plot}</p>
      </div>
    </article>
  `,
    )
    .join("");
};