const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const assert = chai.assert;

suite('Functional Tests', function () {

  // #1
  test('Convert a valid input such as 10L', function (done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function (err, res) {
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        done();
      });
  });

  // #2
  test('Convert an invalid input such as 32g', function (done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function (err, res) {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  // #3
  test('Convert an invalid number such as 3/7.2/4kg', function (done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  // #4
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function (err, res) {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  // #5
  test('Convert with no number such as kg', function (done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function (err, res) {
        assert.equal(res.body.initNum, 1);
        done();
      });
  });

});
