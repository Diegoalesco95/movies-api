// @packages
import { Response, Request, NextFunction } from 'express';
import boom from '@hapi/boom';
import { AnySchema } from '@hapi/joi';

interface RequestWithScopes extends Request {
  [key: string]: any;
}

function validate(data: any, schema: AnySchema) {
  console.log('data', data);

  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema: AnySchema, check = 'body') {
  return function (req: RequestWithScopes, _res: Response, next: NextFunction) {
    console.log('🔥', req.body);
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

export default validationHandler;
