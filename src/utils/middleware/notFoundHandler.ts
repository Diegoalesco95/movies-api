// @packages
import { Response, Request } from 'express';
import boom from '@hapi/boom';

function notFoundHandler(_req: Request, res: Response) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}
export default notFoundHandler;
