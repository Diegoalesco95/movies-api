import express from 'express';
import supertest from 'supertest';

function testServer(route: any) {
  const app = express();
  route(app);
  return supertest(app);
}

export default testServer;
