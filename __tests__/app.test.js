const request = require('supertest');
const { app, server } = require('../app');
const { albumenes } = require('../datos/albumenes');
const routerAcdc = require('../routers/acdc');

describe('GET /api/albumenes', () => {
  afterAll(async () => {
    await server.close();
  });

  test('responds with JSON containing albumenes data', async () => {
    const response = await request(app).get('/api/albumenes');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(albumenes);
  });
});

describe('Correct handling of request', () => {
   
  test('correct handling of requests Acdc', async () => {
    const response = await request(app).get('/api/albumenes/acdc');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(albumenes.acdc);
});

  test('correct handling of requests Metallica', async () => {
  const response = await request(app).get('/api/albumenes/metallica');
  expect(response.status).toBe(200);
  expect(response.body).toEqual(albumenes.metallica);
});

  test('correct handling of requests Queen', async () => {
  const response = await request(app).get('/api/albumenes/queen');
  expect(response.status).toBe(200);
  expect(response.body).toEqual(albumenes.queen);
});
});

//

describe('Handling Error', () => {

  afterAll(async () => {
    await server.close();
  });

  test('responds with 404 for non-existent route', async () => {
    const response = await request(app).get('/api/albumenes/nightwish');

    expect(response.status).toBe(404);
  });
});