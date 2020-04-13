const nock = require('nock');

describe('Connection to server app.js', () => {
    beforeEach(() => {
        nock('http://localhost:8080')
        .get('/', )
        .reply(200, resp);
    });

    it('Get root message', () => {
        
    })

});