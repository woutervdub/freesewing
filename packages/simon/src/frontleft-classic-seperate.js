export default part => {
  let {
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  let fold = options.buttonholePlacketFoldWidth
  points.hpsEdge = utils.lineIntersectsCurve(
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y + 20),
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.hpsCp2Front,
    points.hps
  )
  points.hemEdge = new Point(points.hpsEdge.x, points.cfHem.y)

  paths.seam = paths.seam.split(points.hpsEdge)[0]
  paths.seam.ops[0].to = points.hemEdge
  paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Title
    macro('title', { at: points.title, nr: '2a', title: 'frontLeft' })

    delete snippets['cfWaist-notch']
    delete snippets['cfHips-notch']
    delete snippets['cfArmhole-notch']
    points.edgeArmhole = new Point(points.hpsEdge.x, points.armhole.y)
    points.edgeWaist = new Point(points.hpsEdge.x, points.waist.y)
    points.edgeHips = new Point(points.hpsEdge.x, points.hips.y)
    macro('sprinkle', {
      snippet: 'notch',
      on: ['edgeArmhole', 'edgeWaist', 'edgeHips']
    })
    if (sa) {
      paths.saFromArmhole.end().x = points.hpsEdge.x - sa
      paths.hemSa.start().x = points.hpsEdge.x - sa
      paths.saClosure = new Path()
        .move(paths.saFromArmhole.end())
        .line(paths.hemSa.start())
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hpsEdge,
      to: points.hps,
      y: points.hps.y - sa - 15
    })
    macro('hd', {
      from: points.hpsEdge,
      to: points.shoulder,
      y: points.hps.y - sa - 30
    })
    macro('vd', {
      from: points.hpsEdge,
      to: points.hps,
      x: points.hpsEdge.x - sa - 15
    })
    macro('vd', {
      from: points.hemEdge,
      to: points.hps,
      x: points.hpsEdge.x - sa - 30
    })
    for (let pid of ['Armhole', 'Waist', 'Hips']) {
      macro('hd', {
        from: points['edge' + pid],
        to: points[pid.toLowerCase()]
      })
    }
  }
  return part
}
