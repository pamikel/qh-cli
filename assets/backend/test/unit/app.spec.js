const request = require('supertest')
const expect = require('expect')
const app = require('../../app')


describe('app', () => {
  it('should return ok when get /', (next) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual('ok')
        next()
      })
  })
})