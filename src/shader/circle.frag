precision highp float;

#define GLSLIFY 1
#include utils.glsl

const vec3 GREEN = vec3(.18, .78, 0.31);
const vec3 GREEN_D = vec3(0.0157, 0.6275, 0.6275);
const vec3 PINK = vec3(1., .8, .79);
const vec3 PINK_D = vec3(.9, .7, .7);


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
  r -= variation(pos, vec2(1., 0.), strength, s * .5, amplitude);
  float line = circleLine(lineWidth, radius, r);
  return vec4(vec3(line), 1.);
}

vec4 bg() {
  float normalizeResX = gl_FragCoord.x / u_res.x;
  return vec4(vec3(normalizeResX < .5 ? 0. : 1.), 1.);
}

vec4 mixBg(vec4 color) {
  vec4 background = bg();
  return mix(
    background,
    color,
    color.r + color.g + color.b
  );
}


void main() {
  vec2 p = (gl_FragCoord.xy * 2. - u_res.xy) / u_res.x;

  vec2 leftP = p + vec2(.5, 0.);
  vec2 rightP = p - vec2(.5, 0.);

  vec2 uv = gl_FragCoord.xy / u_res;
  uv -= vec2(.5);
  uv = rotate2d(u_time) * uv;
  uv += vec2(.5);
  vec3 colorGreen = mix(GREEN, GREEN_D, uv.y);
  vec3 colorPink = mix(PINK, PINK_D, uv.y);

  vec4 leftCircle = mixBg(waveCircle(leftP, .004, .2, 3., 8., 100.) * vec4(colorGreen, 1.));
  vec4 rightCircle = mixBg(waveCircle(rightP, .004, .2, 3., 8., 100.) * vec4(colorPink, 1.));

  
  gl_FragColor = mix(leftCircle, rightCircle, gl_FragCoord.x / u_res.x < .5 ? 0. : 1.);
}
