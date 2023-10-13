const { parse } = require('dotenv')

function numberStringSplit(input) {
  let numberVal = input.match(/[.\d\/]+/g) || '1'
  let stringVal = input.match(/[a-zA-Z]+/g)[0]

  return [numberVal[0], stringVal]
}
function confirmDivision(fractionInput) {
  let nums = fractionInput.split('/')
  if (nums.length > 2) {
    return false
  }
  return nums
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplit(input)[0]
    let numConf = confirmDivision(result)

    console.log('result', result)

    if (!numConf) {
      return undefined
    }

    let num1 = numConf[0]
    let num2 = numConf[1] || '1'

    result = parseFloat(num1) / parseFloat(num2)

    if (isNaN(num1) || isNaN(num2)) {
      return undefined
    }

    console.log('result', result)

    return result
  }

  this.getUnit = function (input) {
    let result = numberStringSplit(input)[1].toLowerCase()

    switch (result) {
      case 'km':
        return 'km'
      case 'gal':
        return 'gal'
      case 'lbs':
        return 'lbs'
      case 'l':
        return 'L'
      case 'mi':
        return 'mi'
      case 'kg':
        return 'kg'
      default:
        return undefined
    }
  }

  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowerCase()

    switch (unit) {
      case 'km':
        return 'mi'
      case 'gal':
        return 'L'
      case 'lbs':
        return 'kg'
      case 'l':
        return 'gal'
      case 'mi':
        return 'km'
      case 'kg':
        return 'lbs'
      default:
        return undefined
    }
  }

  this.spellOutUnit = function (initUnit) {
    let unit = initUnit.toLowerCase()

    switch (unit) {
      case 'km':
        return 'kilometers'
      case 'gal':
        return 'gallons'
      case 'lbs':
        return 'pounds'
      case 'l':
        return 'liters'
      case 'mi':
        return 'miles'
      case 'kg':
        return 'kilograms'
      default:
        return 'Dont know'
    }
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    let unit = initUnit.toLowerCase()
    let result = 0

    switch (unit) {
      case 'km':
        result = initNum / miToKm
        break
      case 'gal':
        result = initNum * galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'l':
        result = initNum / galToL
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      default:
        return undefined
    }

    return parseFloat(result.toFixed(5))
  }

  this.getString = function (
    initNum,
    initUnitString,
    returnNum,
    returnUnitString
  ) {
    return `${initNum} ${this.spellOutUnit(
      initUnitString
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnitString)}`
  }
}

module.exports = ConvertHandler
