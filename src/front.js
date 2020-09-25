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
  let bibLength = (measurements.hpsToWaistFront *options.bibLength)
  let apronLength = (measurements.hpsToWaistFront *options.bibLength) +measurements.waistToKnee *(1 + options.lengthBonus);;
  let apronWidth = Math.max( measurements.hipsCircumference, measurements.waistCircumference) *(1 - options.backOpening);
  let strapWidth = options.strapWidth *sa;
  let hemWidth = 3 *sa;

  points.topLeft = new Point(0, 0)
  points.topLeftHem = points.topLeft.shift(270, hemWidth)
  points.bottomLeftHem = points.topLeftHem.shift(270, apronLength)
  points.bottomLeft = points.bottomLeftHem.shift(270, hemWidth)
  points.topRight = points.topLeft.shift(0, bibWidth /2)
  points.topRightHem = points.topLeftHem.shift(0, bibWidth /2)
  points.bottomRightHem = points.bottomLeftHem.shift(0, apronWidth /2)
  points.bottomRight = points.bottomLeft.shift(0, apronWidth /2)
  points.topRightBack = points.bottomRightHem.shift( 90, apronLength -bibLength)
  points.topRightBackCPfront = points.topRightBack.shift(180,((apronWidth-bibWidth)/2)/1.5);
  points.topRightCPdown = points.topRightHem.shift(270,(measurements.hpsToWaistFront *options.bibLength)/4) ;

  points.topCOF = points.topLeft.shift( 270, apronLength/5 )
  points.bottomCOF = points.bottomLeft.shift( 90, apronLength/5 )

  console.log('bibLength ' +(measurements.hpsToWaistFront *options.bibLength) )
  console.log('hpsToWaistFront ' +measurements.hpsToWaistFront )
  console.log('hpsToWaistBack ' +measurements.hpsToWaistBack )

  paths.rightHem = new Path()
    .move(points.bottomRight)
    .line(points.topRightBack)
    .curve(points.topRightBackCPfront, points.topRightCPdown,points.topRightHem)
    .line(points.topRight)
    .attr('class', 'various dashed')
    .attr('data-text', 'narrow hem')
    .attr('data-text-class', 'text-xs center');

  paths.right = paths.rightHem.offset( sa );

  paths.seam = new Path()
    .move(points.bottomLeft)
    .join(paths.right)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric');
    
    paths.complete = paths.seam.clone().line(points.bottomLeft).close();
    
    paths.topHem = new Path()
      .move(points.topLeftHem)
      .line(points.topRightHem.shift( 0, sa ))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center');
    paths.bottomHem = new Path()
      .move(points.bottomLeftHem)
      .line(points.bottomRightHem.shift( 0, sa ))
      .attr('class', 'various dashed')
      .attr('data-text', 'hem')
      .attr('data-text-class', 'text-xs center');

      // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 100)
    macro('title',{
      nr: 1,
      at: points.title,
      title: 'Front'
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
    
    macro( 'cutonfold', {
      from: points.topCOF,
      to: points.bottomCOF
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 15
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRightBack,
      x: points.topRightBack.x + sa + 15
    })
    macro('vd', {
      from: points.topRightBack,
      to: points.topRight,
      x: points.topRightBack.x + sa + 15
    })
  }

  return part
}
