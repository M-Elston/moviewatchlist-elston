const { Schema, model, models } = require("mongoose");

const MovieEntrySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    year: String,
    imdbId: String,
    poster: String,
    status: String,
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = models.MovieEntry || model("MovieEntry", MovieEntrySchema);