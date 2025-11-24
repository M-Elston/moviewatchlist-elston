const router = require("express").Router();
const { movieWatchlistController } = require("../controllers");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/watchlist", movieWatchlistController.getWatchlist);

router.get("/watchlist/:id/edit", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await movieWatchlistController.getMovieById(movieId);
    
    res.render("editMovie", { movie });
  } catch (err) {
    console.error(err);
    res.redirect("/watchlist");
  }
});

router.post("/search", async (req, res) => {
  const movieTitle = req.body.movie;
  try {
    const fetch = require("node-fetch");
    const apiKey = process.env.OMDB_API_KEY;
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
    const data = await response.json();
    const movies = data.Search ? data.Search.map(m => ({
      title: m.Title,
      year: m.Year,
      imdbId: m.imdbID,
      poster: m.Poster !== "N/A" ? m.Poster : null
    })) : [];

    res.render("search", { movies });

  } catch (err) {
    console.error(err);
    res.render("search", { movies: [] });
  }
});

module.exports = router;