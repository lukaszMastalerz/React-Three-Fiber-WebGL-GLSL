varying vec2 vUv;
uniform sampler2D infoTexture3;
uniform sampler2D infoTexture3Mask;
uniform sampler2D transitionTexture;
uniform float progress;
precision lowp float;

void main() {
   vec4 transitionTexx = texture2D(transitionTexture, vUv);
    vec4 tran1 = texture2D(infoTexture3, vUv);
    vec4 tran2 = texture2D(infoTexture3Mask, vUv);
    float slowedProgress = progress * 0.8; // Make slower/faster transition
    float progressEased = slowedProgress * slowedProgress * (3.0 - 2.0 * slowedProgress);
    float factor = progressEased * 1.6 - 0.3;
    float blenderX = smoothstep(factor - 0.02, factor + 0.02, transitionTexx.r);
    gl_FragColor = mix(tran2, tran1, blenderX);
}
