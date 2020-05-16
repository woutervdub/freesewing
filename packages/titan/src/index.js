import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'

const pluginMeasurements = {
  name: 'measurements',
  version: '0.0.1',
  hooks: {
    preDraft: function ({ settings }) {
      if (
        typeof settings.measurements.frontHips !== 'undefined' &&
        typeof settings.measurements.hipsCircumference !== 'undefined'
      ) {
        settings.measurements.backHips =
          settings.measurements.hipsCircumference - settings.measurements.frontHips
        settings.measurements.backHipArc = settings.measurements.backHips / 2
        settings.measurements.frontHipArc = settings.measurements.frontHips / 2
      }
      if (
        typeof settings.measurements.naturalWaist !== 'undefined' &&
        typeof settings.measurements.backWaist !== 'undefined'
      ) {
        settings.measurements.backWaistArc = settings.measurements.backWaist / 2
        settings.measurements.frontWaistArc =
          (settings.measurements.naturalWaist - settings.measurements.backWaist) / 2
      }
      if (
        typeof settings.measurements.crossSeam !== 'undefined' &&
        typeof settings.measurements.frontCrossSeam !== 'undefined'
      ) {
        settings.measurements.backCrossSeam =
          settings.measurements.crossSeam - settings.measurements.frontCrossSeam
      }
    }
  }
}

// Create design
const Pattern = new freesewing.Design(config, [plugins, pluginMeasurements])

// Attach draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)

export default Pattern
