export default (part) => {
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet
  } = part.shorthand()

  points.A = new Point(0, 0)
  points.D = new Point(0, measurements.crotchDepth)
  points.C = new Point(0, measurements.naturalWaistToSeat)

  points.L = new Point(measurements.frontHipArc * (1 + options.hipsEase), 0)
  points.J = new Point(points.L.x, points.C.y)
  points.K = new Point(points.L.x, points.D.y)
  points.M = points.K.shift(0, measurements.seatCircumference * options.crotchExtension)

  paths.seam = new Path().move(points.A).line(points.D).line(points.M)

  if (false && complete) {
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom
    })

    if (paperless) {
    }
  }

  return part
}
