varying vec2 vUv;
uniform float progress;
#define M_PI 3.1415926535897932384626433832795

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.y = position.y + (((sin(uv.x * M_PI) * offset.y)) * 6.0);
    return position;
}
void main() {
    vUv = uv;
    float waveAmplitude = 0.1;
    float waveFrequency = 3.0;
    float time = (progress * 10.0) * waveFrequency;
    float displacementX = sin(time + position.x) * waveAmplitude;
    float displacementY = sin(time + position.y) * waveAmplitude;
    vec3 displacedPosition = deformationCurve(position, uv, vec2(displacementX, displacementY));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
