# Titan drafting instructions

As provided by @dfbean

## Back 

| Action                                                       | # Value      | Draft value (cm) | Code value (mm) | Drafter comments | Programmer comments            |
| ------------------------------------------------------------ | ------------ | ---------------- | --------------- | ---------------- | ------------------------------ |
| Make a point, label A                                        |              |                  |                 |                  |                                |
| Square line down # from A, mark point at end, label D        | crotch depth | 31.1             | 311             |                  | used `crotchDepth` measurement |
| On line A-D, measure # from point A, mark new point, label C | hip depth    | 22.9             | 229                | | used `naturalWaistToSeat` measurement |
| From point A, square a line # left, mark endpoint, label H | back hip arc + .3cm | 28.2 | -281.79 | .3cm for ease | used `hipsEase` option, `backHipArc` measurement provided by the `measurements` plugin (part of titan for now) |
| From point C, square a line # left, mark endpoint, label F | back hip arc + .3cm | 28.2 | -281.79 | .3cm for ease | |
| From point D, square a line #, mark endpoint, label I | Use greater of 1.25 x (back hip arc + .3) | 35.3 | 352.2375 |this step incorporates a subsequent fit check, and includes some adjustments required to draft this piece independent of the front piece. | |
| | **OR**, (upperleg + 3.8 + 1.9) – (front hip arc + .3+ front crotch extension) | (64.8 + 3.8 + 1.9) – (25.4 +.3 +5.7) = 39.1 | 393.23 | Includes 3.8 cm recommended crotch ease and 1.9cm placeholder that will be removed later. | used `upperLegEase` and `crotchExtension` options. `crotchExtension` being based on `hipsCircumference` measurement |
| Starting at point H, square down through point F, till intersecting with line D-I. Label intersection point G | | | | | |
| On line G-H, measure # from point G, mark endpoint, label X | .5(crotch depth) | 15.6 | 155.5 | | |
| On line A-H, measure # from point H, toward point A, mark point, label N | 4.5 | 4.5 | 45.1 | Fixed value, sets reference point for back waist | This doesn't work for us. We can't just put in an arbitrary 4.5cm value. That doesn't scale. So I've added a static option called `backWaistFactor` that is 14.5% of the `crotchDepth` measurement. That way, the slant of the back seam should always be the same. This might need tweaking though. |
| On line A-H, measure from point N toward point A, # mark endpoint, label O | back waist arc + 2.5 | 22.8 | 227.36 | 2.5 fixed value for dart width. Ok that it's fixed, it's mostly a placeholder and gets removed, rolled or replaced in pant patterns. If additional shaping is required it can be placed in hip curve. | **Note:** I've added the `backWaistDart` option which is 12% of the `backWaistArc` measurement, which gives us 24.36mm |
| On line A-H, measure from point N # toward O, mark endpoint, label P | .5 (back waist arc + 2.5) | 11.4 | 113.68 | 2.5 fixed value for dart placement. | went with time .56 instead of fixed value |
| Square line # down from P, mark endpoint, no label | | 8.9 | 88.64 | Fixed value for dart length. See previous note onfixed dart value. | Added the `backWaistDartLength` option, which is based on the `crotchDepth` measurement. 28.5%  by default |
| Square out # from P on both sides, mark endpoints, no label. |  | 1.0 | 12.5 | 1.0 Fixed value for dart width. See previous note. | Earlier on, draft instructions specify *2.5cm fixed value for dart width*. Now, it's *1cm fixed value for (half of the) dart width*. Rather than an introduce a 0.5cm error, I've kept the dart width at 2.5 cm (12.5mm to each side).|
| Square up # from point N, mark endpoint, label T | 2.5 | 2.5 | -24.88 | Fixed value for height of back rise. | Once again not loving the fixed 2.5cm value here. But I'm not certain whether it's best to make this a fraction of `crotchDepth` or rather `backWaistArc`. Went with `crotchDepth` since it is a vertical measurement after all. Added the `backRise` option for this. |
| Draw a line from T, through X, to line D-I, no label | | | -320.67 | | Point name: `extendedBackSeam` |
| Square # up/left diagonally from G , mark endpoint, label g | 4.4 | 4.4 | 44 | Fixed value as reference for crotch curve. | I'm a bit confused here about the *fixed value* note here. The intersection of the line from `T` through `X` and a line from `G` 45 degrees NW can only intersect in 1 point. It so happens that point is 4.4cm from G, but why is it described as a *fixed value*? |
| Draw curve touching X and g, ending at/near I, blend at g if needed. | | | | | I had a look at the hand-drawn version, and I do find the bend of this curve to be really sharp. I have approximated it in the code, but I have also added the `backSeamCurveStart` and `backSeamCurveBend` options to control the curvature. |
| Draw slightly curved line from T to O. | | | | |
| Draw dart legs through side points, up to curved T-O line | | | | |
| True dart by raising shorter leg and redrawing line to O. | | | | We don't *true*, we just get it right :) |
| Draw hip curve from just above C to O | | | | | Just above C? Why just above C as C marks the fullest part of the seat? |
| On line D-I, mark new point # to left of D, label V | 1 | 1 | 9.84 | Fixed point as reference for hip curve. This value was already included in line D-I, so that it could be removed at this stage. | This seems a bit random. I don't see any reference to *1cm* when constructing point I, so not sure where to get this from. See next step for workaround |
| On line D-I, mark new point # halfway between between V and I, label W | | 19.0 | 191.5 |  I measured/divided manually, you'll let the computer do this. | Went with 51.25% instead (because of the 1cm). Stored in the static `grainlineBackFactor` option |
| From point W, square up to line A-H (waistline) and down # waist to ankle, to knee and # to ankle to create grainline Mark knee and ankle points | | 100.3, 61.0 | 1053, 610 | Threw this in so I could complete the crotch and hip curves. | We have a `naturalWaistToFloor` measurement. Adding `naturalWaistToAnkle` seems excessive. I'm drafting this block to the floor and will leave it to the designer how long they want things. I guesstimated 105.3cm for the fit model. |
| At knee point square and center a # line, mark endpoints, no label | (knee circ / 2) + 2.5 | (40.6/2) + 2.5 = 22.8 | 221.2 | Knee and ankle circs are needed to build hip and crotch curves correctly. I used my measurement with 1 inch of ease allocated to the back. I want to fiddle with this and get your comments. | Is it custom to only apply ease to the back? I've added a `kneeEase` options for this combined with that `legBalance` option to control this. Default = 75% (meaning that 75% of ease is applied to the back) |
| At ankle point, square and center a line, mark endpoints, no label | (ankle entry circ / 2) - 2.5 | (31.8/2) + 2.5 = 18.4 | 173.4 | Same approach as the knee, just to have a point to work with. See above note about revisiting after testing. | I noticed we don't have an `ankleCircumference` measurement, but only `ankleEntry`. I've based it on the latter for now, but this feels a bit contra-intuitive. Added `ankleEase` option for this. |
| Draw a line from ankle points, through knee points, to line D-I. | | | Creates in/out seams and guide for hip and crotch curves | |
| Draw curve down from I to inseam, blending curve into seam about midway between knee and line D-I. Ensure first inch of curve down from I is at 90 degree angle to upward curve from I. | | | | | Ignored the 90 degree thing for now. Added `inseamCurve` option to control shape of curve. |
| Draw curve down from V to outseam, blending curve into seam about midway between knee and line D-I.| | | | | I've added the `outSeamCurveKnee` and `outSeamCurveSeat` options to control this. Set the defaults so that the curve deviates 1cm (9.66mm to be exact) at the D-I line as instructed earlier |


     Correct crotch length by pitching crotch seam up/down at point F
     back crotch length 45.2 – 40 = 5.2
     – (T-X-g-I) = pitch
     up
     Lucky you, the computer will handle this! Negative
     result means downward pitch
     Page 2Titan Instructions
     Action
     Page 3 of 4, Titan

# Value Used Value (cm)

crotch depth 31.1
Drafter Comments
Make a point, label A
Square line down # from A, mark point at end, label D
On line A-D, measure # from point A, mark new point, label hip depth
C
22.9
From point A, square a line # right mark endpoint, label L front hip arc + .3cm 25.4 + .3 = 25.7 .3cm for ease
From point C, square a line # right, mark endpoint, label J front hip arc + .3cm 25.4 + .3 = 25.7 .3cm for ease
From point D, square a line # right, mark endpoint, label K front hip arc + .3cm 25.4 + .3 = 25.7 .3 cm for ease
Extend line D-K # to the right, label endpoint M crotch extension Front crotch extension values are hips <94.0
=4.8, hips 94.1-106.4 = 5.1, hips >106.5 = 5.7.
5.7
These
values are supplied by Armstrong. They're
probably fine but the drafting instructions only go
to American size 18 (hips 111) and I'm not sure
how they'll work for larger folks. Should try to test
this so there's no surprises.
Connect L to K touching J
On line L-K, measure # from point from K, mark endpoint,
label X .5(crotch depth) +
1.3 15.5 + 1.3 = 16.8 On line A-L, measure # from point L, mark point, label Q 1.3 1.3 On line A-L, measure # from point Q toward point A, mark
endpoint, label R front waist arc + 1.9 20.3 + 1.9 = 22.2 1.9 fixed value for dart width. OK that it's fixed,
it's mostly a placeholder and gets removed, rolled
or replaced in pant patterns. If additional shaping
is required it can be placed in hip curve.
On line A-L, measure # from point Q toward R, mark
endpoint, label S 8.3 8.3 fixed value for dart placement. See previous not
on fixed dart value
Square line # down from S, mark endpoint, no label 6.4 6.4 Fixed value for dart length. See previous note on
fixed dart value.
Square out # from S on both sides, mark endpoints, no
label. .6 .6 Fixed value for dart width. See previous note.
Square up # from point Q, mark endpoint, label U .6 .6 Fixed value for waistband reference
Draw a line from U, through X, to line D-K-M, no label
Square # up/right diagonally from K , mark endpoint, label k 3.2
Fixed value, sets reference point for front waist.
Reference for crotch curve
3.2
Fixed value as reference for crotch curve.
Draw curve touching X, k and M, blend at k if needed.
Draw slightly curved line from U to R
Draw dart legs through side points, up to curved U-R line
Page 3
Programmer commentsTitan Instructions
Page 4 of 4, Titan
True dart by raising shorter leg and redrawing line to R
Draw hip curve from just above C to R
On line D-M, mark new point # to right of D, label Y
1.0
1.0 Fixed point as reference for hip curve. This value
was already included in line D-I, so that it could be
removed at this stage.
On line D-M, mark new point halfway between between Y
and M, label Z 15.2 Value only for reference, you use that new-
fangled computer to generate this.
From point Z, square up to line A-L (waistline) and down # to waist to ankle,
knee and # to ankle to create grainline Mark knee and ankle waist to knee
points 100.3, At knee point square and center a # line, mark endpoints, no knee circ / 2
label 40.6/2 = 20.3
61.0 Threw this in so I could complete the crotch and
hip curves.
Knee and ankle circ”s are needed to build hip and
crotch curves correctly. I used my measurements
with 1 inch of ease at knee, allocated to the back.
Armstrong offers fixed values for knees that make
no sense, so I want to fiddle with this and get your
comments.
At ankle point, square and center a line, mark endpoints, no ankle entry circ / 2 31.8/2 = 15.9
label Same approach as the knee, just to have a point
to work with. See above note about revisiting
after testing.
Draw a line from ankle points, through knee points, to line
D-M Creates in/out seams and guide for hip and crotch
curves
Draw curve down from M to inseam, blending curve into
seam about midway between knee and line D-M. Ensure
first inch of curve down from M is at 90 degree angle to
upward curve from M.
Draw curve down from Y to outseam, blending curve into
seam about midway between knee and line D-M.
Correct crotch length by pitching crotch seam up/down at
point J
front crotch length 35.6 – 33.7 = 1.9
– (L-X-k-M) = pitch
up
Lucky you, the computer will handle this! Negative
result means downward pitch
