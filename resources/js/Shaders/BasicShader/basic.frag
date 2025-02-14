uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform sampler2D u_texture3;
uniform sampler2D u_texture4;
uniform sampler2D u_texture5;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 normalizedPixelSize = vec2(8.0) / u_resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);

    int frame = int(mod(floor(u_time * 6.0), 6.0));
    vec4 color;

    if (frame == 0) {
        color = texture2D(u_texture0, uvPixel);
    } else if (frame == 1) {
        color = texture2D(u_texture1, uvPixel);
    } else if (frame == 2) {
        color = texture2D(u_texture2, uvPixel);
    } else if (frame == 3) {
        color = texture2D(u_texture3, uvPixel);
    } else if (frame == 4) {
        color = texture2D(u_texture4, uvPixel);
    } else {
        color = texture2D(u_texture5, uvPixel);
    }

    gl_FragColor = color;
}
