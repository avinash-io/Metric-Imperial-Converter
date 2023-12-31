const chaiHttp = require('chai-http')
const chai = require('chai')
let assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  suite('Routing Tests', function () {
    suite('GET /api/convert => conversion object', function () {
      test('Convert 10L (valid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 10)
            assert.equal(res.body.initUnit, 'L')
            assert.approximately(res.body.returnNum, 2.64172, 0.1)
            assert.equal(res.body.returnUnit, 'gal')
            done()
          })
      })

      test('Convert 32g (invalid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '32g' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initUnit, undefined)
            done()
          })
      })

      test('Convert  3/7.2/4kg (invalid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: ' 3/7.2/4kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initUnit, undefined)
            done()
          })
      })

      test('Convert  3/7.2/4kilomegagram (invalid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: ' 3/7.2/4kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initUnit, undefined)
            done()
          })
      })

      test('Convert no number Kg (valid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: 'kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 1)
            assert.equal(res.body.initUnit, 'kg')
            done()
          })
      })
      /*
Convert with no number such as kg: GET request to /api/convert.*/
    })
  })
})
