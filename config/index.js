import { version } from "../package.json";

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: "box",
  version,
  design: "Stoffsuchti/WouterVdub",
  code: "Stoffsuchti/WouterVdub",
  department: "accessories",
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
    options: ["size", "zipperSize"]
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["sidepanel","frontpanel","bottompanel","zipperpanel","sidepanelreinforcement"],
  options: {
    width: 230,
    height: 330,
    size: { pct: 50, min: 10, max: 100 },
    zipperSize: { dflt: '#5', list: ['#3','#4','#4.5','#5','#6','#8','#10','Invisible']} 
  }
};
