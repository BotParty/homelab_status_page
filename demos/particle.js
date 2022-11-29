
let data = {
  vert: '',
  frag: '',
  attributes: {fraq: {}. phase: {}, offset: {}},
  uniforms: {
    speed: .5
    view: () => {}, key: function () {}, texture: simpleWebGPU.texture('carebears shooting rainbows') },
  count: num_points
  primitive: 'points'
}


let drawParticles = simpleWebGPU.init(data)

simpleWebGPU.frame(() => {
  drawParticles()
})