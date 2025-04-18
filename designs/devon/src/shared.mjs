export function dim(part, d) {
  let { macro, points, sa } = part.shorthand()

  d.forEach((e) => {
    const id = e[0] + e[1] + e[2]
    const s = sa * (e[4] > 0 ? 1 : -1)
    macro(e[0] + 'd', {
      id: id,
      from: points[e[1]],
      to: points[e[2]],
      y: points[e[3]].y + s + e[4],
      x: points[e[3]].x + s + e[4],
      d: s + e[4],
    })
    // }
    // switch (e[0]) {
    //   case 'h':
    //     macro('hd', {
    //       id: id,
    //       from: points[e[1]],
    //       to: points[e[2]],
    //       y: points[e[3]].y + s + e[4],
    //     })

    //     break
    //   case 'v':
    //     macro('vd', {
    //       id: id,
    //       from: points[e[1]],
    //       to: points[e[2]],
    //       x: points[e[3]].x + s + e[4],
    //     })
    //     break

    //   case 'l':
    //     macro('vd', {
    //       id: id,
    //       from: points[e[1]],
    //       to: points[e[2]],
    //       d: s + e[4],
    //     })
    //     break
    // }
  })
}

export function dimensions(part, s) {
  let { macro, points, sa } = part.shorthand()

  macro('ld', {
    id: 'wAtCuff',
    from: points[s + 'CuffLeft'],
    to: points[s + 'CuffRight'],
    d: 15,
  })
  macro('ld', {
    id: 'wAtElbow',
    from: points[s + 'ElbowLeft'],
    to: points.elbowRight,
  })
  macro('ld', {
    id: 'wAtArmhole',
    from: points[s + 'LeftEdge'],
    to: points[s + 'RightEdge'],
  })
  macro('hd', {
    id: 'wArmholeInnerToElbowInner',
    from: points[s + 'LeftEdge'],
    to: points[s + 'ElbowLeft'],
    y: points[s + 'CuffRight'].y + sa + 15,
  })
  macro('hd', {
    id: 'wArmholeInnerToCuffInner',
    from: points[s + 'LeftEdge'],
    to: points[s + 'CuffLeft'],
    y: points[s + 'CuffRight'].y + sa + 30,
  })
  macro('hd', {
    id: 'wCuffHorizontal',
    from: points[s + 'LeftEdge'],
    to: points[s + 'CuffRight'],
    y: points[s + 'CuffRight'].y + sa + 45,
  })
  macro('hd', {
    id: 'wCuffInnerToElbow',
    from: points[s + 'LeftEdge'],
    to: points.elbowRight,
    y: points[s + 'CuffRight'].y + sa + 60,
  })
  macro('vd', {
    id: 'hElbowToArmholeInner',
    from: points[s + 'ElbowLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 15,
  })
  macro('vd', {
    id: 'hCuffInnerToArmholeInner',
    from: points[s + 'CuffLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 30,
  })
  macro('vd', {
    id: 'hCuffOuterToArmholeInner',
    from: points[s + 'CuffRight'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 45,
  })
  if (sa) {
    macro('ld', {
      id: 'slitWidth',
      from: points[s + 'Slit'],
      to: points[s + 'SlitRight'],
      d: -15,
    })
    macro('ld', {
      id: 'slitLength',
      from: points[s + 'CuffRight'],
      to: points[s + 'SlitRight'],
      d: -15,
    })
  }
}
