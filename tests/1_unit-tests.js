const chai = require('chai');
let assert = chai.assert;

const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    // #1
    test('convertHandler should correctly read a whole number input.', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });

    // #2
    test('convertHandler should correctly read a decimal number input.', function () {
      assert.equal(convertHandler.getNum('3.2kg'), 3.2);
    });

    // #3
    test('convertHandler should correctly read a fractional input.', function () {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
      assert.equal(convertHandler.getNum('1.5/3mi'), 0.5);
    });

    // #5
    test('convertHandler should correctly return an error on a double-fraction.', function () {
      assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
    });

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
      assert.equal(convertHandler.getNum('kg'), 1);
    });

  });

  suite('Function convertHandler.getUnit(input)', function () {

    // #7
    test('convertHandler should correctly read each valid input unit.', function () {
      assert.equal(convertHandler.getUnit('32gal'), 'gal');
      assert.equal(convertHandler.getUnit('32L'), 'L');
      assert.equal(convertHandler.getUnit('32mi'), 'mi');
      assert.equal(convertHandler.getUnit('32km'), 'km');
      assert.equal(convertHandler.getUnit('32lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('32kg'), 'kg');
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', function () {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

  });

  suite('Function convertHandler.convert(num, unit)', function () {

    // #11
    test('convertHandler should correctly convert gal to L.', function () {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
    });

    // #12
    test('convertHandler should correctly convert L to gal.', function () {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.0001);
    });

    // #13
    test('convertHandler should correctly convert mi to km.', function () {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
    });

    // #14
    test('convertHandler should correctly convert km to mi.', function () {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
    });

    // #15
    test('convertHandler should correctly convert lbs to kg.', function () {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.0001);
    });

    // #16
    test('convertHandler should correctly convert kg to lbs.', function () {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
    });

  });

});
