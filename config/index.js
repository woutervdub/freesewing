import { version } from "../package.json";

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: "albert",
  version,
  design: "WouterVdub",
  code: "WouterVdub",
  department: "unisex",
  type: "pattern",
  difficulty: 3,
  tags: [
    "freesewing",
    "design",
    "diy",
    "fashion",
    "made to measure",
    "parametric design",
    "pattern",
    "sewing",
    "sewing pattern"
  ],
  optionGroups: {
    fit: ["backOpening"],
    style: ["lengthBonus", "bibLength"]
  },
  measurements: [
    "chestCircumference",
    "waistCircumference",
    "hipsCircumference",
    "hpsToWaistFront",
    "waistToKnee"
  ],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["front"],
  options: {
    backOpening: { pct: 10, min: 0, max: 25 },
    lengthBonus: { pct: 0, min: -20, max: 25 },
    bibLength: { pct: 75, min: 0, max: 90 },
    
  }
};
