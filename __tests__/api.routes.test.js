const request = require('supertest');
const app = require('../server/server');

describe('API routes', () => {
  it('GET /test -> 200 and JSON payload', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ message: 'Server is working!' });
  });

  it('GET /example-schema -> 200 and contains SQLSchema + GQLSchema', async () => {
    const res = await request(app).get('/example-schema');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('SQLSchema');
    expect(res.body).toHaveProperty('GQLSchema');
  });

  it('GET /example-schema-json -> 200 and returns object schema', async () => {
    const res = await request(app).get('/example-schema-json');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(typeof res.body).toBe('object');
  });

  it('POST /sql-schema -> 200 and returns composed payload', async () => {
    const res = await request(app)
      .post('/sql-schema')
      .send({ link: 'encrypted-placeholder' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('SQLSchema');
    expect(res.body).toHaveProperty('GQLSchema');
  });

  it('GET /nosuchroute -> 404 Not Found', async () => {
    const res = await request(app).get('/nosuchroute');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Not Found');
  });
});


