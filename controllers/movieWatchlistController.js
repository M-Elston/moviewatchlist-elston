const { MovieEntry } = require("../models");

const getWatchlist = async (req, res) => {
    try {
        const movies = await MovieEntry.find({ userId: req.session.userId}).lean();
        res.render("watchlist", { movies });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting watchlist");
    }
};

const addToWatchlist = async (req, res) => {
    try {
        const { title, year, imdbId, poster, status } = req.body;
        const allowedStatuses = [
            "Want to Watch",
            "Currently Watching",
            "Finished Watching",
            "Pretend You'll Watch Later"
        ];
        const newStatus = allowedStatuses.includes(status) ? status: "Want to Watch";
        const newMovie = new MovieEntry({
            userId: req.session.userId,
            title,
            year,
            imdbId,
            poster,
            status: newStatus
        });

        await newMovie.save();
        res.redirect("/watchlist");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding movie to watchlist");
    }
};

const updateMovieStatus = async (req, res) => {
    try {
        const movieId = req.params.id;
        let { status } = req.body;
        const allowedStatuses = [
            "Want to Watch",
            "Currently Watching",
            "Finished Watching",
            "Pretend You'll Watch Later"
        ];

        if (!allowedStatuses.includes(status)) {
            status = "Want to Watch";
        }

        await MovieEntry.findByIdAndUpdate(movieId, {status}, {new: true});

        res.redirect("/watchlist");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating movie status");
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        await MovieEntry.findByIdAndDelete(movieId);
        res.redirect("/watchlist");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting movie");
    }
};

const getMovieById = async (id) => {
    return await MovieEntry.findById(id).lean();
};

module.exports = {
    getWatchlist,
    addToWatchlist,
    updateMovieStatus,
    deleteMovie,
    getMovieById
};