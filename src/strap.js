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
    let bibWidth = chestWidth *options.bibWidth;
    let apronWidth = Math.max( measurements.hipsCircumference, measurements.waistCircumference) *(1 - options.backOpening);
    let backOpening = apronWidth - Math.max( measurements.hipsCircumference, measurements.waistCircumference);
  
    let hSpan = (backOpening/2) + (bibWidth/2);
    let vSpan = measurements.hpsToWaistBack + 
        measurements.hpsToWaistFront -
        (measurements.hpsToWaistFront *options.bibLength);

    let strapLength = Math.sqrt( (hSpan*hSpan) + (vSpan*vSpan)) + (measurements.chestCircumference *options.chestDepth);
    let strapWidth = options.strapWidth *sa;

    console.log( 'chestWidth '+chestWidth);
    console.log( 'backOpening '+backOpening);
    console.log( 'hSpan '+hSpan);
    console.log( 'vSpan '+vSpan);
    console.log( 'strapLength '+strapLength);

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(strapWidth, 0)
    points.bottomLeft = new Point(0, strapLength )
    points.bottomRight = new Point(strapWidth, strapLength)
  
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')
  
    // Complete?
    if (complete) {
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }
  
    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - sa - 15
      })
    }
  
    return part
  }
  