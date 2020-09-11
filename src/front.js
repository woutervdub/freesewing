export default function(part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro
  } = part.shorthand()

  let chestWidth = measurements.chestCircumference /4;

  let apronLength = (measurements.hpsToWaistFront *options.bibLength) +measurements.waistToKnee *(1 + options.lengthBonus);;
  let apronWidth = Math.max( measurements.hipsCircumference, measurements.waistCircumference) *(1 - options.backOpening);
  

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(chestWidth /2, 0)
  points.bottomLeft = new Point(0, apronLength )
  points.bottomRight = new Point(apronWidth /2, apronLength)
  points.topRightBack = new Point(apronWidth /2, (measurements.hpsToWaistFront *options.bibLength))
  points.topRightBackCPfront = points.topRightBack.shift(180,((apronWidth-chestWidth)/2)/2);
  points.topRightCPdown = points.topRight.shift(270,(measurements.hpsToWaistFront *options.bibLength)/4) ;

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRightBack)
    .curve(points.topRightBackCPfront, points.topRightCPdown,points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    /*
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, w / 8)
      .attr('data-text', 'hello')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
    */
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15
    })
  }

  return part
}
