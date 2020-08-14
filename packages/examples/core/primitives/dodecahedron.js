/*
// title      : Dodecahedron
// author     : Rene K. Mueller
// license    : MIT License
// description: building dodecahedron() from cuboids
// file       : dodecahedron.js
// tags        : boolean, intersect, dodecahedron
// from http://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Commented_Example_Projects
*/

const jscad = require('@jscad/modeling')
console.log(jscad)

const { cuboid } = jscad.primitives
const { intersect, union } = jscad.booleans
const { rotateX, rotateZ, scale, translate } = jscad.transforms
const { degToRad } = jscad.utils

const dodecahedron = (h) => {
  let cuboid1 = cuboid({ size: [20, 20, 10] })
  for (let i = 0; i <= 4; i++) {
    // loop i from 0 to 4, and intersect results
    // make a cube, rotate it 116.565 degrees around the X axis,
    // then 72*i around the Z axis
    cuboid1 = intersect(
      cuboid1,
      rotateZ(i * degToRad(72),
        rotateX(degToRad(116.565),
          cuboid({ size: [20, 20, 10] }))
      )
    )
  }
  return scale([h, h, h], cuboid1) // scale by height parameter
}

const main = () => {
  // TODO - Understand why scaling this up causes shading problems

  const d = dodecahedron(3)
  return [
    d,
    translate([-40, 0, 0], d)
  ]
}

module.exports = { main }
