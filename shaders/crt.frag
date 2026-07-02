#version 130

uniform sampler2D texture;
uniform vec2 resolution;

void main()
{
    vec2 uv = gl_TexCoord[0].xy;
    
    uv = uv * 2.0 - 1.0;
    vec2 offset = uv.yx / 5.0;
    uv = uv + uv * offset * offset;
    uv = uv * 0.5 + 0.5;

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    vec4 baseColor = texture2D(texture, uv);

    vec4 bloom = vec4(0.0);
    vec2 texel = 1.0 / resolution;
    
    bloom += texture2D(texture, uv + vec2(-texel.x, -texel.y)) * 0.0625;
    bloom += texture2D(texture, uv + vec2(0.0, -texel.y)) * 0.125;
    bloom += texture2D(texture, uv + vec2(texel.x, -texel.y)) * 0.0625;
    bloom += texture2D(texture, uv + vec2(-texel.x, 0.0)) * 0.125;
    bloom += texture2D(texture, uv) * 0.25;
    bloom += texture2D(texture, uv + vec2(texel.x, 0.0)) * 0.125;
    bloom += texture2D(texture, uv + vec2(-texel.x, texel.y)) * 0.0625;
    bloom += texture2D(texture, uv + vec2(0.0, texel.y)) * 0.125;
    bloom += texture2D(texture, uv + vec2(texel.x, texel.y)) * 0.0625;

    vec4 finalBase = baseColor + max(bloom - 0.4, 0.0) * 1.5;

    float scanline = sin(uv.y * resolution.y * 3.14159);
    scanline = scanline * 0.15 + 0.85;

    float maskX = mod(gl_FragCoord.x, 3.0);
    vec3 phosphor = vec3(0.7, 0.7, 0.7);
    
    if (maskX < 1.0) {
        phosphor.r = 1.0;
    } else if (maskX < 2.0) {
        phosphor.g = 1.0;
    } else {
        phosphor.b = 1.0;
    }

    vec3 finalColor = finalBase.rgb * scanline * phosphor;

    gl_FragColor = vec4(finalColor, baseColor.a) * gl_Color;
}
