function ConvertHandler() {
  
 this.getNum = function (input) {
  const result = input.match(/^[^a-zA-Z]+/);

  if (!result) return 1;

  const num = result[0];

  // invalid double fraction
  if (num.split('/').length > 2) return 'invalid number';

  // invalid multiple decimals
  if ((num.match(/\./g) || []).length > 1 && !num.includes('/'))
    return 'invalid number';

  if (num.includes('/')) {
    const [numerator, denominator] = num.split('/');

    if (
      (numerator.match(/\./g) || []).length > 1 ||
      (denominator.match(/\./g) || []).length > 1
    ) {
      return 'invalid number';
    }

    return parseFloat(numerator) / parseFloat(denominator);
  }

  return parseFloat(num);
};


  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return 'invalid unit';
    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return map[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return map[unit];
  };

  this.convert = function (initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    return Number((initNum * rates[initUnit]).toFixed(5));
  };
}

module.exports = ConvertHandler;
