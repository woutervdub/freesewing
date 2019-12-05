import { expect } from 'chai'
import { measurements } from '@freesewing/models'

const configTests = (pattern, pkg) => {
  const departments = ['menswear', 'womenswear', 'accessories', 'unisex']

  it('Name should be name in package.json minus namespace', () => {
    expect(pattern.config.name).to.equal(pkg.name.split('/').pop())
  })

  it('Version should be the same as in package.json', () => {
    expect(pattern.config.version).to.equal(pkg.version)
  })

  it('Design should be a non-empty string', () => {
    expect(typeof pattern.config.design).to.equal('string')
    expect(pattern.config.design).to.not.be.empty
  })

  it('Code should be a non-empty string', () => {
    expect(typeof pattern.config.code).to.equal('string')
    expect(pattern.config.code).to.not.be.empty
  })

  it('Department should be valid', () => {
    expect(departments.indexOf(pattern.config.department)).to.not.equal(-1)
  })

  it('Type should be a non-empty string', () => {
    expect(typeof pattern.config.type).to.equal('string')
    expect(pattern.config.type).to.not.be.empty
  })

  it('Difficulty should be a number from 1 to 5', () => {
    expect(typeof pattern.config.difficulty).to.equal('number')
    expect(pattern.config.difficulty).to.be.above(0)
    expect(pattern.config.difficulty).to.be.below(6)
  })

  it('Option groups should contain all options', () => {
    let options = []
    for (let o in pattern.config.options) {
      if (typeof pattern.config.options[o] === 'object') options.push(o)
    }
    let optionsInGroup = []
    for (let g1 in pattern.config.optionGroups) {
      for (let g2 in pattern.config.optionGroups[g1]) {
        if (typeof pattern.config.optionGroups[g1][g2] === 'string') {
          optionsInGroup.push(pattern.config.optionGroups[g1][g2])
        } else {
          for (let g3 in pattern.config.optionGroups[g1][g2]) {
            if (Array.isArray(pattern.config.optionGroups[g1][g2][g3])) {
              optionsInGroup = optionsInGroup.concat(pattern.config.optionGroups[g1][g2][g3])
            } else throw new Error('Improperly formatted option group structure')
          }
        }
      }
    }

    for (let o of options) expect(optionsInGroup.indexOf(o)).to.not.equal(-1)
    expect(options.length).to.equal(optionsInGroup.length)
  })

  it('All measurements should be valid', () => {
    let allMeasurements = []
    if (pattern.config.department === 'menswear') allMeasurements = measurements.menswear
    else allMeasurements = measurements.womenswear
    for (let m of pattern.config.measurements) {
      if (allMeasurements.indexOf(m) === -1) console.log('Not a valid measurement:', m)
      expect(allMeasurements.indexOf(m)).to.not.equal(-1)
    }
  })

  it('All options should be valid', () => {
    for (let o in pattern.config.options) {
      if (typeof pattern.config.options[o] === 'object') {
        let opt = pattern.config.options[o]
        for (let type of ['pct', 'deg', 'mm', 'count']) {
          if (typeof opt[type] !== 'undefined') {
            expect(typeof opt.min).to.equal('number')
            expect(typeof opt.max).to.equal('number')
            expect(typeof opt[type]).to.equal('number')
            expect(Object.keys(opt).length).to.equal(3)
          }
        }
        if (typeof opt.dflt !== 'undefined') {
          // List option
          expect(Array.isArray(opt.list)).to.be.true
          expect(opt.list.indexOf(opt.dflt)).to.not.equal(-1)
          expect(opt.list.length).to.be.greater.than(1)
        }
      } else {
        expect(
          ['string', 'number', 'boolean'].indexOf(typeof pattern.config.options[o])
        ).to.not.equal(-1)
      }
    }
  })
}

export default configTests
