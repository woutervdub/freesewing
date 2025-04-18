// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'
import { dim } from './shared.mjs'

export const frontInside = {
  name: 'devon.frontInside',
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
  draft: ({ points, Path, paths, macro, store, sa, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      delete paths[i]
    }

    // const panelLength = store.get('panelLength')
    // const frontLength = store.get('frontLength')

    // points.frontHemPanel = points.frontYokePanel.shiftTowards(points.frontHemPanel, panelLength)
    // points.cfHem = points.cfYoke.shiftTowards(points.cfHem, frontLength)

    paths.seam = new Path()
      .move(points.frontHemPanel)
      .line(points.frontYokePanel)
      .line(points.frontYoke)
      .line(points.frontHem)
      .line(points.frontHemPanel)
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
    macro('title', { nr: 4, title: 'frontInside', at: points.title })

    dim(part, [
      ['h', 'frontYoke', 'frontYokePanel', 'frontYoke', -15],
      ['h', 'frontHem', 'frontHemPanel', 'frontHem', 15],
      ['h', 'frontYokePanel', 'frontHemPanel', 'frontYoke', -15],
      ['v', 'frontHem', 'frontYoke', 'frontYoke', -15],
      ['v', 'frontHemPanel', 'frontYokePanel', 'frontHemPanel', 15],
      ['v', 'frontHem', 'frontHemPanel', 'frontHemPanel', 15],
    ])

    return part
  },
}
