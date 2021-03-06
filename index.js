const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const { config } = require('./config/index');
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
const notFoundhandler = require('./utils/middleware/notFoundHandler');

app.use(cors());

// body parser
app.use(express.json());
// helmet
app.use(helmet());
// routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundhandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
