
const loadMovieListBtn = document.getElementById("loadMovieListBtn");
const ul = document.getElementById("movie-container");

loadMovieListBtn.addEventListener("click", () => {
  getAllMovies();
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
    ul.innerHTML = JSON.stringify(data);
  })
}