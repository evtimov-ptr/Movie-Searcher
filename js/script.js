/////////////////////////
// Elements
const movieNameValue = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

/////////////////////////
// Functions

const getMovie = () => {
  const movieName = movieNameValue.value;
  const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
  } else {
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="info">
          <img src="${data.Poster}" class="poster">
          <div>
            <h2>${data.Title}</h2>
            <div class="rating">
              <img src="assets/star-icon.svg" >
              <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                <span>Rated: ${data.Rated}</span>
                <span>Year: ${data.Year}</span>
                <span>Time: ${data.Runtime}</span>
                <span>Type: ${
                  data.Type.charAt(0).toUpperCase() + data.Type.slice(1)
                }</span>
             
                </div>
                <div class="genre">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
              </div>
             </div>
              <h3>Plot:</h3>
              <p>${data.Plot}</p>
              <h3>Cast:</h3>
              <p>${data.Actors}</p>
        `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML`<h3 class="msg">Something went wrong</h3>`;
      });
  }
};

/////////////////////////
// Dark Mode
let darkToggle = document.querySelector("#darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

searchBtn.addEventListener("click", getMovie);
movieNameValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getMovie();
  }
});
// window.addEventListener("load", getMovie);
