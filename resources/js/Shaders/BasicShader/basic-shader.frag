uniform float u_time;
uniform vec2 u_resolution;

uniform float u_redAmount;
uniform float u_greenAmount;
uniform float u_blueAmount;

void main() {
    vec3 color = vec3(u_redAmount, u_greenAmount, u_blueAmount);

    gl_FragColor = vec4(color, 1.0);
}
