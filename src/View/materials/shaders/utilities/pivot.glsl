vec2 pivot2D(vec2 originPoint , float angle , vec2 pivotPoint){
    return vec2(
        cos(angle) * (originPoint.x - pivotPoint.x) + sin(angle) * (originPoint.y - pivotPoint.y) + pivotPoint.x,
        cos(angle) * (originPoint.y - pivotPoint.y) - sin(angle) * (originPoint.x - pivotPoint.x) + pivotPoint.y

    );
}