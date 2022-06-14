precision highp float;

#define GLSLIFY 1
#include utils.glsl

const vec3 BLACK = vec3(0.);
const vec3 WHITE = vec3(1.);

uniform float u_time;
uniform vec2 u_res, u_strength, u_amplitude;
// uniform sampler2D u_texture;


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

  vec2 uv = gl_FragCoord.xy / u_res;

  vec2 leftP = p + vec2(.5, 0.);
  vec2 rightP = p - vec2(.5, 0.);

  float lineWidth = .004;
  float radius = .2;

  vec4 leftCircle = waveCircle(leftP, lineWidth, radius, u_strength[0], 8., u_amplitude[0]);
  vec4 rightCircle = waveCircle(rightP, lineWidth, radius, u_strength[1], 8., u_amplitude[1]);

  float area = gl_FragCoord.x / u_res.x < .5 ? 0. : 1.;

  vec4 left = leftCircle * vec4(WHITE, 1.);
  vec4 right = vec4((vec3(1.) - rightCircle.rgb + BLACK), 1.);
  vec4 color =  mix(left, right, area);

  // vec4 texture = texture2D(u_texture, uv);
  // vec4 greyTexture = grey(texture);
  gl_FragColor = color; //mix(greyTexture - texture + color, texture - color + greyTexture, area);
}
