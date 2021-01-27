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
    options: ["size", "zipperSize","strapLength","handleWidth"]
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["sidepanel","frontpanel","bottompanel","zipperpanel","sidepanelreinforcement","strap"],
  options: {
    width: 230,
    height: 330,
    minHandleSpaceWidth: 80,
    maxHandleSpaceWidth: 250,
    pctHandleSpace: 50,
    pctHandleVert: 42,
    strapLength: { pct: 160, min: 75, max: 250 },
    handleWidth: { mm: 20, min: 7, max: 30 },
    size: { pct: 50, min: 20, max: 200 },
    zipperSize: { dflt: '#5', list: ['#3','#4','#4.5','#5','#6','#8','#10','Invisible']} 
  }
};
