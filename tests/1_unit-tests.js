const chai = require('chai')
let assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

let convertHandler = new ConvertHandler()

suite('Unit Tests', function () {
  test('Whole number input', function (done) {
    let input = '32L'
    assert.equal(convertHandler.getNum(input), 32)
    done()
  })

  test('Decimal number input', function (done) {
    let input = '3.2L'
    assert.equal(convertHandler.getNum(input), 3.2)
    done()
  })

  test('Fractional number input', function (done) {
    let input = '3/2L'
    assert.equal(convertHandler.getNum(input), 3 / 2)
    done()
  })

  test('Fractional number input with decimal', function (done) {
    let input = '3/2.1L'
    assert.equal(convertHandler.getNum(input), 3 / 2.1)
    done()
  })

  test('Invalid fractional number input', function (done) {
    let input = '3/2/2.1L'
    assert.equal(convertHandler.getNum(input), undefined)
    done()
  })

  test('no number input', function (done) {
    let input = 'L'
    assert.equal(convertHandler.getNum(input), 1)
    done()
  })

  test('read valid input', function (done) {
    let input = '10L'
    assert.equal(convertHandler.getNum(input), 10)
    done()
  })

  test('read valid unit', function (done) {
    let input = '1.0L'
    assert.equal(convertHandler.getUnit(input), 'L')
    done()
  })

  test('return error for invalid input', function (done) {
    let input = '10KKK'
    assert.equal(convertHandler.getUnit(input), undefined)
    done()
  })

  test('return unit for valid input', function (done) {
    let input = '10km'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'mi')
    done()
  })

  test('return unit for valid input', function (done) {
    let input = '10mi'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.spellOutUnit(returnUnit), 'miles')
    done()
  })

  test('convert mi unit for valid input and return converted input', function (done) {
    let input = '10mi'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'km')
    done()
  })

  test('convert gal unit for valid input and return converted input', function (done) {
    let input = '10gal'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'L')
    done()
  })

  test('convert l unit for valid input and return converted input', function (done) {
    let input = '10l'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'gal')
    done()
  })

  test('convert km unit for valid input and return converted input', function (done) {
    let input = '10km'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'mi')
    done()
  })

  test('convert lbs unit for valid input and return converted input', function (done) {
    let input = '10lbs'
    let returnUnit = convertHandler.getUnit(input)
    assert.equal(convertHandler.getReturnUnit(returnUnit), 'kg')
    done()
  })
})
