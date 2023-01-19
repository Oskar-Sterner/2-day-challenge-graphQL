const loadMovieListBtn = document.getElementById("loadMovieListBtn");
const loadAddMovieBtn = document.getElementById("loadAddMovieBtn");
const div = document.getElementById("movie-container");
const movieFormDiv = document.getElementById("movie-form-container");

loadMovieListBtn.addEventListener("click", () => {
  getAllMovies();
});

loadAddMovieBtn.addEventListener("click", () => {
  displayAddMovie();
});

function getAllMovies() {
  const resultData = "";
  const query =  `
  query LoadMovieList {
    loadMovieList {
      id
      desc
      genre
      poster
      title
      year
    }
  }
  `;

  fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query
    })
  }).then(response => {
    return response.json();
  }).then(data => {
    const movies = data.data.loadMovieList;
    div.innerHTML = "";
    for (let movie of movies) {
        const movieElem = document.createElement("div");
        const poster = document.createElement("img");

        movieElem.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.desc}</p>
        <p> Genre: ${movie.genre}</p>
        <p> Year: ${movie.year}</p>`;
        movieElem.classList.add("movie-element");
        poster.src = `${movie.poster}`;
        div.appendChild(movieElem);
        movieElem.appendChild(poster);
    }
  }).catch(error => {
    console.log(error)
  });
}

function displayAddMovie(){
  movieFormDiv.innerHTML = "";

  movieFormDiv.classList.remove("invisible")
  movieFormDiv.classList.add("visible")

  const movieForm = document.createElement("form");
  const movieTitleInput = document.createElement("input");
  const movieTitleInputLabel = document.createElement("label");
  const movieGenreSelect = document.createElement("select");
  const movieGenreSelectLabel = document.createElement("label");
  const moviePosterInput = document.createElement("input");
  const moviePosterLabel = document.createElement("label");
  const movieYearInput = document.createElement("input");
  const movieYearLabel = document.createElement("label");
  const movieDescTextarea = document.createElement("textarea");
  const movieDescLabel = document.createElement("label");
  const movieSubmitBtn = document.createElement("input");

  movieForm.classList.add("movie-form");
  movieTitleInput.classList.add("movie-title-input");
  movieTitleInputLabel.classList.add("movie-title-label");
  movieGenreSelect.classList.add("movie-genre-select");
  movieGenreSelectLabel.classList.add("movie-genre-label");
  moviePosterInput.classList.add("movie-poster-input");
  moviePosterLabel.classList.add("movie-poster-label");
  movieYearInput.classList.add("movie-year-input");
  movieYearLabel.classList.add("movie-year-label");
  movieDescTextarea.classList.add("movie-desc-textarea");
  movieDescLabel.classList.add("movie-desc-label");
  movieSubmitBtn.classList.add("movie-submit-btn");
  
  movieTitleInputLabel.innerHTML = "Ange din titel här: ";
  movieGenreSelectLabel.innerHTML = "Ange din genre här: ";
  moviePosterLabel.innerHTML = "Ange giltig URL till din poster";
  movieYearLabel.innerHTML = "Ange vilket år filmen lanserades";
  movieDescLabel.innerHTML = "Ange lite information om filmen";

  movieTitleInput.setAttribute("required", "");
  moviePosterInput.setAttribute("required", "");
  movieDescTextarea.setAttribute("required", "");
  movieYearInput.setAttribute("type", "number");
  movieYearInput.setAttribute("required", "");
  movieSubmitBtn.setAttribute("type", "submit");
  movieSubmitBtn.setAttribute("value", "LÄGG TILL FILM");

  movieGenreSelect.innerHTML = `
  <option value="Action">Action</option>
  <option value="Drama">Drama</option>
  <option value="Adventure">Adventure</option>`;

  movieFormDiv.innerHTML = `
  <h2>LÄGG TILL DIN FILM</h2>`;
  
  movieFormDiv.appendChild(movieForm);
  movieForm.appendChild(movieTitleInputLabel);
  movieForm.appendChild(movieTitleInput);
  movieForm.appendChild(movieGenreSelectLabel);
  movieForm.appendChild(movieGenreSelect);
  movieForm.appendChild(moviePosterLabel);
  movieForm.appendChild(moviePosterInput);
  movieForm.appendChild(movieYearLabel);
  movieForm.appendChild(movieYearInput);
  movieForm.appendChild(movieDescLabel);
  movieForm.appendChild(movieDescTextarea);
  movieForm.appendChild(movieSubmitBtn);
}