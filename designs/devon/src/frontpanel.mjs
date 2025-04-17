// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'
import { dim } from './shared.mjs'

export const frontPanel = {
  name: 'devon.frontPanel',
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
  draft: ({ points, Path, paths, macro, options, sa, store, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      delete paths[i]
    }

    points.panelPocketTop = points.frontHemSidePanel.shiftFractionTowards(
      points.frontYokeSidePanel,
      options.pocketHeight
    )
    points.cfPocketBottom = points.cfHem.copy()
    points.cfPocketTop = points.cfPocketBottom.shiftFractionTowards(
      points.cfYoke,
      options.pocketHeight
    )

    macro('mirror', {
      clone: true,
      mirror: [points.frontHemSidePanel, points.frontYokeSidePanel],
      points: ['cfPocketBottom', 'cfPocketTop'],
    })

    // paths.pocket = new Path()
    //   .move(points.panelPocketTop)
    //   .line(points.mirroredCfPocketTop)
    //   .line(points.mirroredCfPocketBottom)
    //   .line(points.frontHemSidePanel)

    paths.seam = new Path()
      .move(points.frontHemSidePanel)
      .line(points.frontYokeSidePanel)
      .line(points.frontYokePanel)
      .line(points.frontHemPanel)
      .line(points.frontHemSidePanel)
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

    points.title = points.frontYokePanel
      .shiftFractionTowards(points.frontYokeSidePanel, 0.35)
      .shiftFractionTowards(
        points.frontHemPanel.shiftFractionTowards(points.frontHemSidePanel, 0.35),
        0.3
      )
    macro('title', { nr: 5, title: 'frontPanel', at: points.title })

    dim(part, [
      ['h', 'frontYokePanel', 'frontYokeSidePanel', 'frontYokePanel', -15],
      ['h', 'frontHemPanel', 'frontHemSidePanel', 'frontHemPanel', 15],
      ['h', 'frontYokePanel', 'frontHemPanel', 'frontHemPanel', 15],
      ['h', 'frontHemSidePanel', 'frontYokeSidePanel', 'frontHemPanel', 15],
      ['v', 'frontHemPanel', 'frontYokePanel', 'frontYokePanel', -15],
      ['v', 'frontHemSidePanel', 'frontYokeSidePanel', 'frontYokeSidePanel', 15],
      ['v', 'frontHemPanel', 'frontHemSidePanel', 'frontYokeSidePanel', 15],
    ])

    return part
  },
}
