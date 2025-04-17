import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

export const topSleeve = {
  name: 'devon.topSleeve',
  from: sleeve,
  draft: ({ macro, points, paths, snippets, Snippet, sa, store, part }) => {
    // Extract seamline from sleeve
    delete paths.us
    delete paths.underSleeve
    paths.seam = paths.topSleeve.clone().attr('class', 'fabric', true)
    delete paths.ts
    delete paths.topSleeve

    // Seam allowance
    if (sa) {
      paths.sa = paths.seam.offset(sa).addClass('fabric sa')
    }

    /*
     * Annotations
     */
    // Cut list
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    // Scalebox
    macro('scalebox', { at: points.elbowCenter })

    // Logo
    snippets.logo = new Snippet('logo', points.elbowCenter.shift(90, 50))

    // Title
    macro('title', {
      at: points.armCenter,
      nr: 8,
      title: 'topsleeve',
    })

    dimensions(part, 'ts')
    macro('vd', {
      id: 'hSleeveCap',
      from: points.tsLeftEdge,
      to: points.top,
      x: points.tsLeftEdge.x - sa - 15,
    })
    macro('hd', {
      id: 'wArmholeInnerToSleevecapTop',
      from: points.tsLeftEdge,
      to: points.top,
      y: points.top.x - sa - 15,
    })
    macro('hd', {
      id: 'wArmholeInnerToSleevecapEnd',
      from: points.tsLeftEdge,
      to: points.backPitchPoint,
      y: points.top.x - sa - 30,
    })
    macro('hd', {
      id: 'wSleeveHead',
      from: points.tsLeftEdge,
      to: points.tsRightEdge,
      y: points.top.x - sa - 45,
    })
    macro('vd', {
      id: 'hArmholeInnerToSleeveCapEnd',
      from: points.tsRightEdge,
      to: points.backPitchPoint,
      x: points.tsRightEdge.x + sa + 15,
    })

    return part
  },
}
