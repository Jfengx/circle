mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float Cos(vec2 v1, vec2 v2) {
  return dot(normalize(v1), normalize(v2));
}

// r diff 
float variation(vec2 v1, vec2 v2, float strength, float speed, float amplitude) {
  return sin(Cos(v1, v2) * strength + speed) / amplitude;
}

float circle(float smoothStart, float smoothEnd, float dist) {
  return smoothstep(smoothStart, smoothEnd, dist);
}

float circleLine(float lineWidth, float radius, float dist) {
  return circle(radius - lineWidth / 2., radius, dist) -
    circle(radius, radius + lineWidth / 2., dist);
}
