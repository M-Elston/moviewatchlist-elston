const express = require("express");
const router = express.Router();
const { movieWatchlistController } = require("../controllers");

router.get("/watchlist", movieWatchlistController.getWatchlist);
router.post("/watchlist", movieWatchlistController.addToWatchlist);
router.post("/watchlist/:id/edit", movieWatchlistController.updateMovieStatus);
router.post("/watchlist/:id/delete", movieWatchlistController.deleteMovie);

module.exports = router;
