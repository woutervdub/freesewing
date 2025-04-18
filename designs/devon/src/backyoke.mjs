import { back } from './back.mjs'
import { dim } from './shared.mjs'

export const backYoke = {
  name: 'devon.backYoke',
  from: back,
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
      if (['backArmholeComplete', 'backCollar'].indexOf(i) === -1) delete paths[i]
    }

    paths.backYokeSeam = new Path()
      .move(points.cbYoke)
      .line(points.backArmholeYoke)
      .attr('class', 'fabric')

    paths.backYokeArmhole = paths.backArmholeComplete.split(points.backArmholeYoke)[1].hide()

    paths.seam = new Path()
      .move(points.backArmholeYoke)
      .join(paths.backYokeArmhole)
      .line(points.s3CollarSplit)
      .join(paths.backCollar)
      .join(paths.backYokeSeam)
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

    points.title = points.backArmholeYoke.shiftFractionTowards(points.cbNeck, 0.5)
    macro('title', { nr: 3, title: 'backYoke', at: points.title })

    dim(part, [
      ['h', 'cbYoke', 'backArmholeYoke', 'cbYoke', 15],
      ['h', 'cbNeck', 's3CollarSplit', 's3CollarSplit', -15],
      ['h', 's3CollarSplit', 's3ArmholeSplit', 's3CollarSplit', -15],
      ['v', 'cbYoke', 'cbNeck', 'cbYoke', -15],
      ['v', 'cbNeck', 's3CollarSplit', 'cbNeck', -15],
      ['v', 's3ArmholeSplit', 's3CollarSplit', 's3ArmholeSplit', 15],
      ['v', 'backArmholeYoke', 's3CollarSplit', 's3ArmholeSplit', 15],
    ])

    return part
  },
}
