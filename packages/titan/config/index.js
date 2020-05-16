import { version } from '../package.json'

export default {
  name: 'titan',
  version,
  design: 'Debra Bean',
  code: 'Joost De Cock',
  department: 'unisex',
  type: 'block',
  difficulty: 3,
  tags: ['bottom', 'basics'],
  optionGroups: {
    style: []
  },
  measurements: [
    'ankleEntry',
    'backWaist',
    'crotchDepth',
    'crossSeam',
    'frontCrossSeam',
    'frontHips',
    'hipsCircumference',
    'kneeCircumference',
    'naturalWaist',
    'naturalWaistToFloor',
    'naturalWaistToKnee',
    'naturalWaistToSeat',
    'upperLegCircumference'
  ],
  parts: ['back'],
  options: {
    backWaistFactor: 0.145,
    grainlineBackFactor: 0.5125,
    crossSeamFitBalance: 0.5,
    fitCrossSeam: true,
    fitFrontCrossSeam: true,
    fitBackCrossSeam: true,
    hipsEase: { pct: 1, min: 0, max: 2 },
    upperLegEase: { pct: 8.5, min: 5, max: 12 },
    crotchExtension: { pct: 5, min: 3, max: 7 },
    backWaistDart: { pct: 12, min: 10, max: 14 },
    backWaistDartLength: { pct: 28.5, min: 25, max: 32 },
    backRise: { pct: 8, min: 5, max: 11 },
    crossSeamCurveStart: { pct: 25, min: 25, max: 75 },
    crossSeamCurveBend: { pct: 65, min: 25, max: 75 },
    kneeEase: { pct: 6, min: 3, max: 9 },
    ankleEase: { pct: 6, min: 3, max: 9 },
    legBalance: { pct: 75, min: 25, max: 100 },
    inseamCurve: { pct: 35, min: 20, max: 50 },
    outseamCurveKnee: { pct: 35, min: 20, max: 50 },
    outseamCurveSeat: { pct: 60, min: 40, max: 80 }
  }
}
