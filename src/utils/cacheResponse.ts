// @packages
import { Response } from 'express';
// @scripts
import config from '@config/index';

function cacheResponse(res: Response, seconds: number) {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

export default cacheResponse;
