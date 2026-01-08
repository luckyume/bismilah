'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', function (req, res) {
    const input = req.query.input;

    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);

    if (num === 'invalid number' && unit === 'invalid unit') {
      return res.type('text').send('invalid number and unit');
    }
    if (num === 'invalid number') {
      return res.type('text').send('invalid number');
    }
    if (unit === 'invalid unit') {
      return res.type('text').send('invalid unit');
    }

    const returnUnit = convertHandler.getReturnUnit(unit);
    const returnNum = convertHandler.convert(num, unit);

    res.json({
      initNum: num,
      initUnit: unit,
      returnNum,
      returnUnit,
      string: `${num} ${convertHandler.spellOutUnit(unit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`
    });
  });
};
