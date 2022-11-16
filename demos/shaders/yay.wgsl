@vertex
fn main_vertex(
  @location(0) a_particlePos : vec2<f32>,
  @location(1) a_particleVel : vec2<f32>,
  @location(2) a_pos : vec2<f32>
) -> @builtin(position) vec4<f32> {
  let angle = atan2(a_particleVel.y, a_particleVel.x);
  let pos = vec2(
    (a_pos.x * cos(angle)) - (a_pos.y * sin(angle)),
    (a_pos.x * sin(angle)) + (a_pos.y * cos(angle))
  );

  return vec4(pos - a_particlePos, 0.0, 1.0);
}