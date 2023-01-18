const loadMovieListBtn = document.getElementById("loadMovieListBtn");

const fetchMovieListFromGraphQL = async () => {
    try {
          const res = await graphqlQuery("http://localhost:5000/graphql", ExampleQuery)
          const fetchedData = res.data?.loadMovieList.map((newMovie) => {
              return {
                      id: newMovie.id,
                      title: newMovie.title,
                      desc: newMovie.desc,
                      genre: newMovie.genre,
                      poster: newMovie.poster,
                      year: newMovie.year,
              }
          })
          return fetchedData
    } catch (error) {
      console.error(error);
      return [];
    }
}

loadMovieListBtn.addEventListener("click", () => {
  getAllMovies();
});

function getAllMovies() {
}