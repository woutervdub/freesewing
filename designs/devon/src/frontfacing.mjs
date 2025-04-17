import { front } from './front.mjs'
import { dim } from './shared.mjs'

export const frontFacing = {
  name: 'devon.frontFacing',
  from: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    // Parameters
  },
  draft: ({ points, Path, paths, macro, sa, store, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      if (['frontCollar'].indexOf(i) === -1) delete paths[i]
    }

    macro('mirror', {
      clone: true,
      mirror: [points.cfNeck, points.cfHem],
      points: ['frontNeck', 'frontYoke', 'frontHem'],
      nameFormat: (n) => {
        return n.replace('front', 'facing')
      },
    })

    console.log({ p: points.frontCollarPoint })
    console.log({ s: paths.frontCollar.split(points.frontCollarPoint), p: points.frontCollarPoint })
    paths.collarFacing = paths.frontCollar.split(points.frontCollarPoint)[1].attr('class', 'note')

    points.facingYokeCp1 = points.facingYoke.shiftFractionTowards(points.facingNeck, 0.3)
    points.facingCollar = points.frontCollarPoint.copy()
    points.facingCollarCp2 = points.facingCollar.shift(
      points.facingCollar.angle(paths.collarFacing.shiftAlong(2)) + 90,
      points.facingYoke.dist(points.facingNeck) * 0.33
    )

    paths.seam = new Path()
      .move(points.facingHem)
      .line(points.facingYoke)
      .curve(points.facingYokeCp1, points.facingCollarCp2, points.facingCollar)
      .join(paths.collarFacing)
      .line(points.frontNeck)
      .line(points.frontYoke)
      .line(points.frontHem)
      .line(points.facingHem)
      .close()
      .attr('class', 'fabric')

    // Seam allowance
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    /*
     * Annotatinos
     */
    store.cutlist.addCut({ cut: 2, from: 'fabric', onFold: false })

    points.title = points.frontYokePanel.shiftFractionTowards(points.cfChest, 0.5)
    macro('title', { nr: 12, title: 'frontFacing', at: points.title })

    dim(part, [
      ['h', 'frontNeck', 'facingCollar', 'facingCollar', -15],
      ['h', 'frontNeck', 'cfNeck', 'cfNeck', -15],
      ['h', 'frontHem', 'facingHem', 'facingHem', 15],
      ['v', 'frontHem', 'frontNeck', 'frontNeck', -15],
      ['v', 'facingNeck', 'facingCollar', 'frontNeck', -15],
      ['v', 'facingHem', 'facingCollar', 'facingCollar', 15],
      ['v', 'facingHem', 'facingYoke', 'facingYoke', 15],
    ])

    return part
  },
}
