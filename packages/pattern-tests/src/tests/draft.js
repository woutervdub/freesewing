import fs from 'fs'
import { expect } from 'chai'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import theme from '@freesewing/plugin-theme'
import templates from '../templates'

const draftTests = (pattern, pkg, report = true) => {
  const sampleBy = {
    centerBackNeckToHips: 0.01,
    hpsToHipsBack: 0.01,
    shoulderSlope: 0.01
  }

  // With or without breasts?
  let models = {}
  let breasts = 'with breasts'
  if (pattern.config.department === 'womenswear') models = withBreasts
  else {
    models = withoutBreasts
    breasts = 'without breasts'
  }

  let content = ''
  if (report) {
    content += `<h1>${pattern.config.name} test results</h1>`
    content += '<h2>Drafting for different models</h2><div class="wrapper">'
  }

  for (let m in models) {
    it(`Draft ${pattern.config.name} in ${m} (${breasts})`, () => {
      let start = new Date()
      let draft = new pattern({
        embed: true,
        measurements: models[m]
      })
      draft.use(theme)
      draft.draft()
      let took = new Date() - start
      expect(draft.width).to.equal(0)
      expect(draft.height).to.equal(0)
      expect(draft.is).to.equal('draft')
      if (report) {
        content += '<div class="test">'
        content += `<h3>${m} (${breasts})</h3>`
        content += `<div class="svg">${draft.render()}</div>`
        content += `<p>Took ${took} milliseconds</p>`
        content += '</div>'
      }
    })
  }

  if (report) {
    it(`Adding measurement sampling title`, () => {
      content += '</div><h2>Sampling different measurements</h2><div class="wrapper">'
    })
  }

  for (let m of pattern.config.measurements) {
    it(`Sample ${m}`, () => {
      let start = new Date()
      let draft = new pattern({
        embed: true,
        measurements: models.size40
      })
      draft.use(theme)
      draft.sampleMeasurement(m, sampleBy[m] || 0.1)
      let took = new Date() - start
      expect(draft.width).to.equal(0)
      expect(draft.height).to.equal(0)
      expect(draft.is).to.equal('sample')
      if (report) {
        content += '<div class="test">'
        content += `<h3>${m}</h3>`
        content += `<div class="svg">${draft.render()}</div>`
        content += `<p>Took ${took} milliseconds</p>`
        content += '</div>'
      }
    })
  }

  if (report) {
    it(`Adding options sampling title`, () => {
      content += '</div><h2>Sampling different options</h2><div class="wrapper">'
    })
  }

  for (let o in pattern.config.options) {
    it(`Sample ${o}`, () => {
      let start = new Date()
      let draft = new pattern({
        embed: true,
        measurements: models.size40
      })
      draft.use(theme)
      draft.sampleOption(o)
      let took = new Date() - start
      expect(draft.width).to.equal(0)
      expect(draft.height).to.equal(0)
      expect(draft.is).to.equal('sample')
      if (report) {
        content += '<div class="test">'
        content += `<h3>${o}</h3>`
        content += `<div class="svg">${draft.render()}</div>`
        content += `<p>Took ${took} milliseconds</p>`
        content += '</div>'
      }
    })
  }

  if (report) {
    it(`Should save results`, () => {
      content += '</div>'
      fs.mkdirSync('./report', { recursive: true })
      fs.writeFileSync('./report/style.css', templates.css)
      fs.writeFileSync('./report/index.html', templates.pageStart + content + templates.pageEnd)
    })
  }
}

export default draftTests
