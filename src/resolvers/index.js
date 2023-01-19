const path = require("path");
const fsPromises = require("fs/promises");

const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling");

const { GraphQLError, printType } = require("graphql");
const { movieGenre } = require("../enums/movies");

const axios = require("axios").default;

exports.resolvers = {
  Query: {
    loadMovieList: async (_, args) => {
      let movies = [];
      const endpoint = process.env.MOVIE_DB_URI;
      try {
        const response = await axios.get(endpoint);
        if (response.data?.length > 0) {
          movies = response.data;
        }
      } catch (error) {
        return new GraphQLError("Det finns inga filmer att hämta");
      }
      return movies;
    },
  },
  Mutation: {
    createMovie: async (_, args) => {
      const { id, title, genre, desc, poster, year } = args.input;

      if ((args, title.length === 0))

        return new GraphQLError("Titeln ska vara över 0 karaktärer lång");

      const createMovie = {
        id: id || "",
        title,
        genre: genre || "",
        desc: desc || "",
        poster: poster || "",
        year: year || "",
      };
      

      const endpoint = process.env.MOVIE_DB_URI;
      const response = await axios.get(endpoint);

      movieList = response.data;

      if (movieList.length === 0) {
        try {
          const response = await axios.post(endpoint,
            {
              data: [createMovie],
            },
            {
              headers:
               {
                "Accept-Encoding": "gzip,deflate,compress",
              },
            }
          );
        } catch (error) {
          console.error(error);
          return new GraphQLError("Det gick inte att skapa filmen...");
        }
      }
      return createMovie;
    },
  },
};