precision highp float;

#define GLSLIFY 1
#include utils.glsl

const vec3 BLACK = vec3(0.);
const vec3 WHITE = vec3(1.);

uniform float u_time;
uniform vec2 u_res;


vec4 waveCircle(
  vec2 pos,
  float lineWidth, 
  float radius, 
  float strength, 
  float speed, 
  float amplitude
) {
  float r = length(pos);
  float s =  speed * u_time;

  r += variation(pos, vec2(0., 1.), strength, s, amplitude);
  r += variation(pos, vec2(1., 0.), strength, s * 0.3, amplitude);
  float line = circleLine(lineWidth, radius, r);
  return vec4(vec3(line), 1.);
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2. - u_res.xy) / u_res.x;

  vec2 leftP = p + vec2(.5, 0.);
  vec2 rightP = p - vec2(.5, 0.);

  float lineWidth = .004;
  float radius = .2;
  float strength = 4.;
  float amplitude = 100.;

  vec4 leftCircle = waveCircle(leftP, lineWidth, radius, strength, 8., amplitude);
  vec4 rightCircle = waveCircle(rightP, lineWidth, radius, strength, 8., amplitude);


  vec4 left = leftCircle * vec4(WHITE, 1.);
  vec4 right = vec4((vec3(1.) - rightCircle.rgb + BLACK), 1.);
  vec4 color =  mix(left, right, gl_FragCoord.x / u_res.x < .5 ? 0. : 1.);
  
  gl_FragColor = color;
}
