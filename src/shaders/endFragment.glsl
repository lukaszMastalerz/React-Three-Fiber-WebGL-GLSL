varying vec2 vUv;
uniform sampler2D endTexture2;
uniform sampler2D endTexture;
uniform float progress;

precision lowp float;
void main() {
    vec4 endTranBlack = texture2D(endTexture2, vUv);
    vec4 endTran1 = texture2D(endTexture, vUv);
    float slowedProgress = progress * 0.8;
    float progressEased = slowedProgress * slowedProgress * (3.0 - 2.0 * slowedProgress);
    float factor = progressEased * 1.6 - 0.3;
    float blenderX = smoothstep(factor - 0.02, factor + 0.02, endTran1.r);
    gl_FragColor = mix(endTranBlack, vec4(0.0, 0.0, 0.0, 0.0), blenderX);
}