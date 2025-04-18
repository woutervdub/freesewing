import { frontSidePanel } from './frontsidepanel.mjs'
import { dim } from './shared.mjs'

export const waistband = {
  name: 'devon.waistband',
  from: frontSidePanel,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    // Parameters
  },
  draft: ({ Point, points, Path, paths, macro, sa, store, part }) => {
    for (const i in paths) {
      delete paths[i]
    }
    for (const i in points) {
      delete points[i]
    }

    const hemLength = store.get('hemLength')
    const waistbandWidth = store.get('waistbandWidth')

    console.log({ hemLength: hemLength, waistbandWidth: waistbandWidth })

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(hemLength * 0.5, 0)
    points.bottomLeft = new Point(0, waistbandWidth)
    points.bottomRight = new Point(hemLength * 0.5, waistbandWidth)

    paths.seamBase = new Path()
      .move(points.topRight)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .hide()

    paths.seam = new Path()
      .move(points.topRight)
      .join(paths.seamBase)
      .line(points.topRight)
      .close()
      .attr('class', 'fabric')

    // Seam allowance
    if (sa) {
      paths.sa = new Path()
        .move(points.topRight)
        .join(paths.seamBase.offset(sa))
        .line(points.bottomRight)
        .attr('class', 'fabric sa')
    }

    /*
     * Annotatinos
     */

    // Cut on fold
    macro('cutonfold', {
      from: points.bottomRight,
      to: points.topRight,
      grainline: false,
    })

    store.cutlist.removeCut('fabric')
    store.cutlist.addCut({ cut: 1, from: 'fabric', onFold: true })

    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 13, title: 'waistband', at: points.title })

    dim(part, [
      ['h', 'topLeft', 'topRight', 'topLeft', -15],
      ['v', 'bottomLeft', 'topLeft', 'topLeft', -15],
    ])

    return part
  },
}
