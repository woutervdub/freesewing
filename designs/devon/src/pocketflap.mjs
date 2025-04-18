import { pocket } from './pocket.mjs'
import { dim } from './shared.mjs'

export const pocketflap = {
  name: 'devon.pocketflap',
  from: pocket,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    pocketflapHeightRatio: 6.5 / 12,
    pocketflapSideHeightRatio: 3.5 / 12,
    // Parameters
  },
  draft: ({ points, Path, paths, macro, options, store, sa, part }) => {
    const pocketWidth = store.get('pocketWidth')

    // points.topLeft = new Point(0, 0)
    // points.topRight = new Point(pocketWidth,0)
    points.bottomLeft = points.topLeft.shift(270, pocketWidth * options.pocketflapSideHeightRatio)
    points.bottomRight = points.topRight.shift(270, pocketWidth * options.pocketflapSideHeightRatio)
    points.bottomMiddle = points.topLeft
      .shiftFractionTowards(points.topRight, 0.5)
      .shift(270, pocketWidth * options.pocketflapHeightRatio)

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
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { nr: 11, title: 'pocketflap', at: points.title })

    macro('rmHd', 'htopLeftbottomLeft')
    macro('rmHd', 'hbottomRighttopRight')
    macro('rmHd', 'hbottomLeftbottomRight')

    dim(part, [
      ['h', 'topLeft', 'topRight', 'topLeft', -15],
      ['v', 'bottomLeft', 'topLeft', 'topLeft', -15],
      ['v', 'bottomMiddle', 'topRight', 'topRight', 15],
    ])

    return part
  },
}
