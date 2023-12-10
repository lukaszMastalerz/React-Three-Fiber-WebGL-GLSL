uniform float time;
varying vec2 vUv;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233)) * 43758.5453));
}
void main() {
    vUv = uv;
    float randomSize = mix(5.0, 10.0, noise(vec2(gl_VertexID, time)));
    gl_PointSize = randomSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}