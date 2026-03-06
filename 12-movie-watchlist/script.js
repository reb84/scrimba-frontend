const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const watchlistContainer = document.getElementById("watchlist");
const messageContainer = document.getElementById("message");
let searchResults = [];

async function handleClick(e) {
  e.preventDefault();
  const query = searchInput.value;

  //   message if input is empty
  if (!query) {
    messageContainer.textContent =
      "Unable to find what you’re looking for. Please try another search.";
  } else {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=59a9ee25`,
    );
    const data = await res.json();

    // message if search is void
    if (!data.Search) {
      messageContainer.textContent = "No results found, try another search.";
      return;
    }

    // wait so both searches display at same time
    searchResults = await Promise.all(
      data.Search.map((movie) =>
        fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=59a9ee25`,
        ).then((res) => res.json()),
      ),
    );
    // should filter out results with bad data
    searchResults = searchResults.filter((m) => m.Response !== "False");
    render(searchResults);
    updateButtons();
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", handleClick);
}

// map over results and display
const render = (movies) => {
  resultsContainer.innerHTML = movies
    .map(
      (data) => `
    <article class="film-card">
         <div class="left">
      <img
        src="${data.Poster}"
        alt="${data.Title} poster"
          onerror="this.src='noimg.jpg'"
      />
      <button class="watchlist-add" data-id="${data.imdbID}">
  <i class="fa-solid fa-circle-plus"></i>
  Watchlist
</button>
</div>
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
        </div>
        <p class="synopsis">${data.Plot}</p>
      </div>
    </article>
  `,
    )
    .join("");
};

// update watchlist/remove buttons depending on whats in localstorage
const updateButtons = () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const buttons = document.querySelectorAll(".watchlist-add");

  buttons.forEach((btn) => {
    const isInWatchlist = watchlist.find((m) => m.imdbID === btn.dataset.id);
    if (isInWatchlist) {
      btn.classList.add("remove");
      btn.innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`;
    }
  });
};

// add/remove localstorage when button clicked
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".watchlist-add");

  if (btn) {
    const id = btn.dataset.id;
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const movieObject = searchResults.find((m) => m.imdbID === id);

    btn.classList.toggle("remove");
    if (btn.classList.contains("remove")) {
      watchlist.push(movieObject);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      btn.innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`;
    } else {
      const updated = watchlist.filter((m) => m.imdbID !== id);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      btn.innerHTML = `<i class="fa-solid fa-circle-plus"></i> Watchlist`;

      //   rerender if on watchlist page so removals vanish instantly
      if (watchlistContainer) {
        renderWatchlist();
      }
    }
  }
});

const renderWatchlist = () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  //   display message if watchlist is empty
  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `<div class="message">
          Your watchlist is looking a little empty...
          <span class="add-movies"
            ><a href="index.html"
              ><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</a
            ></span
          >
        </div>`;
    return;
  }

  watchlistContainer.innerHTML = watchlist
    .map(
      (data) => `
    <article class="film-card">
    <div class="left">
      <img
        src="${data.Poster}"
        alt="${data.Title} poster"
          onerror="this.src='noimg.jpg'"
      />
      <button class="watchlist-add" data-id="${data.imdbID}">
  <i class="fa-solid fa-circle-plus"></i>
  Watchlist
</button>
</div>
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
          
        </div>
        <p class="synopsis">${data.Plot}</p>
      </div>
    </article>
  `,
    )
    .join("");

  updateButtons();
};

if (watchlistContainer) {
  renderWatchlist();
}
