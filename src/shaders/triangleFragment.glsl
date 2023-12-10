uniform sampler2D triangleTexture;
varying vec2 vUv;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;

precision lowp float;

// Function to calculate Gaussian blur
float gaussian(float x, float sigma) {
    return exp(-(x * x) / (2.0 * sigma * sigma)) / (sqrt(2.0 * 3.14159) * sigma);
}

void main() {
    vec2 dist = vUv - mouse;
    float radius = length(dist) / 3.0;

    if (radius < 0.1) {
        float smoothDistortion = smoothstep(0.1, 0.0, radius);
        vec2 distortedUV = mix(vUv, vUv + dist * (cos(radius) - smoothDistortion), radius);
        vec3 whiteColor = vec3(1.0, 1.0, 1.0);
        vec3 blueColor = vec3(0.0, 0.0, 1.0);
        vec3 purpleColor = vec3(0.5, 0.0, 0.5);
        vec3 brownColor = vec3(0.4, 0.2, 0.0);
        vec3 blackColor = vec3(0.0, 0.0, 0.0);
        float blendWeightWhite = smoothstep(0.0, 0.3, smoothDistortion);
        float blendWeightBlue = smoothstep(0.3, 0.5, smoothDistortion);
        float blendWeightPurple = smoothstep(0.5, 0.7, smoothDistortion);
        float blendWeightBrown = smoothstep(0.7, 0.9, smoothDistortion);
        float blendWeightBlack = smoothstep(0.9, 1.0, smoothDistortion);
        vec3 color = (
            whiteColor * blendWeightWhite +
            blueColor * blendWeightBlue +
            purpleColor * blendWeightPurple +
            brownColor * blendWeightBrown +
            blackColor * blendWeightBlack
        );
        float glowAmount = 0.2;
        float glowRadius = 0.1;
        vec3 glowColor = mix(blueColor, purpleColor, brownColor);
        vec3 glow = vec3(0.0);
        for (float i = -4.0; i <= 4.0; i += 1.0) {
            float offset = i / 4.0;
            glow += texture2D(triangleTexture, distortedUV + vec2(offset * glowRadius, 0.0)).rgb * gaussian(offset, glowAmount);
        }
        glow *= 5.5;
        vec3 finalColor = mix(color, color + glowColor * glow, smoothDistortion);
        gl_FragColor = texture2D(triangleTexture, distortedUV) * vec4(finalColor, 1.0);
    } else {
        gl_FragColor = texture2D(triangleTexture, vUv);
    }
}