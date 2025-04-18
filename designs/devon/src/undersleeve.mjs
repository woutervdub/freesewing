import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

export const underSleeve = {
  name: 'devon.underSleeve',
  from: sleeve,
  draft: ({ macro, points, paths, snippets, Snippet, sa, store, part }) => {
    // Extract seamline from sleeve
    delete paths.ts
    delete paths.topSleeve
    paths.seam = paths.underSleeve.clone().attr('class', 'fabric', true)
    delete paths.us
    delete paths.underSleeve

    points.anchor = points.usTip.clone()

    // Seam allowance
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    /*
     * Annotatinos
     */

    // Cutlist
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    // Logo
    snippets.logo = new Snippet('logo', points.elbowCenter)

    // Title
    macro('title', {
      at: points.armCenter,
      nr: 9,
      title: 'undersleeve',
    })

    dimensions(part, 'us')
    macro('hd', {
      id: 'wArmholeInnerSleeveCapTip',
      from: points.usLeftEdge,
      to: points.usTip,
      y: points.usTip.y - sa - 15,
    })
    macro('vd', {
      id: 'hArmholeInnerSleeveCapTip',
      from: points.usRightEdge,
      to: points.usTip,
      x: points.usRightEdge.x + sa + 15,
    })

    return part
  },
}
