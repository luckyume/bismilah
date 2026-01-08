const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });

    test('Decimal number input', function () {
      assert.equal(convertHandler.getNum('3.2kg'), 3.2);
    });

    test('Fractional input', function () {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test('Fractional input with decimal', function () {
      assert.equal(convertHandler.getNum('1.5/2mi'), 0.75);
    });

    test('Double fraction returns error', function () {
      assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
    });

    test('Default to 1 when no number', function () {
      assert.equal(convertHandler.getNum('kg'), 1);
    });
  });

  suite('Function convertHandler.getUnit(input)', function () {
    test('Valid units', function () {
      const units = ['gal','L','mi','km','lbs','kg'];
      units.forEach(u => assert.isOk(convertHandler.getUnit(`1${u}`)));
    });

    test('Invalid unit', function () {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  suite('Function convertHandler.convert(num, unit)', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.0001);
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.0001);
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
  });
});
