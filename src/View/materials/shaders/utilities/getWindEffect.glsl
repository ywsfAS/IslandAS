float getWindEffect(vec2 pos) {
    float wind = sin(uTime * 2.0 + pos.x * 0.5 + pos.y * 0.5) * 0.2;
    return wind;
}