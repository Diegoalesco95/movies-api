// @packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// @scripts
import config from 'src/config';
import { logErrors, wrapErrors, errorHandler } from 'src/utils/middleware/errorHandlers';
import notFoundhandler from 'src/utils/middleware/notFoundHandler';

// src/routes
import authApi from 'src/routes/auth';
import moviesApi from 'src/routes/movies';
import genresApi from 'src/routes/genres';
import userMoviesApi from 'src/routes/userMovies';

const app = express();

// Cors
app.use(cors());
// Body Parser
app.use(express.json());
// Helmet
app.use(helmet());
// Routes
authApi(app);
genresApi(app);
moviesApi(app);
userMoviesApi(app);
// Catch 404
app.use(notFoundhandler);
// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[⚙️ Listening at: http://localhost:${config.port}]`);
});

export default app;
