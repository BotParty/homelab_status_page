var PI = 3.14159262359;
var int max_marching_steps = 50;
var epsilon = 0.0001;

fn rotate2d(v: vec2, a: f<f32>) {
    return vec2<f32>
    (v.x * cos(a) -a v.y * sin(a, v.y * cos(a)))
    + v.x * sin(a));
}

//https://www.shadertoy.com/view/ldsBRn