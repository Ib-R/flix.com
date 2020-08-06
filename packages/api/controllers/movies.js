const fs = require("fs");
const movies = JSON.parse(
	fs.readFileSync(`${__dirname}/../_data/movies.json`, "utf-8")
);

// @desc    Get all movies
// @route   GET /api/v1/movies
// @access  Public
exports.getMovies = (req, res, next) => {
	res.json(movies);
};

// @desc    Get single movies
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getMovie = (req, res, next) => {
	const movie = movies.filter((movie) => movie._id == req.params.id);
	if (movie.length === 0) {
		return res.status(404).json("Not Found");
	}
	res.json({ success: true, data: movie });
};
