uniform float time;
uniform float progress;
varying vec2 vUv;
#define colorTransitionSpeed 0.65

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233)) * 43758.5453));
}

void main() {
    vec2 circleCenter = vec2(0.5, 0.5);
    float circleRadius = 0.6;
    float distanceToCenter = length(gl_PointCoord - circleCenter);
    float innerEdge = circleRadius - 1.2;
    float outerEdge = circleRadius;
    float blendFactor = smoothstep(innerEdge, outerEdge, distanceToCenter);
    vec4 colorStages[6];
    colorStages[0] = vec4(1.0, 1.0, 1.0, 1.0);
    colorStages[1] = vec4(0.0, 0.0, 1.0, 1.0);
    colorStages[2] = vec4(0.5, 0.0, 0.5, 1.0);
    colorStages[3] = vec4(0.6, 0.4, 0.2, 1.0);
    colorStages[4] = vec4(0.1216, 0.1216, 0.1216, 1.0);
    colorStages[5] = vec4(0.1216, 0.1216, 0.1216, 0.0);
    float adjustedProgress = progress * colorTransitionSpeed;
    float currentStage = adjustedProgress * 5.5;
    int stage1 = int(currentStage);
    int stage2 = (stage1 + 1) % 6;
    float stage2Weight = fract(currentStage);
    vec4 color1 = colorStages[stage1];
    vec4 color2 = colorStages[stage2];
    vec4 circleColor = mix(color1, color2, stage2Weight);
    gl_FragColor = mix(circleColor, vec4(0.0, 0.0, 0.0, 0.0), blendFactor);
}