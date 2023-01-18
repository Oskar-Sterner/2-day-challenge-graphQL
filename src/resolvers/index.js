const path = require("path");
const fsPromises = require("fs/promises");

const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling");

const { GraphQLError, printType } = require("graphql");
const crypto = require("crypto");
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
        return new GraphQLError("Det finns inga filmer!");
      }
      return movies;
    },
  },
  Mutation: {
    createMovie: async (_, args) => {
      if ((args, title.length === 0))
        return new GraphQLError("Titeln måste vara längre än en bokstav.");

      let idExists = true;
      if (!idExists)
        return new GraphQLError("Denna film finns redan.");

      const newMovie = {
        id: crypto.randomUUID(),
        title,
        desc: desc || "",
        genre: genre || "",
        poster: poster || "",
        year: year
      };

      try {
        const endpoint = process.env.MOVIE_DB_URI;
        const response = await axios.post(
          endpoint,
          {
            data: [newMovie],
          },
          {
            headers: {
              "Accept-Encoding": "gzip,deflate,compress",
            },
          }
        );
      } catch (error) {
        console.error(error);
        return new GraphQLError("Filmen gick inte att spara.");
      }
      return newMovie;
    },
  },
};