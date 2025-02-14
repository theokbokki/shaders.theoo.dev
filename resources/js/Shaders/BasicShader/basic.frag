uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 normalizedPixelSize = vec2(8.0) / u_resolution;

    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);

    vec4 color = texture2D(u_texture, uvPixel);
    gl_FragColor = color;
}
