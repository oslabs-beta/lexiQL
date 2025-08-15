const request = require('supertest');

const server = 'http://localhost:3000';
/**************************** Route Integration testing *********************/

// Test if main route successfully serves our html file
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
// Test if visualizer route successfully serves our html file
/*****TODO*****: Update to check if the div with id datapage is served */
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
// Test if status 404 and 'Not Found' is sent when route does not exist
describe('Route integration', () => {
  describe('/nosuchroute', () => {
    describe('GET', () => {
      it('responds with 404 status and Not Found', () => {
        return request(server)
          .get('/nosuchroute')
          .expect('Content-Type', /text\/html/)
          .expect(404, 'Not Found');
      });
    });
  });
});
// Test if route to get example schema has status 200 and content type is json
/*****TODO*****: Update to check the contents of the response body for the schema */
describe('Route integration', () => {
  describe('/example-schema', () => {
    describe('GET', () => {
      it('responds with 200 status, Content-Type is /json ', () => {
        return request(server).get('/example-schema').expect('Content-Type', /json/).expect(200);
      });
    });
  });
});
//Test if route to get users db schema from their inputted psql_uri has status 200 and content type is json
/*****TODO*****: Update to check the contents of the response body for the schema */
describe('Route integration', () => {
  describe('/sql-schema', () => {
    describe('POST', () => {
      it('responds with 200 status, Content-Type is application/json ', () => {
        return request(server).post('/sql-schema').expect('Content-Type', /json/).expect(200);
      });
    });
  });
});
