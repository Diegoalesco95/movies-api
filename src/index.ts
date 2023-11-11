// @packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// @scripts
import config from '@config/index';
import { logErrors, wrapErrors, errorHandler } from '@utils/middleware/errorHandlers';
import notFoundhandler from '@utils/middleware/notFoundHandler';

// @routes
import authApi from '@routes/auth';
import moviesApi from '@routes/movies';
import genresApi from '@routes/genres';
import userMoviesApi from '@routes/userMovies';

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
