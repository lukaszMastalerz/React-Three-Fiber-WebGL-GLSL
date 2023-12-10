varying vec2 vUv;
uniform sampler2D bgTexture2;
uniform float progress;
uniform float triangleProgress;

precision lowp float;

void main() {
    vec4 texColor = texture2D(bgTexture2, vUv);

    float aspect = 0.5;

    float blendShape = mix(2.0, aspect, smoothstep(0.0, 1.0, triangleProgress));

    if (vUv.y < blendShape && vUv.x > -0.25 && vUv.x < 1.75) {
        float distanceToCenter = abs(vUv.x - 0.5);
        float extendedTop = blendShape - distanceToCenter * (1.0 / blendShape);
        if (vUv.y < extendedTop) {
            gl_FragColor = texColor;
        } else {
            discard;
        }
    } else {
        discard;
    }
}