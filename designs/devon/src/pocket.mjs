import { front } from './front.mjs'
import { dim } from './shared.mjs'

export const pocket = {
  name: 'devon.pocket',
  from: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    pocketHeightRatio: 13.5 / 12,
    pocketSideHeightRatio: 11.5 / 12,
    pocketLowerWidthRatio: 10.5 / 12,
    // Parameters
  },
  draft: ({ Point, points, Path, paths, macro, options, sa, store, part }) => {
    for (const i in paths) {
      delete paths[i]
    }
    for (const i in points) {
      delete points[i]
    }

    const pocketWidth = store.get('pocketWidth')

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(pocketWidth, 0)
    points.bottomLeft = points.topLeft
      .shiftFractionTowards(
        points.topRight,
        // (pocketWidth * (1 - options.pocketLowerWidthRatio)) / 100
        1 - options.pocketLowerWidthRatio
      )
      .shift(270, pocketWidth * options.pocketSideHeightRatio)
    points.bottomRight = points.topLeft
      .shiftFractionTowards(points.topRight, options.pocketLowerWidthRatio)
      .shift(270, pocketWidth * options.pocketSideHeightRatio)
    points.bottomMiddle = points.topLeft
      .shiftFractionTowards(points.topRight, 0.5)
      .shift(270, pocketWidth * options.pocketHeightRatio)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomMiddle)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
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

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 10, title: 'pocket', at: points.title })

    dim(part, [
      ['h', 'topLeft', 'topRight', 'topLeft', -15],
      ['h', 'bottomLeft', 'bottomRight', 'bottomMiddle', 15],
      ['h', 'topLeft', 'bottomLeft', 'bottomMiddle', 15],
      ['h', 'bottomRight', 'topRight', 'bottomMiddle', 15],
      ['v', 'bottomLeft', 'topLeft', 'topLeft', -15],
      ['v', 'bottomMiddle', 'topRight', 'topRight', 15],
    ])

    return part
  },
}
