const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and serves static html file', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});

describe('Route integration', () => {
  describe('/data', () => {
    describe('GET', () => {
      it('responds with 200 status and serves static html file', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});
