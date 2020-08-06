const path = require("path");
const env = require("dotenv");
const logger = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const express = require("express");

require("colors");

// Load env variables
env.config({ path: ".env" });

// Route files
const movies = require("./routes/movies");

const app = express();

// Body parser
app.use(express.json());

// Mount logger for development
if (process.env.NODE_ENV === "development") {
	app.use(logger("dev"));
}

// Prevent XSS attacks
app.use(xss());

// Set security headers
app.use(helmet());

// Rate limiter
app.use(
	rateLimit({
		windowMs: 1 * 60 * 1000, // 1min
		max: 10,
	})
);

// Prevent HTTP param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/movies", movies);

let port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
			.bold
	);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server and exit process
	server.close(() => process.exit(1));
});
