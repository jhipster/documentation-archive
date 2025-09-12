"use strict";
exports.id = 787;
exports.ids = [787];
exports.modules = {

/***/ 20787:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LabelLayout: () => (/* reexport */ installLabelLayout),
  UniversalTransition: () => (/* reexport */ installUniversalTransition)
});

// EXTERNAL MODULE: ./node_modules/echarts/lib/model/Series.js
var Series = __webpack_require__(47355);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/util.js
var util = __webpack_require__(98026);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/curve.js
var curve = __webpack_require__(89259);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Path.js + 3 modules
var Path = __webpack_require__(5070);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/vector.js
var vector = __webpack_require__(83509);
// EXTERNAL MODULE: ./node_modules/zrender/lib/tool/path.js + 1 modules
var tool_path = __webpack_require__(99429);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/Transformable.js
var Transformable = __webpack_require__(92836);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/bbox.js
var bbox = __webpack_require__(48813);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/BoundingRect.js
var BoundingRect = __webpack_require__(29308);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/Point.js
var Point = __webpack_require__(26346);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Polygon.js
var Polygon = __webpack_require__(52505);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Rect.js + 1 modules
var Rect = __webpack_require__(10992);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/shape/Sector.js + 1 modules
var Sector = __webpack_require__(59975);
// EXTERNAL MODULE: ./node_modules/zrender/lib/core/PathProxy.js
var PathProxy = __webpack_require__(68717);
;// ./node_modules/zrender/lib/tool/convertPath.js


var CMD = PathProxy/* default */.A.CMD;
function aroundEqual(a, b) {
    return Math.abs(a - b) < 1e-5;
}
function pathToBezierCurves(path) {
    var data = path.data;
    var len = path.len();
    var bezierArrayGroups = [];
    var currentSubpath;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    function createNewSubpath(x, y) {
        if (currentSubpath && currentSubpath.length > 2) {
            bezierArrayGroups.push(currentSubpath);
        }
        currentSubpath = [x, y];
    }
    function addLine(x0, y0, x1, y1) {
        if (!(aroundEqual(x0, x1) && aroundEqual(y0, y1))) {
            currentSubpath.push(x0, y0, x1, y1, x1, y1);
        }
    }
    function addArc(startAngle, endAngle, cx, cy, rx, ry) {
        var delta = Math.abs(endAngle - startAngle);
        var len = Math.tan(delta / 4) * 4 / 3;
        var dir = endAngle < startAngle ? -1 : 1;
        var c1 = Math.cos(startAngle);
        var s1 = Math.sin(startAngle);
        var c2 = Math.cos(endAngle);
        var s2 = Math.sin(endAngle);
        var x1 = c1 * rx + cx;
        var y1 = s1 * ry + cy;
        var x4 = c2 * rx + cx;
        var y4 = s2 * ry + cy;
        var hx = rx * len * dir;
        var hy = ry * len * dir;
        currentSubpath.push(x1 - hx * s1, y1 + hy * c1, x4 + hx * s2, y4 - hy * c2, x4, y4);
    }
    var x1;
    var y1;
    var x2;
    var y2;
    for (var i = 0; i < len;) {
        var cmd = data[i++];
        var isFirst = i === 1;
        if (isFirst) {
            xi = data[i];
            yi = data[i + 1];
            x0 = xi;
            y0 = yi;
            if (cmd === CMD.L || cmd === CMD.C || cmd === CMD.Q) {
                currentSubpath = [x0, y0];
            }
        }
        switch (cmd) {
            case CMD.M:
                xi = x0 = data[i++];
                yi = y0 = data[i++];
                createNewSubpath(x0, y0);
                break;
            case CMD.L:
                x1 = data[i++];
                y1 = data[i++];
                addLine(xi, yi, x1, y1);
                xi = x1;
                yi = y1;
                break;
            case CMD.C:
                currentSubpath.push(data[i++], data[i++], data[i++], data[i++], xi = data[i++], yi = data[i++]);
                break;
            case CMD.Q:
                x1 = data[i++];
                y1 = data[i++];
                x2 = data[i++];
                y2 = data[i++];
                currentSubpath.push(xi + 2 / 3 * (x1 - xi), yi + 2 / 3 * (y1 - yi), x2 + 2 / 3 * (x1 - x2), y2 + 2 / 3 * (y1 - y2), x2, y2);
                xi = x2;
                yi = y2;
                break;
            case CMD.A:
                var cx = data[i++];
                var cy = data[i++];
                var rx = data[i++];
                var ry = data[i++];
                var startAngle = data[i++];
                var endAngle = data[i++] + startAngle;
                i += 1;
                var anticlockwise = !data[i++];
                x1 = Math.cos(startAngle) * rx + cx;
                y1 = Math.sin(startAngle) * ry + cy;
                if (isFirst) {
                    x0 = x1;
                    y0 = y1;
                    createNewSubpath(x0, y0);
                }
                else {
                    addLine(xi, yi, x1, y1);
                }
                xi = Math.cos(endAngle) * rx + cx;
                yi = Math.sin(endAngle) * ry + cy;
                var step = (anticlockwise ? -1 : 1) * Math.PI / 2;
                for (var angle = startAngle; anticlockwise ? angle > endAngle : angle < endAngle; angle += step) {
                    var nextAngle = anticlockwise ? Math.max(angle + step, endAngle)
                        : Math.min(angle + step, endAngle);
                    addArc(angle, nextAngle, cx, cy, rx, ry);
                }
                break;
            case CMD.R:
                x0 = xi = data[i++];
                y0 = yi = data[i++];
                x1 = x0 + data[i++];
                y1 = y0 + data[i++];
                createNewSubpath(x1, y0);
                addLine(x1, y0, x1, y1);
                addLine(x1, y1, x0, y1);
                addLine(x0, y1, x0, y0);
                addLine(x0, y0, x1, y0);
                break;
            case CMD.Z:
                currentSubpath && addLine(xi, yi, x0, y0);
                xi = x0;
                yi = y0;
                break;
        }
    }
    if (currentSubpath && currentSubpath.length > 2) {
        bezierArrayGroups.push(currentSubpath);
    }
    return bezierArrayGroups;
}
function adpativeBezier(x0, y0, x1, y1, x2, y2, x3, y3, out, scale) {
    if (aroundEqual(x0, x1) && aroundEqual(y0, y1) && aroundEqual(x2, x3) && aroundEqual(y2, y3)) {
        out.push(x3, y3);
        return;
    }
    var PIXEL_DISTANCE = 2 / scale;
    var PIXEL_DISTANCE_SQR = PIXEL_DISTANCE * PIXEL_DISTANCE;
    var dx = x3 - x0;
    var dy = y3 - y0;
    var d = Math.sqrt(dx * dx + dy * dy);
    dx /= d;
    dy /= d;
    var dx1 = x1 - x0;
    var dy1 = y1 - y0;
    var dx2 = x2 - x3;
    var dy2 = y2 - y3;
    var cp1LenSqr = dx1 * dx1 + dy1 * dy1;
    var cp2LenSqr = dx2 * dx2 + dy2 * dy2;
    if (cp1LenSqr < PIXEL_DISTANCE_SQR && cp2LenSqr < PIXEL_DISTANCE_SQR) {
        out.push(x3, y3);
        return;
    }
    var projLen1 = dx * dx1 + dy * dy1;
    var projLen2 = -dx * dx2 - dy * dy2;
    var d1Sqr = cp1LenSqr - projLen1 * projLen1;
    var d2Sqr = cp2LenSqr - projLen2 * projLen2;
    if (d1Sqr < PIXEL_DISTANCE_SQR && projLen1 >= 0
        && d2Sqr < PIXEL_DISTANCE_SQR && projLen2 >= 0) {
        out.push(x3, y3);
        return;
    }
    var tmpSegX = [];
    var tmpSegY = [];
    (0,curve/* cubicSubdivide */.YT)(x0, x1, x2, x3, 0.5, tmpSegX);
    (0,curve/* cubicSubdivide */.YT)(y0, y1, y2, y3, 0.5, tmpSegY);
    adpativeBezier(tmpSegX[0], tmpSegY[0], tmpSegX[1], tmpSegY[1], tmpSegX[2], tmpSegY[2], tmpSegX[3], tmpSegY[3], out, scale);
    adpativeBezier(tmpSegX[4], tmpSegY[4], tmpSegX[5], tmpSegY[5], tmpSegX[6], tmpSegY[6], tmpSegX[7], tmpSegY[7], out, scale);
}
function pathToPolygons(path, scale) {
    var bezierArrayGroups = pathToBezierCurves(path);
    var polygons = [];
    scale = scale || 1;
    for (var i = 0; i < bezierArrayGroups.length; i++) {
        var beziers = bezierArrayGroups[i];
        var polygon = [];
        var x0 = beziers[0];
        var y0 = beziers[1];
        polygon.push(x0, y0);
        for (var k = 2; k < beziers.length;) {
            var x1 = beziers[k++];
            var y1 = beziers[k++];
            var x2 = beziers[k++];
            var y2 = beziers[k++];
            var x3 = beziers[k++];
            var y3 = beziers[k++];
            adpativeBezier(x0, y0, x1, y1, x2, y2, x3, y3, polygon, scale);
            x0 = x3;
            y0 = y3;
        }
        polygons.push(polygon);
    }
    return polygons;
}

;// ./node_modules/zrender/lib/tool/dividePath.js









function getDividingGrids(dimSize, rowDim, count) {
    var rowSize = dimSize[rowDim];
    var columnSize = dimSize[1 - rowDim];
    var ratio = Math.abs(rowSize / columnSize);
    var rowCount = Math.ceil(Math.sqrt(ratio * count));
    var columnCount = Math.floor(count / rowCount);
    if (columnCount === 0) {
        columnCount = 1;
        rowCount = count;
    }
    var grids = [];
    for (var i = 0; i < rowCount; i++) {
        grids.push(columnCount);
    }
    var currentCount = rowCount * columnCount;
    var remained = count - currentCount;
    if (remained > 0) {
        for (var i = 0; i < remained; i++) {
            grids[i % rowCount] += 1;
        }
    }
    return grids;
}
function divideSector(sectorShape, count, outShapes) {
    var r0 = sectorShape.r0;
    var r = sectorShape.r;
    var startAngle = sectorShape.startAngle;
    var endAngle = sectorShape.endAngle;
    var angle = Math.abs(endAngle - startAngle);
    var arcLen = angle * r;
    var deltaR = r - r0;
    var isAngleRow = arcLen > Math.abs(deltaR);
    var grids = getDividingGrids([arcLen, deltaR], isAngleRow ? 0 : 1, count);
    var rowSize = (isAngleRow ? angle : deltaR) / grids.length;
    for (var row = 0; row < grids.length; row++) {
        var columnSize = (isAngleRow ? deltaR : angle) / grids[row];
        for (var column = 0; column < grids[row]; column++) {
            var newShape = {};
            if (isAngleRow) {
                newShape.startAngle = startAngle + rowSize * row;
                newShape.endAngle = startAngle + rowSize * (row + 1);
                newShape.r0 = r0 + columnSize * column;
                newShape.r = r0 + columnSize * (column + 1);
            }
            else {
                newShape.startAngle = startAngle + columnSize * column;
                newShape.endAngle = startAngle + columnSize * (column + 1);
                newShape.r0 = r0 + rowSize * row;
                newShape.r = r0 + rowSize * (row + 1);
            }
            newShape.clockwise = sectorShape.clockwise;
            newShape.cx = sectorShape.cx;
            newShape.cy = sectorShape.cy;
            outShapes.push(newShape);
        }
    }
}
function divideRect(rectShape, count, outShapes) {
    var width = rectShape.width;
    var height = rectShape.height;
    var isHorizontalRow = width > height;
    var grids = getDividingGrids([width, height], isHorizontalRow ? 0 : 1, count);
    var rowSizeDim = isHorizontalRow ? 'width' : 'height';
    var columnSizeDim = isHorizontalRow ? 'height' : 'width';
    var rowDim = isHorizontalRow ? 'x' : 'y';
    var columnDim = isHorizontalRow ? 'y' : 'x';
    var rowSize = rectShape[rowSizeDim] / grids.length;
    for (var row = 0; row < grids.length; row++) {
        var columnSize = rectShape[columnSizeDim] / grids[row];
        for (var column = 0; column < grids[row]; column++) {
            var newShape = {};
            newShape[rowDim] = row * rowSize;
            newShape[columnDim] = column * columnSize;
            newShape[rowSizeDim] = rowSize;
            newShape[columnSizeDim] = columnSize;
            newShape.x += rectShape.x;
            newShape.y += rectShape.y;
            outShapes.push(newShape);
        }
    }
}
function crossProduct2d(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
}
function lineLineIntersect(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
    var mx = a2x - a1x;
    var my = a2y - a1y;
    var nx = b2x - b1x;
    var ny = b2y - b1y;
    var nmCrossProduct = crossProduct2d(nx, ny, mx, my);
    if (Math.abs(nmCrossProduct) < 1e-6) {
        return null;
    }
    var b1a1x = a1x - b1x;
    var b1a1y = a1y - b1y;
    var p = crossProduct2d(b1a1x, b1a1y, nx, ny) / nmCrossProduct;
    if (p < 0 || p > 1) {
        return null;
    }
    return new Point/* default */.A(p * mx + a1x, p * my + a1y);
}
function projPtOnLine(pt, lineA, lineB) {
    var dir = new Point/* default */.A();
    Point/* default */.A.sub(dir, lineB, lineA);
    dir.normalize();
    var dir2 = new Point/* default */.A();
    Point/* default */.A.sub(dir2, pt, lineA);
    var len = dir2.dot(dir);
    return len;
}
function addToPoly(poly, pt) {
    var last = poly[poly.length - 1];
    if (last && last[0] === pt[0] && last[1] === pt[1]) {
        return;
    }
    poly.push(pt);
}
function splitPolygonByLine(points, lineA, lineB) {
    var len = points.length;
    var intersections = [];
    for (var i = 0; i < len; i++) {
        var p0 = points[i];
        var p1 = points[(i + 1) % len];
        var intersectionPt = lineLineIntersect(p0[0], p0[1], p1[0], p1[1], lineA.x, lineA.y, lineB.x, lineB.y);
        if (intersectionPt) {
            intersections.push({
                projPt: projPtOnLine(intersectionPt, lineA, lineB),
                pt: intersectionPt,
                idx: i
            });
        }
    }
    if (intersections.length < 2) {
        return [{ points: points }, { points: points }];
    }
    intersections.sort(function (a, b) {
        return a.projPt - b.projPt;
    });
    var splitPt0 = intersections[0];
    var splitPt1 = intersections[intersections.length - 1];
    if (splitPt1.idx < splitPt0.idx) {
        var tmp = splitPt0;
        splitPt0 = splitPt1;
        splitPt1 = tmp;
    }
    var splitPt0Arr = [splitPt0.pt.x, splitPt0.pt.y];
    var splitPt1Arr = [splitPt1.pt.x, splitPt1.pt.y];
    var newPolyA = [splitPt0Arr];
    var newPolyB = [splitPt1Arr];
    for (var i = splitPt0.idx + 1; i <= splitPt1.idx; i++) {
        addToPoly(newPolyA, points[i].slice());
    }
    addToPoly(newPolyA, splitPt1Arr);
    addToPoly(newPolyA, splitPt0Arr);
    for (var i = splitPt1.idx + 1; i <= splitPt0.idx + len; i++) {
        addToPoly(newPolyB, points[i % len].slice());
    }
    addToPoly(newPolyB, splitPt0Arr);
    addToPoly(newPolyB, splitPt1Arr);
    return [{
            points: newPolyA
        }, {
            points: newPolyB
        }];
}
function binaryDividePolygon(polygonShape) {
    var points = polygonShape.points;
    var min = [];
    var max = [];
    (0,bbox/* fromPoints */.Cr)(points, min, max);
    var boundingRect = new BoundingRect/* default */.A(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    var width = boundingRect.width;
    var height = boundingRect.height;
    var x = boundingRect.x;
    var y = boundingRect.y;
    var pt0 = new Point/* default */.A();
    var pt1 = new Point/* default */.A();
    if (width > height) {
        pt0.x = pt1.x = x + width / 2;
        pt0.y = y;
        pt1.y = y + height;
    }
    else {
        pt0.y = pt1.y = y + height / 2;
        pt0.x = x;
        pt1.x = x + width;
    }
    return splitPolygonByLine(points, pt0, pt1);
}
function binaryDivideRecursive(divider, shape, count, out) {
    if (count === 1) {
        out.push(shape);
    }
    else {
        var mid = Math.floor(count / 2);
        var sub = divider(shape);
        binaryDivideRecursive(divider, sub[0], mid, out);
        binaryDivideRecursive(divider, sub[1], count - mid, out);
    }
    return out;
}
function clone(path, count) {
    var paths = [];
    for (var i = 0; i < count; i++) {
        paths.push((0,tool_path/* clonePath */.rR)(path));
    }
    return paths;
}
function copyPathProps(source, target) {
    target.setStyle(source.style);
    target.z = source.z;
    target.z2 = source.z2;
    target.zlevel = source.zlevel;
}
function polygonConvert(points) {
    var out = [];
    for (var i = 0; i < points.length;) {
        out.push([points[i++], points[i++]]);
    }
    return out;
}
function split(path, count) {
    var outShapes = [];
    var shape = path.shape;
    var OutShapeCtor;
    switch (path.type) {
        case 'rect':
            divideRect(shape, count, outShapes);
            OutShapeCtor = Rect/* default */.A;
            break;
        case 'sector':
            divideSector(shape, count, outShapes);
            OutShapeCtor = Sector/* default */.A;
            break;
        case 'circle':
            divideSector({
                r0: 0, r: shape.r, startAngle: 0, endAngle: Math.PI * 2,
                cx: shape.cx, cy: shape.cy
            }, count, outShapes);
            OutShapeCtor = Sector/* default */.A;
            break;
        default:
            var m = path.getComputedTransform();
            var scale = m ? Math.sqrt(Math.max(m[0] * m[0] + m[1] * m[1], m[2] * m[2] + m[3] * m[3])) : 1;
            var polygons = (0,util/* map */.Tj)(pathToPolygons(path.getUpdatedPathProxy(), scale), function (poly) { return polygonConvert(poly); });
            var polygonCount = polygons.length;
            if (polygonCount === 0) {
                binaryDivideRecursive(binaryDividePolygon, {
                    points: polygons[0]
                }, count, outShapes);
            }
            else if (polygonCount === count) {
                for (var i = 0; i < polygonCount; i++) {
                    outShapes.push({
                        points: polygons[i]
                    });
                }
            }
            else {
                var totalArea_1 = 0;
                var items = (0,util/* map */.Tj)(polygons, function (poly) {
                    var min = [];
                    var max = [];
                    (0,bbox/* fromPoints */.Cr)(poly, min, max);
                    var area = (max[1] - min[1]) * (max[0] - min[0]);
                    totalArea_1 += area;
                    return { poly: poly, area: area };
                });
                items.sort(function (a, b) { return b.area - a.area; });
                var left = count;
                for (var i = 0; i < polygonCount; i++) {
                    var item = items[i];
                    if (left <= 0) {
                        break;
                    }
                    var selfCount = i === polygonCount - 1
                        ? left
                        : Math.ceil(item.area / totalArea_1 * count);
                    if (selfCount < 0) {
                        continue;
                    }
                    binaryDivideRecursive(binaryDividePolygon, {
                        points: item.poly
                    }, selfCount, outShapes);
                    left -= selfCount;
                }
                ;
            }
            OutShapeCtor = Polygon/* default */.A;
            break;
    }
    if (!OutShapeCtor) {
        return clone(path, count);
    }
    var out = [];
    for (var i = 0; i < outShapes.length; i++) {
        var subPath = new OutShapeCtor();
        subPath.setShape(outShapes[i]);
        copyPathProps(path, subPath);
        out.push(subPath);
    }
    return out;
}

;// ./node_modules/zrender/lib/tool/morphPath.js








function alignSubpath(subpath1, subpath2) {
    var len1 = subpath1.length;
    var len2 = subpath2.length;
    if (len1 === len2) {
        return [subpath1, subpath2];
    }
    var tmpSegX = [];
    var tmpSegY = [];
    var shorterPath = len1 < len2 ? subpath1 : subpath2;
    var shorterLen = Math.min(len1, len2);
    var diff = Math.abs(len2 - len1) / 6;
    var shorterBezierCount = (shorterLen - 2) / 6;
    var eachCurveSubDivCount = Math.ceil(diff / shorterBezierCount) + 1;
    var newSubpath = [shorterPath[0], shorterPath[1]];
    var remained = diff;
    for (var i = 2; i < shorterLen;) {
        var x0 = shorterPath[i - 2];
        var y0 = shorterPath[i - 1];
        var x1 = shorterPath[i++];
        var y1 = shorterPath[i++];
        var x2 = shorterPath[i++];
        var y2 = shorterPath[i++];
        var x3 = shorterPath[i++];
        var y3 = shorterPath[i++];
        if (remained <= 0) {
            newSubpath.push(x1, y1, x2, y2, x3, y3);
            continue;
        }
        var actualSubDivCount = Math.min(remained, eachCurveSubDivCount - 1) + 1;
        for (var k = 1; k <= actualSubDivCount; k++) {
            var p = k / actualSubDivCount;
            (0,curve/* cubicSubdivide */.YT)(x0, x1, x2, x3, p, tmpSegX);
            (0,curve/* cubicSubdivide */.YT)(y0, y1, y2, y3, p, tmpSegY);
            x0 = tmpSegX[3];
            y0 = tmpSegY[3];
            newSubpath.push(tmpSegX[1], tmpSegY[1], tmpSegX[2], tmpSegY[2], x0, y0);
            x1 = tmpSegX[5];
            y1 = tmpSegY[5];
            x2 = tmpSegX[6];
            y2 = tmpSegY[6];
        }
        remained -= actualSubDivCount - 1;
    }
    return shorterPath === subpath1 ? [newSubpath, subpath2] : [subpath1, newSubpath];
}
function createSubpath(lastSubpathSubpath, otherSubpath) {
    var len = lastSubpathSubpath.length;
    var lastX = lastSubpathSubpath[len - 2];
    var lastY = lastSubpathSubpath[len - 1];
    var newSubpath = [];
    for (var i = 0; i < otherSubpath.length;) {
        newSubpath[i++] = lastX;
        newSubpath[i++] = lastY;
    }
    return newSubpath;
}
function alignBezierCurves(array1, array2) {
    var _a;
    var lastSubpath1;
    var lastSubpath2;
    var newArray1 = [];
    var newArray2 = [];
    for (var i = 0; i < Math.max(array1.length, array2.length); i++) {
        var subpath1 = array1[i];
        var subpath2 = array2[i];
        var newSubpath1 = void 0;
        var newSubpath2 = void 0;
        if (!subpath1) {
            newSubpath1 = createSubpath(lastSubpath1 || subpath2, subpath2);
            newSubpath2 = subpath2;
        }
        else if (!subpath2) {
            newSubpath2 = createSubpath(lastSubpath2 || subpath1, subpath1);
            newSubpath1 = subpath1;
        }
        else {
            _a = alignSubpath(subpath1, subpath2), newSubpath1 = _a[0], newSubpath2 = _a[1];
            lastSubpath1 = newSubpath1;
            lastSubpath2 = newSubpath2;
        }
        newArray1.push(newSubpath1);
        newArray2.push(newSubpath2);
    }
    return [newArray1, newArray2];
}
function centroid(array) {
    var signedArea = 0;
    var cx = 0;
    var cy = 0;
    var len = array.length;
    for (var i = 0, j = len - 2; i < len; j = i, i += 2) {
        var x0 = array[j];
        var y0 = array[j + 1];
        var x1 = array[i];
        var y1 = array[i + 1];
        var a = x0 * y1 - x1 * y0;
        signedArea += a;
        cx += (x0 + x1) * a;
        cy += (y0 + y1) * a;
    }
    if (signedArea === 0) {
        return [array[0] || 0, array[1] || 0];
    }
    return [cx / signedArea / 3, cy / signedArea / 3, signedArea];
}
function findBestRingOffset(fromSubBeziers, toSubBeziers, fromCp, toCp) {
    var bezierCount = (fromSubBeziers.length - 2) / 6;
    var bestScore = Infinity;
    var bestOffset = 0;
    var len = fromSubBeziers.length;
    var len2 = len - 2;
    for (var offset = 0; offset < bezierCount; offset++) {
        var cursorOffset = offset * 6;
        var score = 0;
        for (var k = 0; k < len; k += 2) {
            var idx = k === 0 ? cursorOffset : ((cursorOffset + k - 2) % len2 + 2);
            var x0 = fromSubBeziers[idx] - fromCp[0];
            var y0 = fromSubBeziers[idx + 1] - fromCp[1];
            var x1 = toSubBeziers[k] - toCp[0];
            var y1 = toSubBeziers[k + 1] - toCp[1];
            var dx = x1 - x0;
            var dy = y1 - y0;
            score += dx * dx + dy * dy;
        }
        if (score < bestScore) {
            bestScore = score;
            bestOffset = offset;
        }
    }
    return bestOffset;
}
function reverse(array) {
    var newArr = [];
    var len = array.length;
    for (var i = 0; i < len; i += 2) {
        newArr[i] = array[len - i - 2];
        newArr[i + 1] = array[len - i - 1];
    }
    return newArr;
}
function findBestMorphingRotation(fromArr, toArr, searchAngleIteration, searchAngleRange) {
    var result = [];
    var fromNeedsReverse;
    for (var i = 0; i < fromArr.length; i++) {
        var fromSubpathBezier = fromArr[i];
        var toSubpathBezier = toArr[i];
        var fromCp = centroid(fromSubpathBezier);
        var toCp = centroid(toSubpathBezier);
        if (fromNeedsReverse == null) {
            fromNeedsReverse = fromCp[2] < 0 !== toCp[2] < 0;
        }
        var newFromSubpathBezier = [];
        var newToSubpathBezier = [];
        var bestAngle = 0;
        var bestScore = Infinity;
        var tmpArr = [];
        var len = fromSubpathBezier.length;
        if (fromNeedsReverse) {
            fromSubpathBezier = reverse(fromSubpathBezier);
        }
        var offset = findBestRingOffset(fromSubpathBezier, toSubpathBezier, fromCp, toCp) * 6;
        var len2 = len - 2;
        for (var k = 0; k < len2; k += 2) {
            var idx = (offset + k) % len2 + 2;
            newFromSubpathBezier[k + 2] = fromSubpathBezier[idx] - fromCp[0];
            newFromSubpathBezier[k + 3] = fromSubpathBezier[idx + 1] - fromCp[1];
        }
        newFromSubpathBezier[0] = fromSubpathBezier[offset] - fromCp[0];
        newFromSubpathBezier[1] = fromSubpathBezier[offset + 1] - fromCp[1];
        if (searchAngleIteration > 0) {
            var step = searchAngleRange / searchAngleIteration;
            for (var angle = -searchAngleRange / 2; angle <= searchAngleRange / 2; angle += step) {
                var sa = Math.sin(angle);
                var ca = Math.cos(angle);
                var score = 0;
                for (var k = 0; k < fromSubpathBezier.length; k += 2) {
                    var x0 = newFromSubpathBezier[k];
                    var y0 = newFromSubpathBezier[k + 1];
                    var x1 = toSubpathBezier[k] - toCp[0];
                    var y1 = toSubpathBezier[k + 1] - toCp[1];
                    var newX1 = x1 * ca - y1 * sa;
                    var newY1 = x1 * sa + y1 * ca;
                    tmpArr[k] = newX1;
                    tmpArr[k + 1] = newY1;
                    var dx = newX1 - x0;
                    var dy = newY1 - y0;
                    score += dx * dx + dy * dy;
                }
                if (score < bestScore) {
                    bestScore = score;
                    bestAngle = angle;
                    for (var m = 0; m < tmpArr.length; m++) {
                        newToSubpathBezier[m] = tmpArr[m];
                    }
                }
            }
        }
        else {
            for (var i_1 = 0; i_1 < len; i_1 += 2) {
                newToSubpathBezier[i_1] = toSubpathBezier[i_1] - toCp[0];
                newToSubpathBezier[i_1 + 1] = toSubpathBezier[i_1 + 1] - toCp[1];
            }
        }
        result.push({
            from: newFromSubpathBezier,
            to: newToSubpathBezier,
            fromCp: fromCp,
            toCp: toCp,
            rotation: -bestAngle
        });
    }
    return result;
}
function isCombineMorphing(path) {
    return path.__isCombineMorphing;
}
function isMorphing(el) {
    return el.__morphT >= 0;
}
var SAVED_METHOD_PREFIX = '__mOriginal_';
function saveAndModifyMethod(obj, methodName, modifiers) {
    var savedMethodName = SAVED_METHOD_PREFIX + methodName;
    var originalMethod = obj[savedMethodName] || obj[methodName];
    if (!obj[savedMethodName]) {
        obj[savedMethodName] = obj[methodName];
    }
    var replace = modifiers.replace;
    var after = modifiers.after;
    var before = modifiers.before;
    obj[methodName] = function () {
        var args = arguments;
        var res;
        before && before.apply(this, args);
        if (replace) {
            res = replace.apply(this, args);
        }
        else {
            res = originalMethod.apply(this, args);
        }
        after && after.apply(this, args);
        return res;
    };
}
function restoreMethod(obj, methodName) {
    var savedMethodName = SAVED_METHOD_PREFIX + methodName;
    if (obj[savedMethodName]) {
        obj[methodName] = obj[savedMethodName];
        obj[savedMethodName] = null;
    }
}
function applyTransformOnBeziers(bezierCurves, mm) {
    for (var i = 0; i < bezierCurves.length; i++) {
        var subBeziers = bezierCurves[i];
        for (var k = 0; k < subBeziers.length;) {
            var x = subBeziers[k];
            var y = subBeziers[k + 1];
            subBeziers[k++] = mm[0] * x + mm[2] * y + mm[4];
            subBeziers[k++] = mm[1] * x + mm[3] * y + mm[5];
        }
    }
}
function prepareMorphPath(fromPath, toPath) {
    var fromPathProxy = fromPath.getUpdatedPathProxy();
    var toPathProxy = toPath.getUpdatedPathProxy();
    var _a = alignBezierCurves(pathToBezierCurves(fromPathProxy), pathToBezierCurves(toPathProxy)), fromBezierCurves = _a[0], toBezierCurves = _a[1];
    var fromPathTransform = fromPath.getComputedTransform();
    var toPathTransform = toPath.getComputedTransform();
    function updateIdentityTransform() {
        this.transform = null;
    }
    fromPathTransform && applyTransformOnBeziers(fromBezierCurves, fromPathTransform);
    toPathTransform && applyTransformOnBeziers(toBezierCurves, toPathTransform);
    saveAndModifyMethod(toPath, 'updateTransform', { replace: updateIdentityTransform });
    toPath.transform = null;
    var morphingData = findBestMorphingRotation(fromBezierCurves, toBezierCurves, 10, Math.PI);
    var tmpArr = [];
    saveAndModifyMethod(toPath, 'buildPath', { replace: function (path) {
            var t = toPath.__morphT;
            var onet = 1 - t;
            var newCp = [];
            for (var i = 0; i < morphingData.length; i++) {
                var item = morphingData[i];
                var from = item.from;
                var to = item.to;
                var angle = item.rotation * t;
                var fromCp = item.fromCp;
                var toCp = item.toCp;
                var sa = Math.sin(angle);
                var ca = Math.cos(angle);
                (0,vector/* lerp */.Cc)(newCp, fromCp, toCp, t);
                for (var m = 0; m < from.length; m += 2) {
                    var x0_1 = from[m];
                    var y0_1 = from[m + 1];
                    var x1 = to[m];
                    var y1 = to[m + 1];
                    var x = x0_1 * onet + x1 * t;
                    var y = y0_1 * onet + y1 * t;
                    tmpArr[m] = (x * ca - y * sa) + newCp[0];
                    tmpArr[m + 1] = (x * sa + y * ca) + newCp[1];
                }
                var x0 = tmpArr[0];
                var y0 = tmpArr[1];
                path.moveTo(x0, y0);
                for (var m = 2; m < from.length;) {
                    var x1 = tmpArr[m++];
                    var y1 = tmpArr[m++];
                    var x2 = tmpArr[m++];
                    var y2 = tmpArr[m++];
                    var x3 = tmpArr[m++];
                    var y3 = tmpArr[m++];
                    if (x0 === x1 && y0 === y1 && x2 === x3 && y2 === y3) {
                        path.lineTo(x3, y3);
                    }
                    else {
                        path.bezierCurveTo(x1, y1, x2, y2, x3, y3);
                    }
                    x0 = x3;
                    y0 = y3;
                }
            }
        } });
}
function morphPath(fromPath, toPath, animationOpts) {
    if (!fromPath || !toPath) {
        return toPath;
    }
    var oldDone = animationOpts.done;
    var oldDuring = animationOpts.during;
    prepareMorphPath(fromPath, toPath);
    toPath.__morphT = 0;
    function restoreToPath() {
        restoreMethod(toPath, 'buildPath');
        restoreMethod(toPath, 'updateTransform');
        toPath.__morphT = -1;
        toPath.createPathProxy();
        toPath.dirtyShape();
    }
    toPath.animateTo({
        __morphT: 1
    }, (0,util/* defaults */.NT)({
        during: function (p) {
            toPath.dirtyShape();
            oldDuring && oldDuring(p);
        },
        done: function () {
            restoreToPath();
            oldDone && oldDone();
        }
    }, animationOpts));
    return toPath;
}
function hilbert(x, y, minX, minY, maxX, maxY) {
    var bits = 16;
    x = (maxX === minX) ? 0 : Math.round(32767 * (x - minX) / (maxX - minX));
    y = (maxY === minY) ? 0 : Math.round(32767 * (y - minY) / (maxY - minY));
    var d = 0;
    var tmp;
    for (var s = (1 << bits) / 2; s > 0; s /= 2) {
        var rx = 0;
        var ry = 0;
        if ((x & s) > 0) {
            rx = 1;
        }
        if ((y & s) > 0) {
            ry = 1;
        }
        d += s * s * ((3 * rx) ^ ry);
        if (ry === 0) {
            if (rx === 1) {
                x = s - 1 - x;
                y = s - 1 - y;
            }
            tmp = x;
            x = y;
            y = tmp;
        }
    }
    return d;
}
function sortPaths(pathList) {
    var xMin = Infinity;
    var yMin = Infinity;
    var xMax = -Infinity;
    var yMax = -Infinity;
    var cps = (0,util/* map */.Tj)(pathList, function (path) {
        var rect = path.getBoundingRect();
        var m = path.getComputedTransform();
        var x = rect.x + rect.width / 2 + (m ? m[4] : 0);
        var y = rect.y + rect.height / 2 + (m ? m[5] : 0);
        xMin = Math.min(x, xMin);
        yMin = Math.min(y, yMin);
        xMax = Math.max(x, xMax);
        yMax = Math.max(y, yMax);
        return [x, y];
    });
    var items = (0,util/* map */.Tj)(cps, function (cp, idx) {
        return {
            cp: cp,
            z: hilbert(cp[0], cp[1], xMin, yMin, xMax, yMax),
            path: pathList[idx]
        };
    });
    return items.sort(function (a, b) { return a.z - b.z; }).map(function (item) { return item.path; });
}
;
function defaultDividePath(param) {
    return split(param.path, param.count);
}
function createEmptyReturn() {
    return {
        fromIndividuals: [],
        toIndividuals: [],
        count: 0
    };
}
function combineMorph(fromList, toPath, animationOpts) {
    var fromPathList = [];
    function addFromPath(fromList) {
        for (var i = 0; i < fromList.length; i++) {
            var from = fromList[i];
            if (isCombineMorphing(from)) {
                addFromPath(from.childrenRef());
            }
            else if (from instanceof Path/* default */.Ay) {
                fromPathList.push(from);
            }
        }
    }
    addFromPath(fromList);
    var separateCount = fromPathList.length;
    if (!separateCount) {
        return createEmptyReturn();
    }
    var dividePath = animationOpts.dividePath || defaultDividePath;
    var toSubPathList = dividePath({
        path: toPath, count: separateCount
    });
    if (toSubPathList.length !== separateCount) {
        console.error('Invalid morphing: unmatched splitted path');
        return createEmptyReturn();
    }
    fromPathList = sortPaths(fromPathList);
    toSubPathList = sortPaths(toSubPathList);
    var oldDone = animationOpts.done;
    var oldDuring = animationOpts.during;
    var individualDelay = animationOpts.individualDelay;
    var identityTransform = new Transformable/* default */.Ay();
    for (var i = 0; i < separateCount; i++) {
        var from = fromPathList[i];
        var to = toSubPathList[i];
        to.parent = toPath;
        to.copyTransform(identityTransform);
        if (!individualDelay) {
            prepareMorphPath(from, to);
        }
    }
    toPath.__isCombineMorphing = true;
    toPath.childrenRef = function () {
        return toSubPathList;
    };
    function addToSubPathListToZr(zr) {
        for (var i = 0; i < toSubPathList.length; i++) {
            toSubPathList[i].addSelfToZr(zr);
        }
    }
    saveAndModifyMethod(toPath, 'addSelfToZr', {
        after: function (zr) {
            addToSubPathListToZr(zr);
        }
    });
    saveAndModifyMethod(toPath, 'removeSelfFromZr', {
        after: function (zr) {
            for (var i = 0; i < toSubPathList.length; i++) {
                toSubPathList[i].removeSelfFromZr(zr);
            }
        }
    });
    function restoreToPath() {
        toPath.__isCombineMorphing = false;
        toPath.__morphT = -1;
        toPath.childrenRef = null;
        restoreMethod(toPath, 'addSelfToZr');
        restoreMethod(toPath, 'removeSelfFromZr');
    }
    var toLen = toSubPathList.length;
    if (individualDelay) {
        var animating_1 = toLen;
        var eachDone = function () {
            animating_1--;
            if (animating_1 === 0) {
                restoreToPath();
                oldDone && oldDone();
            }
        };
        for (var i = 0; i < toLen; i++) {
            var indivdualAnimationOpts = individualDelay ? (0,util/* defaults */.NT)({
                delay: (animationOpts.delay || 0) + individualDelay(i, toLen, fromPathList[i], toSubPathList[i]),
                done: eachDone
            }, animationOpts) : animationOpts;
            morphPath(fromPathList[i], toSubPathList[i], indivdualAnimationOpts);
        }
    }
    else {
        toPath.__morphT = 0;
        toPath.animateTo({
            __morphT: 1
        }, (0,util/* defaults */.NT)({
            during: function (p) {
                for (var i = 0; i < toLen; i++) {
                    var child = toSubPathList[i];
                    child.__morphT = toPath.__morphT;
                    child.dirtyShape();
                }
                oldDuring && oldDuring(p);
            },
            done: function () {
                restoreToPath();
                for (var i = 0; i < fromList.length; i++) {
                    restoreMethod(fromList[i], 'updateTransform');
                }
                oldDone && oldDone();
            }
        }, animationOpts));
    }
    if (toPath.__zr) {
        addToSubPathListToZr(toPath.__zr);
    }
    return {
        fromIndividuals: fromPathList,
        toIndividuals: toSubPathList,
        count: toLen
    };
}
function separateMorph(fromPath, toPathList, animationOpts) {
    var toLen = toPathList.length;
    var fromPathList = [];
    var dividePath = animationOpts.dividePath || defaultDividePath;
    function addFromPath(fromList) {
        for (var i = 0; i < fromList.length; i++) {
            var from = fromList[i];
            if (isCombineMorphing(from)) {
                addFromPath(from.childrenRef());
            }
            else if (from instanceof Path/* default */.Ay) {
                fromPathList.push(from);
            }
        }
    }
    if (isCombineMorphing(fromPath)) {
        addFromPath(fromPath.childrenRef());
        var fromLen = fromPathList.length;
        if (fromLen < toLen) {
            var k = 0;
            for (var i = fromLen; i < toLen; i++) {
                fromPathList.push((0,tool_path/* clonePath */.rR)(fromPathList[k++ % fromLen]));
            }
        }
        fromPathList.length = toLen;
    }
    else {
        fromPathList = dividePath({ path: fromPath, count: toLen });
        var fromPathTransform = fromPath.getComputedTransform();
        for (var i = 0; i < fromPathList.length; i++) {
            fromPathList[i].setLocalTransform(fromPathTransform);
        }
        if (fromPathList.length !== toLen) {
            console.error('Invalid morphing: unmatched splitted path');
            return createEmptyReturn();
        }
    }
    fromPathList = sortPaths(fromPathList);
    toPathList = sortPaths(toPathList);
    var individualDelay = animationOpts.individualDelay;
    for (var i = 0; i < toLen; i++) {
        var indivdualAnimationOpts = individualDelay ? (0,util/* defaults */.NT)({
            delay: (animationOpts.delay || 0) + individualDelay(i, toLen, fromPathList[i], toPathList[i])
        }, animationOpts) : animationOpts;
        morphPath(fromPathList[i], toPathList[i], indivdualAnimationOpts);
    }
    return {
        fromIndividuals: fromPathList,
        toIndividuals: toPathList,
        count: toPathList.length
    };
}


// EXTERNAL MODULE: ./node_modules/echarts/lib/animation/basicTransition.js
var basicTransition = __webpack_require__(5638);
;// ./node_modules/echarts/lib/animation/morphTransitionHelper.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/





function isMultiple(elements) {
  return (0,util/* isArray */.cy)(elements[0]);
}
function prepareMorphBatches(one, many) {
  var batches = [];
  var batchCount = one.length;
  for (var i = 0; i < batchCount; i++) {
    batches.push({
      one: one[i],
      many: []
    });
  }
  for (var i = 0; i < many.length; i++) {
    var len = many[i].length;
    var k = void 0;
    for (k = 0; k < len; k++) {
      batches[k % batchCount].many.push(many[i][k]);
    }
  }
  var off = 0;
  // If one has more paths than each one of many. average them.
  for (var i = batchCount - 1; i >= 0; i--) {
    if (!batches[i].many.length) {
      var moveFrom = batches[off].many;
      if (moveFrom.length <= 1) {
        // Not enough
        // Start from the first one.
        if (off) {
          off = 0;
        } else {
          return batches;
        }
      }
      var len = moveFrom.length;
      var mid = Math.ceil(len / 2);
      batches[i].many = moveFrom.slice(mid, len);
      batches[off].many = moveFrom.slice(0, mid);
      off++;
    }
  }
  return batches;
}
var pathDividers = {
  clone: function (params) {
    var ret = [];
    // Fitting the alpha
    var approxOpacity = 1 - Math.pow(1 - params.path.style.opacity, 1 / params.count);
    for (var i = 0; i < params.count; i++) {
      var cloned = (0,tool_path/* clonePath */.rR)(params.path);
      cloned.setStyle('opacity', approxOpacity);
      ret.push(cloned);
    }
    return ret;
  },
  // Use the default divider
  split: null
};
function applyMorphAnimation(from, to, divideShape, seriesModel, dataIndex, animateOtherProps) {
  if (!from.length || !to.length) {
    return;
  }
  var updateAnimationCfg = (0,basicTransition/* getAnimationConfig */.Jw)('update', seriesModel, dataIndex);
  if (!(updateAnimationCfg && updateAnimationCfg.duration > 0)) {
    return;
  }
  var animationDelay = seriesModel.getModel('universalTransition').get('delay');
  var animationCfg = Object.assign({
    // Need to setToFinal so the further calculation based on the style can be correct.
    // Like emphasis color.
    setToFinal: true
  }, updateAnimationCfg);
  var many;
  var one;
  if (isMultiple(from)) {
    // manyToOne
    many = from;
    one = to;
  }
  if (isMultiple(to)) {
    // oneToMany
    many = to;
    one = from;
  }
  function morphOneBatch(batch, fromIsMany, animateIndex, animateCount, forceManyOne) {
    var batchMany = batch.many;
    var batchOne = batch.one;
    if (batchMany.length === 1 && !forceManyOne) {
      // Is one to one
      var batchFrom = fromIsMany ? batchMany[0] : batchOne;
      var batchTo = fromIsMany ? batchOne : batchMany[0];
      if (isCombineMorphing(batchFrom)) {
        // Keep doing combine animation.
        morphOneBatch({
          many: [batchFrom],
          one: batchTo
        }, true, animateIndex, animateCount, true);
      } else {
        var individualAnimationCfg = animationDelay ? (0,util/* defaults */.NT)({
          delay: animationDelay(animateIndex, animateCount)
        }, animationCfg) : animationCfg;
        morphPath(batchFrom, batchTo, individualAnimationCfg);
        animateOtherProps(batchFrom, batchTo, batchFrom, batchTo, individualAnimationCfg);
      }
    } else {
      var separateAnimationCfg = (0,util/* defaults */.NT)({
        dividePath: pathDividers[divideShape],
        individualDelay: animationDelay && function (idx, count, fromPath, toPath) {
          return animationDelay(idx + animateIndex, animateCount);
        }
      }, animationCfg);
      var _a = fromIsMany ? combineMorph(batchMany, batchOne, separateAnimationCfg) : separateMorph(batchOne, batchMany, separateAnimationCfg),
        fromIndividuals = _a.fromIndividuals,
        toIndividuals = _a.toIndividuals;
      var count = fromIndividuals.length;
      for (var k = 0; k < count; k++) {
        var individualAnimationCfg = animationDelay ? (0,util/* defaults */.NT)({
          delay: animationDelay(k, count)
        }, animationCfg) : animationCfg;
        animateOtherProps(fromIndividuals[k], toIndividuals[k], fromIsMany ? batchMany[k] : batch.one, fromIsMany ? batch.one : batchMany[k], individualAnimationCfg);
      }
    }
  }
  var fromIsMany = many ? many === from
  // Is one to one. If the path number not match. also needs do merge and separate morphing.
  : from.length > to.length;
  var morphBatches = many ? prepareMorphBatches(one, many) : prepareMorphBatches(fromIsMany ? to : from, [fromIsMany ? from : to]);
  var animateCount = 0;
  for (var i = 0; i < morphBatches.length; i++) {
    animateCount += morphBatches[i].many.length;
  }
  var animateIndex = 0;
  for (var i = 0; i < morphBatches.length; i++) {
    morphOneBatch(morphBatches[i], fromIsMany, animateIndex, animateCount);
    animateIndex += morphBatches[i].many.length;
  }
}
function getPathList(elements) {
  if (!elements) {
    return [];
  }
  if ((0,util/* isArray */.cy)(elements)) {
    var pathList_1 = [];
    for (var i = 0; i < elements.length; i++) {
      pathList_1.push(getPathList(elements[i]));
    }
    return pathList_1;
  }
  var pathList = [];
  elements.traverse(function (el) {
    if (el instanceof Path/* default */.Ay && !el.disableMorphing && !el.invisible && !el.ignore) {
      pathList.push(el);
    }
  });
  return pathList;
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/data/DataDiffer.js
var DataDiffer = __webpack_require__(16563);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/model.js
var model = __webpack_require__(48170);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/log.js
var log = __webpack_require__(41025);
// EXTERNAL MODULE: ./node_modules/zrender/lib/graphic/Displayable.js
var Displayable = __webpack_require__(71519);
;// ./node_modules/echarts/lib/animation/universalTransition.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Universal transitions that can animate between any shapes(series) and any properties in any amounts.










var DATA_COUNT_THRESHOLD = 1e4;
var TRANSITION_NONE = 0;
var TRANSITION_P2C = 1;
var TRANSITION_C2P = 2;
;
var getUniversalTransitionGlobalStore = (0,model/* makeInner */.$r)();
function getDimension(data, visualDimension) {
  var dimensions = data.dimensions;
  for (var i = 0; i < dimensions.length; i++) {
    var dimInfo = data.getDimensionInfo(dimensions[i]);
    if (dimInfo && dimInfo.otherDims[visualDimension] === 0) {
      return dimensions[i];
    }
  }
}
// get value by dimension. (only get value of itemGroupId or childGroupId, so convert it to string)
function getValueByDimension(data, dataIndex, dimension) {
  var dimInfo = data.getDimensionInfo(dimension);
  var dimOrdinalMeta = dimInfo && dimInfo.ordinalMeta;
  if (dimInfo) {
    var value = data.get(dimInfo.name, dataIndex);
    if (dimOrdinalMeta) {
      return dimOrdinalMeta.categories[value] || value + '';
    }
    return value + '';
  }
}
function getGroupId(data, dataIndex, dataGroupId, isChild) {
  // try to get groupId from encode
  var visualDimension = isChild ? 'itemChildGroupId' : 'itemGroupId';
  var groupIdDim = getDimension(data, visualDimension);
  if (groupIdDim) {
    var groupId = getValueByDimension(data, dataIndex, groupIdDim);
    return groupId;
  }
  // try to get groupId from raw data item
  var rawDataItem = data.getRawDataItem(dataIndex);
  var property = isChild ? 'childGroupId' : 'groupId';
  if (rawDataItem && rawDataItem[property]) {
    return rawDataItem[property] + '';
  }
  // fallback
  if (isChild) {
    return;
  }
  // try to use series.dataGroupId as groupId, otherwise use dataItem's id as groupId
  return dataGroupId || data.getId(dataIndex);
}
// flatten all data items from different serieses into one arrary
function flattenDataDiffItems(list) {
  var items = [];
  (0,util/* each */.__)(list, function (seriesInfo) {
    var data = seriesInfo.data;
    var dataGroupId = seriesInfo.dataGroupId;
    if (data.count() > DATA_COUNT_THRESHOLD) {
      if (false) {}
      return;
    }
    var indices = data.getIndices();
    for (var dataIndex = 0; dataIndex < indices.length; dataIndex++) {
      items.push({
        data: data,
        groupId: getGroupId(data, dataIndex, dataGroupId, false),
        childGroupId: getGroupId(data, dataIndex, dataGroupId, true),
        divide: seriesInfo.divide,
        dataIndex: dataIndex
      });
    }
  });
  return items;
}
function fadeInElement(newEl, newSeries, newIndex) {
  newEl.traverse(function (el) {
    if (el instanceof Path/* default */.Ay) {
      // TODO use fade in animation for target element.
      (0,basicTransition/* initProps */.LW)(el, {
        style: {
          opacity: 0
        }
      }, newSeries, {
        dataIndex: newIndex,
        isFrom: true
      });
    }
  });
}
function removeEl(el) {
  if (el.parent) {
    // Bake parent transform to element.
    // So it can still have proper transform to transition after it's removed.
    var computedTransform = el.getComputedTransform();
    el.setLocalTransform(computedTransform);
    el.parent.remove(el);
  }
}
function stopAnimation(el) {
  el.stopAnimation();
  if (el.isGroup) {
    el.traverse(function (child) {
      child.stopAnimation();
    });
  }
}
function animateElementStyles(el, dataIndex, seriesModel) {
  var animationConfig = (0,basicTransition/* getAnimationConfig */.Jw)('update', seriesModel, dataIndex);
  animationConfig && el.traverse(function (child) {
    if (child instanceof Displayable/* default */.Ay) {
      var oldStyle = (0,basicTransition/* getOldStyle */.Xr)(child);
      if (oldStyle) {
        child.animateFrom({
          style: oldStyle
        }, animationConfig);
      }
    }
  });
}
function isAllIdSame(oldDiffItems, newDiffItems) {
  var len = oldDiffItems.length;
  if (len !== newDiffItems.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var oldItem = oldDiffItems[i];
    var newItem = newDiffItems[i];
    if (oldItem.data.getId(oldItem.dataIndex) !== newItem.data.getId(newItem.dataIndex)) {
      return false;
    }
  }
  return true;
}
function transitionBetween(oldList, newList, api) {
  var oldDiffItems = flattenDataDiffItems(oldList);
  var newDiffItems = flattenDataDiffItems(newList);
  function updateMorphingPathProps(from, to, rawFrom, rawTo, animationCfg) {
    if (rawFrom || from) {
      to.animateFrom({
        style: rawFrom && rawFrom !== from
        // dividingMethod like clone may override the style(opacity)
        // So extend it to raw style.
        ? (0,util/* extend */.X$)((0,util/* extend */.X$)({}, rawFrom.style), from.style) : from.style
      }, animationCfg);
    }
  }
  var hasMorphAnimation = false;
  /**
   * With groupId and childGroupId, we can build parent-child relationships between dataItems.
   * However, we should mind the parent-child "direction" between old and new options.
   *
   * For example, suppose we have two dataItems from two series.data:
   *
   * dataA: [                          dataB: [
   *   {                                 {
   *     value: 5,                         value: 3,
   *     groupId: 'creatures',             groupId: 'animals',
   *     childGroupId: 'animals'           childGroupId: 'dogs'
   *   },                                },
   *   ...                               ...
   * ]                                 ]
   *
   * where dataA is belong to optionA and dataB is belong to optionB.
   *
   * When we `setOption(optionB)` from optionA, we choose childGroupId of dataItemA and groupId of
   * dataItemB as keys so the two keys are matched (both are 'animals'), then universalTransition
   * will work. This derection is "parent -> child".
   *
   * If we `setOption(optionA)` from optionB, we also choose groupId of dataItemB and childGroupId
   * of dataItemA as keys and universalTransition will work. This derection is "child -> parent".
   *
   * If there is no childGroupId specified, which means no multiLevelDrillDown/Up is needed and no
   * parent-child relationship exists. This direction is "none".
   *
   * So we need to know whether to use groupId or childGroupId as the key when we call the keyGetter
   * functions. Thus, we need to decide the direction first.
   *
   * The rule is:
   *
   * if (all childGroupIds in oldDiffItems and all groupIds in newDiffItems have common value) {
   *   direction = 'parent -> child';
   * } else if (all groupIds in oldDiffItems and all childGroupIds in newDiffItems have common value) {
   *   direction = 'child -> parent';
   * } else {
   *   direction = 'none';
   * }
   */
  var direction = TRANSITION_NONE;
  // find all groupIds and childGroupIds from oldDiffItems
  var oldGroupIds = (0,util/* createHashMap */.nt)();
  var oldChildGroupIds = (0,util/* createHashMap */.nt)();
  oldDiffItems.forEach(function (item) {
    item.groupId && oldGroupIds.set(item.groupId, true);
    item.childGroupId && oldChildGroupIds.set(item.childGroupId, true);
  });
  // traverse newDiffItems and decide the direction according to the rule
  for (var i = 0; i < newDiffItems.length; i++) {
    var newGroupId = newDiffItems[i].groupId;
    if (oldChildGroupIds.get(newGroupId)) {
      direction = TRANSITION_P2C;
      break;
    }
    var newChildGroupId = newDiffItems[i].childGroupId;
    if (newChildGroupId && oldGroupIds.get(newChildGroupId)) {
      direction = TRANSITION_C2P;
      break;
    }
  }
  function createKeyGetter(isOld, onlyGetId) {
    return function (diffItem) {
      var data = diffItem.data;
      var dataIndex = diffItem.dataIndex;
      // TODO if specified dim
      if (onlyGetId) {
        return data.getId(dataIndex);
      }
      if (isOld) {
        return direction === TRANSITION_P2C ? diffItem.childGroupId : diffItem.groupId;
      } else {
        return direction === TRANSITION_C2P ? diffItem.childGroupId : diffItem.groupId;
      }
    };
  }
  // Use id if it's very likely to be an one to one animation
  // It's more robust than groupId
  // TODO Check if key dimension is specified.
  var useId = isAllIdSame(oldDiffItems, newDiffItems);
  var isElementStillInChart = {};
  if (!useId) {
    // We may have different diff strategy with basicTransition if we use other dimension as key.
    // If so, we can't simply check if oldEl is same with newEl. We need a map to check if oldEl is still being used in the new chart.
    // We can't use the elements that already being morphed. Let it keep it's original basic transition.
    for (var i = 0; i < newDiffItems.length; i++) {
      var newItem = newDiffItems[i];
      var el = newItem.data.getItemGraphicEl(newItem.dataIndex);
      if (el) {
        isElementStillInChart[el.id] = true;
      }
    }
  }
  function updateOneToOne(newIndex, oldIndex) {
    var oldItem = oldDiffItems[oldIndex];
    var newItem = newDiffItems[newIndex];
    var newSeries = newItem.data.hostModel;
    // TODO Mark this elements is morphed and don't morph them anymore
    var oldEl = oldItem.data.getItemGraphicEl(oldItem.dataIndex);
    var newEl = newItem.data.getItemGraphicEl(newItem.dataIndex);
    // Can't handle same elements.
    if (oldEl === newEl) {
      newEl && animateElementStyles(newEl, newItem.dataIndex, newSeries);
      return;
    }
    if (
    // We can't use the elements that already being morphed
    oldEl && isElementStillInChart[oldEl.id]) {
      return;
    }
    if (newEl) {
      // TODO: If keep animating the group in case
      // some of the elements don't want to be morphed.
      // TODO Label?
      stopAnimation(newEl);
      if (oldEl) {
        stopAnimation(oldEl);
        // If old element is doing leaving animation. stop it and remove it immediately.
        removeEl(oldEl);
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldEl), getPathList(newEl), newItem.divide, newSeries, newIndex, updateMorphingPathProps);
      } else {
        fadeInElement(newEl, newSeries, newIndex);
      }
    }
    // else keep oldEl leaving animation.
  }

  new DataDiffer/* default */.A(oldDiffItems, newDiffItems, createKeyGetter(true, useId), createKeyGetter(false, useId), null, 'multiple').update(updateOneToOne).updateManyToOne(function (newIndex, oldIndices) {
    var newItem = newDiffItems[newIndex];
    var newData = newItem.data;
    var newSeries = newData.hostModel;
    var newEl = newData.getItemGraphicEl(newItem.dataIndex);
    var oldElsList = (0,util/* filter */.pb)((0,util/* map */.Tj)(oldIndices, function (idx) {
      return oldDiffItems[idx].data.getItemGraphicEl(oldDiffItems[idx].dataIndex);
    }), function (oldEl) {
      return oldEl && oldEl !== newEl && !isElementStillInChart[oldEl.id];
    });
    if (newEl) {
      stopAnimation(newEl);
      if (oldElsList.length) {
        // If old element is doing leaving animation. stop it and remove it immediately.
        (0,util/* each */.__)(oldElsList, function (oldEl) {
          stopAnimation(oldEl);
          removeEl(oldEl);
        });
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldElsList), getPathList(newEl), newItem.divide, newSeries, newIndex, updateMorphingPathProps);
      } else {
        fadeInElement(newEl, newSeries, newItem.dataIndex);
      }
    }
    // else keep oldEl leaving animation.
  }).updateOneToMany(function (newIndices, oldIndex) {
    var oldItem = oldDiffItems[oldIndex];
    var oldEl = oldItem.data.getItemGraphicEl(oldItem.dataIndex);
    // We can't use the elements that already being morphed
    if (oldEl && isElementStillInChart[oldEl.id]) {
      return;
    }
    var newElsList = (0,util/* filter */.pb)((0,util/* map */.Tj)(newIndices, function (idx) {
      return newDiffItems[idx].data.getItemGraphicEl(newDiffItems[idx].dataIndex);
    }), function (el) {
      return el && el !== oldEl;
    });
    var newSeris = newDiffItems[newIndices[0]].data.hostModel;
    if (newElsList.length) {
      (0,util/* each */.__)(newElsList, function (newEl) {
        return stopAnimation(newEl);
      });
      if (oldEl) {
        stopAnimation(oldEl);
        // If old element is doing leaving animation. stop it and remove it immediately.
        removeEl(oldEl);
        hasMorphAnimation = true;
        applyMorphAnimation(getPathList(oldEl), getPathList(newElsList), oldItem.divide,
        // Use divide on old.
        newSeris, newIndices[0], updateMorphingPathProps);
      } else {
        (0,util/* each */.__)(newElsList, function (newEl) {
          return fadeInElement(newEl, newSeris, newIndices[0]);
        });
      }
    }
    // else keep oldEl leaving animation.
  }).updateManyToMany(function (newIndices, oldIndices) {
    // If two data are same and both have groupId.
    // Normally they should be diff by id.
    new DataDiffer/* default */.A(oldIndices, newIndices, function (rawIdx) {
      return oldDiffItems[rawIdx].data.getId(oldDiffItems[rawIdx].dataIndex);
    }, function (rawIdx) {
      return newDiffItems[rawIdx].data.getId(newDiffItems[rawIdx].dataIndex);
    }).update(function (newIndex, oldIndex) {
      // Use the original index
      updateOneToOne(newIndices[newIndex], oldIndices[oldIndex]);
    }).execute();
  }).execute();
  if (hasMorphAnimation) {
    (0,util/* each */.__)(newList, function (_a) {
      var data = _a.data;
      var seriesModel = data.hostModel;
      var view = seriesModel && api.getViewOfSeriesModel(seriesModel);
      var animationCfg = (0,basicTransition/* getAnimationConfig */.Jw)('update', seriesModel, 0); // use 0 index.
      if (view && seriesModel.isAnimationEnabled() && animationCfg && animationCfg.duration > 0) {
        view.group.traverse(function (el) {
          if (el instanceof Path/* default */.Ay && !el.animators.length) {
            // We can't accept there still exists element that has no animation
            // if universalTransition is enabled
            el.animateFrom({
              style: {
                opacity: 0
              }
            }, animationCfg);
          }
        });
      }
    });
  }
}
function getSeriesTransitionKey(series) {
  var seriesKey = series.getModel('universalTransition').get('seriesKey');
  if (!seriesKey) {
    // Use series id by default.
    return series.id;
  }
  return seriesKey;
}
function convertArraySeriesKeyToString(seriesKey) {
  if ((0,util/* isArray */.cy)(seriesKey)) {
    // Order independent.
    return seriesKey.sort().join(',');
  }
  return seriesKey;
}
function getDivideShapeFromData(data) {
  if (data.hostModel) {
    return data.hostModel.getModel('universalTransition').get('divideShape');
  }
}
function findTransitionSeriesBatches(globalStore, params) {
  var updateBatches = (0,util/* createHashMap */.nt)();
  var oldDataMap = (0,util/* createHashMap */.nt)();
  // Map that only store key in array seriesKey.
  // Which is used to query the old data when transition from one to multiple series.
  var oldDataMapForSplit = (0,util/* createHashMap */.nt)();
  (0,util/* each */.__)(globalStore.oldSeries, function (series, idx) {
    var oldDataGroupId = globalStore.oldDataGroupIds[idx];
    var oldData = globalStore.oldData[idx];
    var transitionKey = getSeriesTransitionKey(series);
    var transitionKeyStr = convertArraySeriesKeyToString(transitionKey);
    oldDataMap.set(transitionKeyStr, {
      dataGroupId: oldDataGroupId,
      data: oldData
    });
    if ((0,util/* isArray */.cy)(transitionKey)) {
      // Same key can't in different array seriesKey.
      (0,util/* each */.__)(transitionKey, function (key) {
        oldDataMapForSplit.set(key, {
          key: transitionKeyStr,
          dataGroupId: oldDataGroupId,
          data: oldData
        });
      });
    }
  });
  function checkTransitionSeriesKeyDuplicated(transitionKeyStr) {
    if (updateBatches.get(transitionKeyStr)) {
      (0,log/* warn */.R8)("Duplicated seriesKey in universalTransition " + transitionKeyStr);
    }
  }
  (0,util/* each */.__)(params.updatedSeries, function (series) {
    if (series.isUniversalTransitionEnabled() && series.isAnimationEnabled()) {
      var newDataGroupId = series.get('dataGroupId');
      var newData = series.getData();
      var transitionKey = getSeriesTransitionKey(series);
      var transitionKeyStr = convertArraySeriesKeyToString(transitionKey);
      // Only transition between series with same id.
      var oldData = oldDataMap.get(transitionKeyStr);
      // string transition key is the best match.
      if (oldData) {
        if (false) {}
        // TODO check if data is same?
        updateBatches.set(transitionKeyStr, {
          oldSeries: [{
            dataGroupId: oldData.dataGroupId,
            divide: getDivideShapeFromData(oldData.data),
            data: oldData.data
          }],
          newSeries: [{
            dataGroupId: newDataGroupId,
            divide: getDivideShapeFromData(newData),
            data: newData
          }]
        });
      } else {
        // Transition from multiple series.
        // e.g. 'female', 'male' -> ['female', 'male']
        if ((0,util/* isArray */.cy)(transitionKey)) {
          if (false) {}
          var oldSeries_1 = [];
          (0,util/* each */.__)(transitionKey, function (key) {
            var oldData = oldDataMap.get(key);
            if (oldData.data) {
              oldSeries_1.push({
                dataGroupId: oldData.dataGroupId,
                divide: getDivideShapeFromData(oldData.data),
                data: oldData.data
              });
            }
          });
          if (oldSeries_1.length) {
            updateBatches.set(transitionKeyStr, {
              oldSeries: oldSeries_1,
              newSeries: [{
                dataGroupId: newDataGroupId,
                data: newData,
                divide: getDivideShapeFromData(newData)
              }]
            });
          }
        } else {
          // Try transition to multiple series.
          // e.g. ['female', 'male'] -> 'female', 'male'
          var oldData_1 = oldDataMapForSplit.get(transitionKey);
          if (oldData_1) {
            var batch = updateBatches.get(oldData_1.key);
            if (!batch) {
              batch = {
                oldSeries: [{
                  dataGroupId: oldData_1.dataGroupId,
                  data: oldData_1.data,
                  divide: getDivideShapeFromData(oldData_1.data)
                }],
                newSeries: []
              };
              updateBatches.set(oldData_1.key, batch);
            }
            batch.newSeries.push({
              dataGroupId: newDataGroupId,
              data: newData,
              divide: getDivideShapeFromData(newData)
            });
          }
        }
      }
    }
  });
  return updateBatches;
}
function querySeries(series, finder) {
  for (var i = 0; i < series.length; i++) {
    var found = finder.seriesIndex != null && finder.seriesIndex === series[i].seriesIndex || finder.seriesId != null && finder.seriesId === series[i].id;
    if (found) {
      return i;
    }
  }
}
function transitionSeriesFromOpt(transitionOpt, globalStore, params, api) {
  var from = [];
  var to = [];
  (0,util/* each */.__)((0,model/* normalizeToArray */.qB)(transitionOpt.from), function (finder) {
    var idx = querySeries(globalStore.oldSeries, finder);
    if (idx >= 0) {
      from.push({
        dataGroupId: globalStore.oldDataGroupIds[idx],
        data: globalStore.oldData[idx],
        // TODO can specify divideShape in transition.
        divide: getDivideShapeFromData(globalStore.oldData[idx]),
        groupIdDim: finder.dimension
      });
    }
  });
  (0,util/* each */.__)((0,model/* normalizeToArray */.qB)(transitionOpt.to), function (finder) {
    var idx = querySeries(params.updatedSeries, finder);
    if (idx >= 0) {
      var data = params.updatedSeries[idx].getData();
      to.push({
        dataGroupId: globalStore.oldDataGroupIds[idx],
        data: data,
        divide: getDivideShapeFromData(data),
        groupIdDim: finder.dimension
      });
    }
  });
  if (from.length > 0 && to.length > 0) {
    transitionBetween(from, to, api);
  }
}
function installUniversalTransition(registers) {
  registers.registerUpdateLifecycle('series:beforeupdate', function (ecMOdel, api, params) {
    (0,util/* each */.__)((0,model/* normalizeToArray */.qB)(params.seriesTransition), function (transOpt) {
      (0,util/* each */.__)((0,model/* normalizeToArray */.qB)(transOpt.to), function (finder) {
        var series = params.updatedSeries;
        for (var i = 0; i < series.length; i++) {
          if (finder.seriesIndex != null && finder.seriesIndex === series[i].seriesIndex || finder.seriesId != null && finder.seriesId === series[i].id) {
            series[i][Series/* SERIES_UNIVERSAL_TRANSITION_PROP */.U] = true;
          }
        }
      });
    });
  });
  registers.registerUpdateLifecycle('series:transition', function (ecModel, api, params) {
    // TODO api provide an namespace that can save stuff per instance
    var globalStore = getUniversalTransitionGlobalStore(api);
    // TODO multiple to multiple series.
    if (globalStore.oldSeries && params.updatedSeries && params.optionChanged) {
      // TODO transitionOpt was used in an old implementation and can be removed now
      // Use give transition config if its' give;
      var transitionOpt = params.seriesTransition;
      if (transitionOpt) {
        (0,util/* each */.__)((0,model/* normalizeToArray */.qB)(transitionOpt), function (opt) {
          transitionSeriesFromOpt(opt, globalStore, params, api);
        });
      } else {
        // Else guess from series based on transition series key.
        var updateBatches_1 = findTransitionSeriesBatches(globalStore, params);
        (0,util/* each */.__)(updateBatches_1.keys(), function (key) {
          var batch = updateBatches_1.get(key);
          transitionBetween(batch.oldSeries, batch.newSeries, api);
        });
      }
      // Reset
      (0,util/* each */.__)(params.updatedSeries, function (series) {
        // Reset;
        if (series[Series/* SERIES_UNIVERSAL_TRANSITION_PROP */.U]) {
          series[Series/* SERIES_UNIVERSAL_TRANSITION_PROP */.U] = false;
        }
      });
    }
    // Save all series of current update. Not only the updated one.
    var allSeries = ecModel.getSeries();
    var savedSeries = globalStore.oldSeries = [];
    var savedDataGroupIds = globalStore.oldDataGroupIds = [];
    var savedData = globalStore.oldData = [];
    for (var i = 0; i < allSeries.length; i++) {
      var data = allSeries[i].getData();
      // Only save the data that can have transition.
      // Avoid large data costing too much extra memory
      if (data.count() < DATA_COUNT_THRESHOLD) {
        savedSeries.push(allSeries[i]);
        savedDataGroupIds.push(allSeries[i].get('dataGroupId'));
        savedData.push(data);
      }
    }
  });
}
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/innerStore.js
var innerStore = __webpack_require__(69622);
// EXTERNAL MODULE: ./node_modules/echarts/lib/util/number.js
var number = __webpack_require__(24326);
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/labelGuideHelper.js
var labelGuideHelper = __webpack_require__(92621);
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/labelLayoutHelper.js
var labelLayoutHelper = __webpack_require__(77175);
// EXTERNAL MODULE: ./node_modules/echarts/lib/label/labelStyle.js
var labelStyle = __webpack_require__(89632);
// EXTERNAL MODULE: ./node_modules/zrender/lib/contain/util.js
var contain_util = __webpack_require__(41589);
;// ./node_modules/echarts/lib/label/LabelManager.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// TODO: move labels out of viewport.










function cloneArr(points) {
  if (points) {
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
      newPoints.push(points[i].slice());
    }
    return newPoints;
  }
}
function prepareLayoutCallbackParams(labelItem, hostEl) {
  var label = labelItem.label;
  var labelLine = hostEl && hostEl.getTextGuideLine();
  return {
    dataIndex: labelItem.dataIndex,
    dataType: labelItem.dataType,
    seriesIndex: labelItem.seriesModel.seriesIndex,
    text: labelItem.label.style.text,
    rect: labelItem.hostRect,
    labelRect: labelItem.rect,
    // x: labelAttr.x,
    // y: labelAttr.y,
    align: label.style.align,
    verticalAlign: label.style.verticalAlign,
    labelLinePoints: cloneArr(labelLine && labelLine.shape.points)
  };
}
var LABEL_OPTION_TO_STYLE_KEYS = ['align', 'verticalAlign', 'width', 'height', 'fontSize'];
var dummyTransformable = new Transformable/* default */.Ay();
var labelLayoutInnerStore = (0,model/* makeInner */.$r)();
var labelLineAnimationStore = (0,model/* makeInner */.$r)();
function extendWithKeys(target, source, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (source[key] != null) {
      target[key] = source[key];
    }
  }
}
var LABEL_LAYOUT_PROPS = ['x', 'y', 'rotation'];
var LabelManager = /** @class */function () {
  function LabelManager() {
    this._labelList = [];
    this._chartViewList = [];
  }
  LabelManager.prototype.clearLabels = function () {
    this._labelList = [];
    this._chartViewList = [];
  };
  /**
   * Add label to manager
   */
  LabelManager.prototype._addLabel = function (dataIndex, dataType, seriesModel, label, layoutOption) {
    var labelStyle = label.style;
    var hostEl = label.__hostTarget;
    var textConfig = hostEl.textConfig || {};
    // TODO: If label is in other state.
    var labelTransform = label.getComputedTransform();
    var labelRect = label.getBoundingRect().plain();
    BoundingRect/* default */.A.applyTransform(labelRect, labelRect, labelTransform);
    if (labelTransform) {
      dummyTransformable.setLocalTransform(labelTransform);
    } else {
      // Identity transform.
      dummyTransformable.x = dummyTransformable.y = dummyTransformable.rotation = dummyTransformable.originX = dummyTransformable.originY = 0;
      dummyTransformable.scaleX = dummyTransformable.scaleY = 1;
    }
    dummyTransformable.rotation = (0,contain_util/* normalizeRadian */.n)(dummyTransformable.rotation);
    var host = label.__hostTarget;
    var hostRect;
    if (host) {
      hostRect = host.getBoundingRect().plain();
      var transform = host.getComputedTransform();
      BoundingRect/* default */.A.applyTransform(hostRect, hostRect, transform);
    }
    var labelGuide = hostRect && host.getTextGuideLine();
    this._labelList.push({
      label: label,
      labelLine: labelGuide,
      seriesModel: seriesModel,
      dataIndex: dataIndex,
      dataType: dataType,
      layoutOption: layoutOption,
      computedLayoutOption: null,
      rect: labelRect,
      hostRect: hostRect,
      // Label with lower priority will be hidden when overlapped
      // Use rect size as default priority
      priority: hostRect ? hostRect.width * hostRect.height : 0,
      // Save default label attributes.
      // For restore if developers want get back to default value in callback.
      defaultAttr: {
        ignore: label.ignore,
        labelGuideIgnore: labelGuide && labelGuide.ignore,
        x: dummyTransformable.x,
        y: dummyTransformable.y,
        scaleX: dummyTransformable.scaleX,
        scaleY: dummyTransformable.scaleY,
        rotation: dummyTransformable.rotation,
        style: {
          x: labelStyle.x,
          y: labelStyle.y,
          align: labelStyle.align,
          verticalAlign: labelStyle.verticalAlign,
          width: labelStyle.width,
          height: labelStyle.height,
          fontSize: labelStyle.fontSize
        },
        cursor: label.cursor,
        attachedPos: textConfig.position,
        attachedRot: textConfig.rotation
      }
    });
  };
  LabelManager.prototype.addLabelsOfSeries = function (chartView) {
    var _this = this;
    this._chartViewList.push(chartView);
    var seriesModel = chartView.__model;
    var layoutOption = seriesModel.get('labelLayout');
    /**
     * Ignore layouting if it's not specified anything.
     */
    if (!((0,util/* isFunction */.Tn)(layoutOption) || (0,util/* keys */.HP)(layoutOption).length)) {
      return;
    }
    chartView.group.traverse(function (child) {
      if (child.ignore) {
        return true; // Stop traverse descendants.
      }
      // Only support label being hosted on graphic elements.
      var textEl = child.getTextContent();
      var ecData = (0,innerStore/* getECData */.z)(child);
      // Can only attach the text on the element with dataIndex
      if (textEl && !textEl.disableLabelLayout) {
        _this._addLabel(ecData.dataIndex, ecData.dataType, seriesModel, textEl, layoutOption);
      }
    });
  };
  LabelManager.prototype.updateLayoutConfig = function (api) {
    var width = api.getWidth();
    var height = api.getHeight();
    function createDragHandler(el, labelLineModel) {
      return function () {
        (0,labelGuideHelper/* updateLabelLinePoints */.lB)(el, labelLineModel);
      };
    }
    for (var i = 0; i < this._labelList.length; i++) {
      var labelItem = this._labelList[i];
      var label = labelItem.label;
      var hostEl = label.__hostTarget;
      var defaultLabelAttr = labelItem.defaultAttr;
      var layoutOption = void 0;
      // TODO A global layout option?
      if ((0,util/* isFunction */.Tn)(labelItem.layoutOption)) {
        layoutOption = labelItem.layoutOption(prepareLayoutCallbackParams(labelItem, hostEl));
      } else {
        layoutOption = labelItem.layoutOption;
      }
      layoutOption = layoutOption || {};
      labelItem.computedLayoutOption = layoutOption;
      var degreeToRadian = Math.PI / 180;
      // TODO hostEl should always exists.
      // Or label should not have parent because the x, y is all in global space.
      if (hostEl) {
        hostEl.setTextConfig({
          // Force to set local false.
          local: false,
          // Ignore position and rotation config on the host el if x or y is changed.
          position: layoutOption.x != null || layoutOption.y != null ? null : defaultLabelAttr.attachedPos,
          // Ignore rotation config on the host el if rotation is changed.
          rotation: layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.attachedRot,
          offset: [layoutOption.dx || 0, layoutOption.dy || 0]
        });
      }
      var needsUpdateLabelLine = false;
      if (layoutOption.x != null) {
        // TODO width of chart view.
        label.x = (0,number/* parsePercent */.lo)(layoutOption.x, width);
        label.setStyle('x', 0); // Ignore movement in style. TODO: origin.
        needsUpdateLabelLine = true;
      } else {
        label.x = defaultLabelAttr.x;
        label.setStyle('x', defaultLabelAttr.style.x);
      }
      if (layoutOption.y != null) {
        // TODO height of chart view.
        label.y = (0,number/* parsePercent */.lo)(layoutOption.y, height);
        label.setStyle('y', 0); // Ignore movement in style.
        needsUpdateLabelLine = true;
      } else {
        label.y = defaultLabelAttr.y;
        label.setStyle('y', defaultLabelAttr.style.y);
      }
      if (layoutOption.labelLinePoints) {
        var guideLine = hostEl.getTextGuideLine();
        if (guideLine) {
          guideLine.setShape({
            points: layoutOption.labelLinePoints
          });
          // Not update
          needsUpdateLabelLine = false;
        }
      }
      var labelLayoutStore = labelLayoutInnerStore(label);
      labelLayoutStore.needsUpdateLabelLine = needsUpdateLabelLine;
      label.rotation = layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.rotation;
      label.scaleX = defaultLabelAttr.scaleX;
      label.scaleY = defaultLabelAttr.scaleY;
      for (var k = 0; k < LABEL_OPTION_TO_STYLE_KEYS.length; k++) {
        var key = LABEL_OPTION_TO_STYLE_KEYS[k];
        label.setStyle(key, layoutOption[key] != null ? layoutOption[key] : defaultLabelAttr.style[key]);
      }
      if (layoutOption.draggable) {
        label.draggable = true;
        label.cursor = 'move';
        if (hostEl) {
          var hostModel = labelItem.seriesModel;
          if (labelItem.dataIndex != null) {
            var data = labelItem.seriesModel.getData(labelItem.dataType);
            hostModel = data.getItemModel(labelItem.dataIndex);
          }
          label.on('drag', createDragHandler(hostEl, hostModel.getModel('labelLine')));
        }
      } else {
        // TODO Other drag functions?
        label.off('drag');
        label.cursor = defaultLabelAttr.cursor;
      }
    }
  };
  LabelManager.prototype.layout = function (api) {
    var width = api.getWidth();
    var height = api.getHeight();
    var labelList = (0,labelLayoutHelper/* prepareLayoutList */.os)(this._labelList);
    var labelsNeedsAdjustOnX = (0,util/* filter */.pb)(labelList, function (item) {
      return item.layoutOption.moveOverlap === 'shiftX';
    });
    var labelsNeedsAdjustOnY = (0,util/* filter */.pb)(labelList, function (item) {
      return item.layoutOption.moveOverlap === 'shiftY';
    });
    (0,labelLayoutHelper/* shiftLayoutOnX */.QX)(labelsNeedsAdjustOnX, 0, width);
    (0,labelLayoutHelper/* shiftLayoutOnY */.Xe)(labelsNeedsAdjustOnY, 0, height);
    var labelsNeedsHideOverlap = (0,util/* filter */.pb)(labelList, function (item) {
      return item.layoutOption.hideOverlap;
    });
    (0,labelLayoutHelper/* hideOverlap */.If)(labelsNeedsHideOverlap);
  };
  /**
   * Process all labels. Not only labels with layoutOption.
   */
  LabelManager.prototype.processLabelsOverall = function () {
    var _this = this;
    (0,util/* each */.__)(this._chartViewList, function (chartView) {
      var seriesModel = chartView.__model;
      var ignoreLabelLineUpdate = chartView.ignoreLabelLineUpdate;
      var animationEnabled = seriesModel.isAnimationEnabled();
      chartView.group.traverse(function (child) {
        if (child.ignore && !child.forceLabelAnimation) {
          return true; // Stop traverse descendants.
        }

        var needsUpdateLabelLine = !ignoreLabelLineUpdate;
        var label = child.getTextContent();
        if (!needsUpdateLabelLine && label) {
          needsUpdateLabelLine = labelLayoutInnerStore(label).needsUpdateLabelLine;
        }
        if (needsUpdateLabelLine) {
          _this._updateLabelLine(child, seriesModel);
        }
        if (animationEnabled) {
          _this._animateLabels(child, seriesModel);
        }
      });
    });
  };
  LabelManager.prototype._updateLabelLine = function (el, seriesModel) {
    // Only support label being hosted on graphic elements.
    var textEl = el.getTextContent();
    // Update label line style.
    var ecData = (0,innerStore/* getECData */.z)(el);
    var dataIndex = ecData.dataIndex;
    // Only support labelLine on the labels represent data.
    if (textEl && dataIndex != null) {
      var data = seriesModel.getData(ecData.dataType);
      var itemModel = data.getItemModel(dataIndex);
      var defaultStyle = {};
      var visualStyle = data.getItemVisual(dataIndex, 'style');
      if (visualStyle) {
        var visualType = data.getVisual('drawType');
        // Default to be same with main color
        defaultStyle.stroke = visualStyle[visualType];
      }
      var labelLineModel = itemModel.getModel('labelLine');
      (0,labelGuideHelper/* setLabelLineStyle */.eR)(el, (0,labelGuideHelper/* getLabelLineStatesModels */.rv)(itemModel), defaultStyle);
      (0,labelGuideHelper/* updateLabelLinePoints */.lB)(el, labelLineModel);
    }
  };
  LabelManager.prototype._animateLabels = function (el, seriesModel) {
    var textEl = el.getTextContent();
    var guideLine = el.getTextGuideLine();
    // Animate
    if (textEl
    // `forceLabelAnimation` has the highest priority
    && (el.forceLabelAnimation || !textEl.ignore && !textEl.invisible && !el.disableLabelAnimation && !(0,basicTransition/* isElementRemoved */.LR)(el))) {
      var layoutStore = labelLayoutInnerStore(textEl);
      var oldLayout = layoutStore.oldLayout;
      var ecData = (0,innerStore/* getECData */.z)(el);
      var dataIndex = ecData.dataIndex;
      var newProps = {
        x: textEl.x,
        y: textEl.y,
        rotation: textEl.rotation
      };
      var data = seriesModel.getData(ecData.dataType);
      if (!oldLayout) {
        textEl.attr(newProps);
        // Disable fade in animation if value animation is enabled.
        if (!(0,labelStyle/* labelInner */.Lu)(textEl).valueAnimation) {
          var oldOpacity = (0,util/* retrieve2 */.bZ)(textEl.style.opacity, 1);
          // Fade in animation
          textEl.style.opacity = 0;
          (0,basicTransition/* initProps */.LW)(textEl, {
            style: {
              opacity: oldOpacity
            }
          }, seriesModel, dataIndex);
        }
      } else {
        textEl.attr(oldLayout);
        // Make sure the animation from is in the right status.
        var prevStates = el.prevStates;
        if (prevStates) {
          if ((0,util/* indexOf */.qh)(prevStates, 'select') >= 0) {
            textEl.attr(layoutStore.oldLayoutSelect);
          }
          if ((0,util/* indexOf */.qh)(prevStates, 'emphasis') >= 0) {
            textEl.attr(layoutStore.oldLayoutEmphasis);
          }
        }
        (0,basicTransition/* updateProps */.oi)(textEl, newProps, seriesModel, dataIndex);
      }
      layoutStore.oldLayout = newProps;
      if (textEl.states.select) {
        var layoutSelect = layoutStore.oldLayoutSelect = {};
        extendWithKeys(layoutSelect, newProps, LABEL_LAYOUT_PROPS);
        extendWithKeys(layoutSelect, textEl.states.select, LABEL_LAYOUT_PROPS);
      }
      if (textEl.states.emphasis) {
        var layoutEmphasis = layoutStore.oldLayoutEmphasis = {};
        extendWithKeys(layoutEmphasis, newProps, LABEL_LAYOUT_PROPS);
        extendWithKeys(layoutEmphasis, textEl.states.emphasis, LABEL_LAYOUT_PROPS);
      }
      (0,labelStyle/* animateLabelValue */.xb)(textEl, dataIndex, data, seriesModel, seriesModel);
    }
    if (guideLine && !guideLine.ignore && !guideLine.invisible) {
      var layoutStore = labelLineAnimationStore(guideLine);
      var oldLayout = layoutStore.oldLayout;
      var newLayout = {
        points: guideLine.shape.points
      };
      if (!oldLayout) {
        guideLine.setShape(newLayout);
        guideLine.style.strokePercent = 0;
        (0,basicTransition/* initProps */.LW)(guideLine, {
          style: {
            strokePercent: 1
          }
        }, seriesModel);
      } else {
        guideLine.attr({
          shape: oldLayout
        });
        (0,basicTransition/* updateProps */.oi)(guideLine, {
          shape: newLayout
        }, seriesModel);
      }
      layoutStore.oldLayout = newLayout;
    }
  };
  return LabelManager;
}();
/* harmony default export */ const label_LabelManager = (LabelManager);
;// ./node_modules/echarts/lib/label/installLabelLayout.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


var getLabelManager = (0,model/* makeInner */.$r)();
function installLabelLayout(registers) {
  registers.registerUpdateLifecycle('series:beforeupdate', function (ecModel, api, params) {
    // TODO api provide an namespace that can save stuff per instance
    var labelManager = getLabelManager(api).labelManager;
    if (!labelManager) {
      labelManager = getLabelManager(api).labelManager = new label_LabelManager();
    }
    labelManager.clearLabels();
  });
  registers.registerUpdateLifecycle('series:layoutlabels', function (ecModel, api, params) {
    var labelManager = getLabelManager(api).labelManager;
    params.updatedSeries.forEach(function (series) {
      labelManager.addLabelsOfSeries(api.getViewOfSeriesModel(series));
    });
    labelManager.updateLayoutConfig(api);
    labelManager.layout(api);
    labelManager.processLabelsOverall();
  });
}
;// ./node_modules/echarts/lib/export/features.js

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Module that exports complex but fancy features.


;// ./node_modules/echarts/features.js
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/***/ }),

/***/ 16563:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function dataIndexMapValueLength(valNumOrArrLengthMoreThan2) {
  return valNumOrArrLengthMoreThan2 == null ? 0 : valNumOrArrLengthMoreThan2.length || 1;
}
function defaultKeyGetter(item) {
  return item;
}
var DataDiffer = /** @class */function () {
  /**
   * @param context Can be visited by this.context in callback.
   */
  function DataDiffer(oldArr, newArr, oldKeyGetter, newKeyGetter, context,
  // By default: 'oneToOne'.
  diffMode) {
    this._old = oldArr;
    this._new = newArr;
    this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
    this._newKeyGetter = newKeyGetter || defaultKeyGetter;
    // Visible in callback via `this.context`;
    this.context = context;
    this._diffModeMultiple = diffMode === 'multiple';
  }
  /**
   * Callback function when add a data
   */
  DataDiffer.prototype.add = function (func) {
    this._add = func;
    return this;
  };
  /**
   * Callback function when update a data
   */
  DataDiffer.prototype.update = function (func) {
    this._update = func;
    return this;
  };
  /**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
  DataDiffer.prototype.updateManyToOne = function (func) {
    this._updateManyToOne = func;
    return this;
  };
  /**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
  DataDiffer.prototype.updateOneToMany = function (func) {
    this._updateOneToMany = func;
    return this;
  };
  /**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
  DataDiffer.prototype.updateManyToMany = function (func) {
    this._updateManyToMany = func;
    return this;
  };
  /**
   * Callback function when remove a data
   */
  DataDiffer.prototype.remove = function (func) {
    this._remove = func;
    return this;
  };
  DataDiffer.prototype.execute = function () {
    this[this._diffModeMultiple ? '_executeMultiple' : '_executeOneToOne']();
  };
  DataDiffer.prototype._executeOneToOne = function () {
    var oldArr = this._old;
    var newArr = this._new;
    var newDataIndexMap = {};
    var oldDataKeyArr = new Array(oldArr.length);
    var newDataKeyArr = new Array(newArr.length);
    this._initIndexMap(oldArr, null, oldDataKeyArr, '_oldKeyGetter');
    this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter');
    for (var i = 0; i < oldArr.length; i++) {
      var oldKey = oldDataKeyArr[i];
      var newIdxMapVal = newDataIndexMap[oldKey];
      var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);
      // idx can never be empty array here. see 'set null' logic below.
      if (newIdxMapValLen > 1) {
        // Consider there is duplicate key (for example, use dataItem.name as key).
        // We should make sure every item in newArr and oldArr can be visited.
        var newIdx = newIdxMapVal.shift();
        if (newIdxMapVal.length === 1) {
          newDataIndexMap[oldKey] = newIdxMapVal[0];
        }
        this._update && this._update(newIdx, i);
      } else if (newIdxMapValLen === 1) {
        newDataIndexMap[oldKey] = null;
        this._update && this._update(newIdxMapVal, i);
      } else {
        this._remove && this._remove(i);
      }
    }
    this._performRestAdd(newDataKeyArr, newDataIndexMap);
  };
  /**
   * For example, consider the case:
   * oldData: [o0, o1, o2, o3, o4, o5, o6, o7],
   * newData: [n0, n1, n2, n3, n4, n5, n6, n7, n8],
   * Where:
   *     o0, o1, n0 has key 'a' (many to one)
   *     o5, n4, n5, n6 has key 'b' (one to many)
   *     o2, n1 has key 'c' (one to one)
   *     n2, n3 has key 'd' (add)
   *     o3, o4 has key 'e' (remove)
   *     o6, o7, n7, n8 has key 'f' (many to many, treated as add and remove)
   * Then:
   *     (The order of the following directives are not ensured.)
   *     this._updateManyToOne(n0, [o0, o1]);
   *     this._updateOneToMany([n4, n5, n6], o5);
   *     this._update(n1, o2);
   *     this._remove(o3);
   *     this._remove(o4);
   *     this._remove(o6);
   *     this._remove(o7);
   *     this._add(n2);
   *     this._add(n3);
   *     this._add(n7);
   *     this._add(n8);
   */
  DataDiffer.prototype._executeMultiple = function () {
    var oldArr = this._old;
    var newArr = this._new;
    var oldDataIndexMap = {};
    var newDataIndexMap = {};
    var oldDataKeyArr = [];
    var newDataKeyArr = [];
    this._initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, '_oldKeyGetter');
    this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter');
    for (var i = 0; i < oldDataKeyArr.length; i++) {
      var oldKey = oldDataKeyArr[i];
      var oldIdxMapVal = oldDataIndexMap[oldKey];
      var newIdxMapVal = newDataIndexMap[oldKey];
      var oldIdxMapValLen = dataIndexMapValueLength(oldIdxMapVal);
      var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);
      if (oldIdxMapValLen > 1 && newIdxMapValLen === 1) {
        this._updateManyToOne && this._updateManyToOne(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen === 1 && newIdxMapValLen > 1) {
        this._updateOneToMany && this._updateOneToMany(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen === 1 && newIdxMapValLen === 1) {
        this._update && this._update(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen > 1 && newIdxMapValLen > 1) {
        this._updateManyToMany && this._updateManyToMany(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen > 1) {
        for (var i_1 = 0; i_1 < oldIdxMapValLen; i_1++) {
          this._remove && this._remove(oldIdxMapVal[i_1]);
        }
      } else {
        this._remove && this._remove(oldIdxMapVal);
      }
    }
    this._performRestAdd(newDataKeyArr, newDataIndexMap);
  };
  DataDiffer.prototype._performRestAdd = function (newDataKeyArr, newDataIndexMap) {
    for (var i = 0; i < newDataKeyArr.length; i++) {
      var newKey = newDataKeyArr[i];
      var newIdxMapVal = newDataIndexMap[newKey];
      var idxMapValLen = dataIndexMapValueLength(newIdxMapVal);
      if (idxMapValLen > 1) {
        for (var j = 0; j < idxMapValLen; j++) {
          this._add && this._add(newIdxMapVal[j]);
        }
      } else if (idxMapValLen === 1) {
        this._add && this._add(newIdxMapVal);
      }
      // Support both `newDataKeyArr` are duplication removed or not removed.
      newDataIndexMap[newKey] = null;
    }
  };
  DataDiffer.prototype._initIndexMap = function (arr,
  // Can be null.
  map,
  // In 'byKey', the output `keyArr` is duplication removed.
  // In 'byIndex', the output `keyArr` is not duplication removed and
  //     its indices are accurately corresponding to `arr`.
  keyArr, keyGetterName) {
    var cbModeMultiple = this._diffModeMultiple;
    for (var i = 0; i < arr.length; i++) {
      // Add prefix to avoid conflict with Object.prototype.
      var key = '_ec_' + this[keyGetterName](arr[i], i);
      if (!cbModeMultiple) {
        keyArr[i] = key;
      }
      if (!map) {
        continue;
      }
      var idxMapVal = map[key];
      var idxMapValLen = dataIndexMapValueLength(idxMapVal);
      if (idxMapValLen === 0) {
        // Simple optimize: in most cases, one index has one key,
        // do not need array.
        map[key] = i;
        if (cbModeMultiple) {
          keyArr.push(key);
        }
      } else if (idxMapValLen === 1) {
        map[key] = [idxMapVal, i];
      } else {
        idxMapVal.push(i);
      }
    }
  };
  return DataDiffer;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataDiffer);

/***/ }),

/***/ 92621:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QK: () => (/* binding */ limitSurfaceAngle),
/* harmony export */   YI: () => (/* binding */ limitTurnAngle),
/* harmony export */   eR: () => (/* binding */ setLabelLineStyle),
/* harmony export */   lB: () => (/* binding */ updateLabelLinePoints),
/* harmony export */   rv: () => (/* binding */ getLabelLineStatesModels)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26346);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5070);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(39195);
/* harmony import */ var zrender_lib_core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68717);
/* harmony import */ var zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41589);
/* harmony import */ var zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89259);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(98026);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45587);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83509);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34833);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/








var PI2 = Math.PI * 2;
var CMD = zrender_lib_core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.CMD;
var DEFAULT_SEARCH_SPACE = ['top', 'right', 'bottom', 'left'];
function getCandidateAnchor(pos, distance, rect, outPt, outDir) {
  var width = rect.width;
  var height = rect.height;
  switch (pos) {
    case 'top':
      outPt.set(rect.x + width / 2, rect.y - distance);
      outDir.set(0, -1);
      break;
    case 'bottom':
      outPt.set(rect.x + width / 2, rect.y + height + distance);
      outDir.set(0, 1);
      break;
    case 'left':
      outPt.set(rect.x - distance, rect.y + height / 2);
      outDir.set(-1, 0);
      break;
    case 'right':
      outPt.set(rect.x + width + distance, rect.y + height / 2);
      outDir.set(1, 0);
      break;
  }
}
function projectPointToArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y, out) {
  x -= cx;
  y -= cy;
  var d = Math.sqrt(x * x + y * y);
  x /= d;
  y /= d;
  // Intersect point.
  var ox = x * r + cx;
  var oy = y * r + cy;
  if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
    // Is a circle
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(endAngle);
    endAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(tmp);
  } else {
    startAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(startAngle);
    endAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI2;
  }
  var angle = Math.atan2(y, x);
  if (angle < 0) {
    angle += PI2;
  }
  if (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) {
    // Project point is on the arc.
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  var x1 = r * Math.cos(startAngle) + cx;
  var y1 = r * Math.sin(startAngle) + cy;
  var x2 = r * Math.cos(endAngle) + cx;
  var y2 = r * Math.sin(endAngle) + cy;
  var d1 = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
  var d2 = (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y);
  if (d1 < d2) {
    out[0] = x1;
    out[1] = y1;
    return Math.sqrt(d1);
  } else {
    out[0] = x2;
    out[1] = y2;
    return Math.sqrt(d2);
  }
}
function projectPointToLine(x1, y1, x2, y2, x, y, out, limitToEnds) {
  var dx = x - x1;
  var dy = y - y1;
  var dx1 = x2 - x1;
  var dy1 = y2 - y1;
  var lineLen = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  dx1 /= lineLen;
  dy1 /= lineLen;
  // dot product
  var projectedLen = dx * dx1 + dy * dy1;
  var t = projectedLen / lineLen;
  if (limitToEnds) {
    t = Math.min(Math.max(t, 0), 1);
  }
  t *= lineLen;
  var ox = out[0] = x1 + t * dx1;
  var oy = out[1] = y1 + t * dy1;
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
function projectPointToRect(x1, y1, width, height, x, y, out) {
  if (width < 0) {
    x1 = x1 + width;
    width = -width;
  }
  if (height < 0) {
    y1 = y1 + height;
    height = -height;
  }
  var x2 = x1 + width;
  var y2 = y1 + height;
  var ox = out[0] = Math.min(Math.max(x, x1), x2);
  var oy = out[1] = Math.min(Math.max(y, y1), y2);
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
var tmpPt = [];
function nearestPointOnRect(pt, rect, out) {
  var dist = projectPointToRect(rect.x, rect.y, rect.width, rect.height, pt.x, pt.y, tmpPt);
  out.set(tmpPt[0], tmpPt[1]);
  return dist;
}
/**
 * Calculate min distance corresponding point.
 * This method won't evaluate if point is in the path.
 */
function nearestPointOnPath(pt, path, out) {
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  var x1;
  var y1;
  var minDist = Infinity;
  var data = path.data;
  var x = pt.x;
  var y = pt.y;
  for (var i = 0; i < data.length;) {
    var cmd = data[i++];
    if (i === 1) {
      xi = data[i];
      yi = data[i + 1];
      x0 = xi;
      y0 = yi;
    }
    var d = minDist;
    switch (cmd) {
      case CMD.M:
        // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
        // 在 closePath 的时候使用
        x0 = data[i++];
        y0 = data[i++];
        xi = x0;
        yi = y0;
        break;
      case CMD.L:
        d = projectPointToLine(xi, yi, data[i], data[i + 1], x, y, tmpPt, true);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.C:
        d = (0,zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__/* .cubicProjectPoint */ .Et)(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.Q:
        d = (0,zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__/* .quadraticProjectPoint */ .kh)(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.A:
        // TODO Arc 判断的开销比较大
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        // TODO Arc 旋转
        i += 1;
        var anticlockwise = !!(1 - data[i++]);
        x1 = Math.cos(theta) * rx + cx;
        y1 = Math.sin(theta) * ry + cy;
        // 不是直接使用 arc 命令
        if (i <= 1) {
          // 第一个命令起点还未定义
          x0 = x1;
          y0 = y1;
        }
        // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
        var _x = (x - cx) * ry / rx + cx;
        d = projectPointToArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y, tmpPt);
        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;
      case CMD.R:
        x0 = xi = data[i++];
        y0 = yi = data[i++];
        var width = data[i++];
        var height = data[i++];
        d = projectPointToRect(x0, y0, width, height, x, y, tmpPt);
        break;
      case CMD.Z:
        d = projectPointToLine(xi, yi, x0, y0, x, y, tmpPt, true);
        xi = x0;
        yi = y0;
        break;
    }
    if (d < minDist) {
      minDist = d;
      out.set(tmpPt[0], tmpPt[1]);
    }
  }
  return minDist;
}
// Temporal variable for intermediate usage.
var pt0 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var pt1 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var pt2 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var dir = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var dir2 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
/**
 * Calculate a proper guide line based on the label position and graphic element definition
 * @param label
 * @param labelRect
 * @param target
 * @param targetRect
 */
function updateLabelLinePoints(target, labelLineModel) {
  if (!target) {
    return;
  }
  var labelLine = target.getTextGuideLine();
  var label = target.getTextContent();
  // Needs to create text guide in each charts.
  if (!(label && labelLine)) {
    return;
  }
  var labelGuideConfig = target.textGuideLineConfig || {};
  var points = [[0, 0], [0, 0], [0, 0]];
  var searchSpace = labelGuideConfig.candidates || DEFAULT_SEARCH_SPACE;
  var labelRect = label.getBoundingRect().clone();
  labelRect.applyTransform(label.getComputedTransform());
  var minDist = Infinity;
  var anchorPoint = labelGuideConfig.anchor;
  var targetTransform = target.getComputedTransform();
  var targetInversedTransform = targetTransform && (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__/* .invert */ .B8)([], targetTransform);
  var len = labelLineModel.get('length2') || 0;
  if (anchorPoint) {
    pt2.copy(anchorPoint);
  }
  for (var i = 0; i < searchSpace.length; i++) {
    var candidate = searchSpace[i];
    getCandidateAnchor(candidate, 0, labelRect, pt0, dir);
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.scaleAndAdd(pt1, pt0, dir, len);
    // Transform to target coord space.
    pt1.transform(targetInversedTransform);
    // Note: getBoundingRect will ensure the `path` being created.
    var boundingRect = target.getBoundingRect();
    var dist = anchorPoint ? anchorPoint.distance(pt1) : target instanceof _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay ? nearestPointOnPath(pt1, target.path, pt2) : nearestPointOnRect(pt1, boundingRect, pt2);
    // TODO pt2 is in the path
    if (dist < minDist) {
      minDist = dist;
      // Transform back to global space.
      pt1.transform(targetTransform);
      pt2.transform(targetTransform);
      pt2.toArray(points[0]);
      pt1.toArray(points[1]);
      pt0.toArray(points[2]);
    }
  }
  limitTurnAngle(points, labelLineModel.get('minTurnAngle'));
  labelLine.setShape({
    points: points
  });
}
// Temporal variable for the limitTurnAngle function
var tmpArr = [];
var tmpProjPoint = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
/**
 * Reduce the line segment attached to the label to limit the turn angle between two segments.
 * @param linePoints
 * @param minTurnAngle Radian of minimum turn angle. 0 - 180
 */
function limitTurnAngle(linePoints, minTurnAngle) {
  if (!(minTurnAngle <= 180 && minTurnAngle > 0)) {
    return;
  }
  minTurnAngle = minTurnAngle / 180 * Math.PI;
  // The line points can be
  //      /pt1----pt2 (label)
  //     /
  // pt0/
  pt0.fromArray(linePoints[0]);
  pt1.fromArray(linePoints[1]);
  pt2.fromArray(linePoints[2]);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir, pt0, pt1);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir2, pt2, pt1);
  var len1 = dir.len();
  var len2 = dir2.len();
  if (len1 < 1e-3 || len2 < 1e-3) {
    return;
  }
  dir.scale(1 / len1);
  dir2.scale(1 / len2);
  var angleCos = dir.dot(dir2);
  var minTurnAngleCos = Math.cos(minTurnAngle);
  if (minTurnAngleCos < angleCos) {
    // Smaller than minTurnAngle
    // Calculate project point of pt0 on pt1-pt2
    var d = projectPointToLine(pt1.x, pt1.y, pt2.x, pt2.y, pt0.x, pt0.y, tmpArr, false);
    tmpProjPoint.fromArray(tmpArr);
    // Calculate new projected length with limited minTurnAngle and get the new connect point
    tmpProjPoint.scaleAndAdd(dir2, d / Math.tan(Math.PI - minTurnAngle));
    // Limit the new calculated connect point between pt1 and pt2.
    var t = pt2.x !== pt1.x ? (tmpProjPoint.x - pt1.x) / (pt2.x - pt1.x) : (tmpProjPoint.y - pt1.y) / (pt2.y - pt1.y);
    if (isNaN(t)) {
      return;
    }
    if (t < 0) {
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt1);
    } else if (t > 1) {
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
    }
    tmpProjPoint.toArray(linePoints[1]);
  }
}
/**
 * Limit the angle of line and the surface
 * @param maxSurfaceAngle Radian of minimum turn angle. 0 - 180. 0 is same direction to normal. 180 is opposite
 */
function limitSurfaceAngle(linePoints, surfaceNormal, maxSurfaceAngle) {
  if (!(maxSurfaceAngle <= 180 && maxSurfaceAngle > 0)) {
    return;
  }
  maxSurfaceAngle = maxSurfaceAngle / 180 * Math.PI;
  pt0.fromArray(linePoints[0]);
  pt1.fromArray(linePoints[1]);
  pt2.fromArray(linePoints[2]);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir, pt1, pt0);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir2, pt2, pt1);
  var len1 = dir.len();
  var len2 = dir2.len();
  if (len1 < 1e-3 || len2 < 1e-3) {
    return;
  }
  dir.scale(1 / len1);
  dir2.scale(1 / len2);
  var angleCos = dir.dot(surfaceNormal);
  var maxSurfaceAngleCos = Math.cos(maxSurfaceAngle);
  if (angleCos < maxSurfaceAngleCos) {
    // Calculate project point of pt0 on pt1-pt2
    var d = projectPointToLine(pt1.x, pt1.y, pt2.x, pt2.y, pt0.x, pt0.y, tmpArr, false);
    tmpProjPoint.fromArray(tmpArr);
    var HALF_PI = Math.PI / 2;
    var angle2 = Math.acos(dir2.dot(surfaceNormal));
    var newAngle = HALF_PI + angle2 - maxSurfaceAngle;
    if (newAngle >= HALF_PI) {
      // parallel
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
    } else {
      // Calculate new projected length with limited minTurnAngle and get the new connect point
      tmpProjPoint.scaleAndAdd(dir2, d / Math.tan(Math.PI / 2 - newAngle));
      // Limit the new calculated connect point between pt1 and pt2.
      var t = pt2.x !== pt1.x ? (tmpProjPoint.x - pt1.x) / (pt2.x - pt1.x) : (tmpProjPoint.y - pt1.y) / (pt2.y - pt1.y);
      if (isNaN(t)) {
        return;
      }
      if (t < 0) {
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt1);
      } else if (t > 1) {
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
      }
    }
    tmpProjPoint.toArray(linePoints[1]);
  }
}
function setLabelLineState(labelLine, ignore, stateName, stateModel) {
  var isNormal = stateName === 'normal';
  var stateObj = isNormal ? labelLine : labelLine.ensureState(stateName);
  // Make sure display.
  stateObj.ignore = ignore;
  // Set smooth
  var smooth = stateModel.get('smooth');
  if (smooth && smooth === true) {
    smooth = 0.3;
  }
  stateObj.shape = stateObj.shape || {};
  if (smooth > 0) {
    stateObj.shape.smooth = smooth;
  }
  var styleObj = stateModel.getModel('lineStyle').getLineStyle();
  isNormal ? labelLine.useStyle(styleObj) : stateObj.style = styleObj;
}
function buildLabelLinePath(path, shape) {
  var smooth = shape.smooth;
  var points = shape.points;
  if (!points) {
    return;
  }
  path.moveTo(points[0][0], points[0][1]);
  if (smooth > 0 && points.length >= 3) {
    var len1 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__/* .dist */ .xg(points[0], points[1]);
    var len2 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__/* .dist */ .xg(points[1], points[2]);
    if (!len1 || !len2) {
      path.lineTo(points[1][0], points[1][1]);
      path.lineTo(points[2][0], points[2][1]);
      return;
    }
    var moveLen = Math.min(len1, len2) * smooth;
    var midPoint0 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__/* .lerp */ .Cc([], points[1], points[0], moveLen / len1);
    var midPoint2 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__/* .lerp */ .Cc([], points[1], points[2], moveLen / len2);
    var midPoint1 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__/* .lerp */ .Cc([], midPoint0, midPoint2, 0.5);
    path.bezierCurveTo(midPoint0[0], midPoint0[1], midPoint0[0], midPoint0[1], midPoint1[0], midPoint1[1]);
    path.bezierCurveTo(midPoint2[0], midPoint2[1], midPoint2[0], midPoint2[1], points[2][0], points[2][1]);
  } else {
    for (var i = 1; i < points.length; i++) {
      path.lineTo(points[i][0], points[i][1]);
    }
  }
}
/**
 * Create a label line if necessary and set it's style.
 */
function setLabelLineStyle(targetEl, statesModels, defaultStyle) {
  var labelLine = targetEl.getTextGuideLine();
  var label = targetEl.getTextContent();
  if (!label) {
    // Not show label line if there is no label.
    if (labelLine) {
      targetEl.removeTextGuideLine();
    }
    return;
  }
  var normalModel = statesModels.normal;
  var showNormal = normalModel.get('show');
  var labelIgnoreNormal = label.ignore;
  for (var i = 0; i < _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .DISPLAY_STATES */ .wV.length; i++) {
    var stateName = _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .DISPLAY_STATES */ .wV[i];
    var stateModel = statesModels[stateName];
    var isNormal = stateName === 'normal';
    if (stateModel) {
      var stateShow = stateModel.get('show');
      var isLabelIgnored = isNormal ? labelIgnoreNormal : (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__/* .retrieve2 */ .bZ)(label.states[stateName] && label.states[stateName].ignore, labelIgnoreNormal);
      if (isLabelIgnored // Not show when label is not shown in this state.
      || !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__/* .retrieve2 */ .bZ)(stateShow, showNormal) // Use normal state by default if not set.
      ) {
        var stateObj = isNormal ? labelLine : labelLine && labelLine.states[stateName];
        if (stateObj) {
          stateObj.ignore = true;
        }
        if (!!labelLine) {
          setLabelLineState(labelLine, true, stateName, stateModel);
        }
        continue;
      }
      // Create labelLine if not exists
      if (!labelLine) {
        labelLine = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A();
        targetEl.setTextGuideLine(labelLine);
        // Reset state of normal because it's new created.
        // NOTE: NORMAL should always been the first!
        if (!isNormal && (labelIgnoreNormal || !showNormal)) {
          setLabelLineState(labelLine, true, 'normal', statesModels.normal);
        }
        // Use same state proxy.
        if (targetEl.stateProxy) {
          labelLine.stateProxy = targetEl.stateProxy;
        }
      }
      setLabelLineState(labelLine, false, stateName, stateModel);
    }
  }
  if (labelLine) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__/* .defaults */ .NT)(labelLine.style, defaultStyle);
    // Not fill.
    labelLine.style.fill = null;
    var showAbove = normalModel.get('showAbove');
    var labelLineConfig = targetEl.textGuideLineConfig = targetEl.textGuideLineConfig || {};
    labelLineConfig.showAbove = showAbove || false;
    // Custom the buildPath.
    labelLine.buildPath = buildLabelLinePath;
  }
}
function getLabelLineStatesModels(itemModel, labelLineName) {
  labelLineName = labelLineName || 'labelLine';
  var statesModels = {
    normal: itemModel.getModel(labelLineName)
  };
  for (var i = 0; i < _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .SPECIAL_STATES */ .BV.length; i++) {
    var stateName = _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .SPECIAL_STATES */ .BV[i];
    statesModels[stateName] = itemModel.getModel([stateName, labelLineName]);
  }
  return statesModels;
}

/***/ }),

/***/ 77175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   If: () => (/* binding */ hideOverlap),
/* harmony export */   QX: () => (/* binding */ shiftLayoutOnX),
/* harmony export */   Xe: () => (/* binding */ shiftLayoutOnY),
/* harmony export */   os: () => (/* binding */ prepareLayoutList)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84716);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29308);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function prepareLayoutList(input) {
  var list = [];
  for (var i = 0; i < input.length; i++) {
    var rawItem = input[i];
    if (rawItem.defaultAttr.ignore) {
      continue;
    }
    var label = rawItem.label;
    var transform = label.getComputedTransform();
    // NOTE: Get bounding rect after getComputedTransform, or label may not been updated by the host el.
    var localRect = label.getBoundingRect();
    var isAxisAligned = !transform || transform[1] < 1e-5 && transform[2] < 1e-5;
    var minMargin = label.style.margin || 0;
    var globalRect = localRect.clone();
    globalRect.applyTransform(transform);
    globalRect.x -= minMargin / 2;
    globalRect.y -= minMargin / 2;
    globalRect.width += minMargin;
    globalRect.height += minMargin;
    var obb = isAxisAligned ? new _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(localRect, transform) : null;
    list.push({
      label: label,
      labelLine: rawItem.labelLine,
      rect: globalRect,
      localRect: localRect,
      obb: obb,
      priority: rawItem.priority,
      defaultAttr: rawItem.defaultAttr,
      layoutOption: rawItem.computedLayoutOption,
      axisAligned: isAxisAligned,
      transform: transform
    });
  }
  return list;
}
function shiftLayout(list, xyDim, sizeDim, minBound, maxBound, balanceShift) {
  var len = list.length;
  if (len < 2) {
    return;
  }
  list.sort(function (a, b) {
    return a.rect[xyDim] - b.rect[xyDim];
  });
  var lastPos = 0;
  var delta;
  var adjusted = false;
  var shifts = [];
  var totalShifts = 0;
  for (var i = 0; i < len; i++) {
    var item = list[i];
    var rect = item.rect;
    delta = rect[xyDim] - lastPos;
    if (delta < 0) {
      // shiftForward(i, len, -delta);
      rect[xyDim] -= delta;
      item.label[xyDim] -= delta;
      adjusted = true;
    }
    var shift = Math.max(-delta, 0);
    shifts.push(shift);
    totalShifts += shift;
    lastPos = rect[xyDim] + rect[sizeDim];
  }
  if (totalShifts > 0 && balanceShift) {
    // Shift back to make the distribution more equally.
    shiftList(-totalShifts / len, 0, len);
  }
  // TODO bleedMargin?
  var first = list[0];
  var last = list[len - 1];
  var minGap;
  var maxGap;
  updateMinMaxGap();
  // If ends exceed two bounds, squeeze at most 80%, then take the gap of two bounds.
  minGap < 0 && squeezeGaps(-minGap, 0.8);
  maxGap < 0 && squeezeGaps(maxGap, 0.8);
  updateMinMaxGap();
  takeBoundsGap(minGap, maxGap, 1);
  takeBoundsGap(maxGap, minGap, -1);
  // Handle bailout when there is not enough space.
  updateMinMaxGap();
  if (minGap < 0) {
    squeezeWhenBailout(-minGap);
  }
  if (maxGap < 0) {
    squeezeWhenBailout(maxGap);
  }
  function updateMinMaxGap() {
    minGap = first.rect[xyDim] - minBound;
    maxGap = maxBound - last.rect[xyDim] - last.rect[sizeDim];
  }
  function takeBoundsGap(gapThisBound, gapOtherBound, moveDir) {
    if (gapThisBound < 0) {
      // Move from other gap if can.
      var moveFromMaxGap = Math.min(gapOtherBound, -gapThisBound);
      if (moveFromMaxGap > 0) {
        shiftList(moveFromMaxGap * moveDir, 0, len);
        var remained = moveFromMaxGap + gapThisBound;
        if (remained < 0) {
          squeezeGaps(-remained * moveDir, 1);
        }
      } else {
        squeezeGaps(-gapThisBound * moveDir, 1);
      }
    }
  }
  function shiftList(delta, start, end) {
    if (delta !== 0) {
      adjusted = true;
    }
    for (var i = start; i < end; i++) {
      var item = list[i];
      var rect = item.rect;
      rect[xyDim] += delta;
      item.label[xyDim] += delta;
    }
  }
  // Squeeze gaps if the labels exceed margin.
  function squeezeGaps(delta, maxSqeezePercent) {
    var gaps = [];
    var totalGaps = 0;
    for (var i = 1; i < len; i++) {
      var prevItemRect = list[i - 1].rect;
      var gap = Math.max(list[i].rect[xyDim] - prevItemRect[xyDim] - prevItemRect[sizeDim], 0);
      gaps.push(gap);
      totalGaps += gap;
    }
    if (!totalGaps) {
      return;
    }
    var squeezePercent = Math.min(Math.abs(delta) / totalGaps, maxSqeezePercent);
    if (delta > 0) {
      for (var i = 0; i < len - 1; i++) {
        // Distribute the shift delta to all gaps.
        var movement = gaps[i] * squeezePercent;
        // Forward
        shiftList(movement, 0, i + 1);
      }
    } else {
      // Backward
      for (var i = len - 1; i > 0; i--) {
        // Distribute the shift delta to all gaps.
        var movement = gaps[i - 1] * squeezePercent;
        shiftList(-movement, i, len);
      }
    }
  }
  /**
   * Squeeze to allow overlap if there is no more space available.
   * Let other overlapping strategy like hideOverlap do the job instead of keep exceeding the bounds.
   */
  function squeezeWhenBailout(delta) {
    var dir = delta < 0 ? -1 : 1;
    delta = Math.abs(delta);
    var moveForEachLabel = Math.ceil(delta / (len - 1));
    for (var i = 0; i < len - 1; i++) {
      if (dir > 0) {
        // Forward
        shiftList(moveForEachLabel, 0, i + 1);
      } else {
        // Backward
        shiftList(-moveForEachLabel, len - i - 1, len);
      }
      delta -= moveForEachLabel;
      if (delta <= 0) {
        return;
      }
    }
  }
  return adjusted;
}
/**
 * Adjust labels on x direction to avoid overlap.
 */
function shiftLayoutOnX(list, leftBound, rightBound,
// If average the shifts on all labels and add them to 0
// TODO: Not sure if should enable it.
// Pros: The angle of lines will distribute more equally
// Cons: In some layout. It may not what user wanted. like in pie. the label of last sector is usually changed unexpectedly.
balanceShift) {
  return shiftLayout(list, 'x', 'width', leftBound, rightBound, balanceShift);
}
/**
 * Adjust labels on y direction to avoid overlap.
 */
function shiftLayoutOnY(list, topBound, bottomBound,
// If average the shifts on all labels and add them to 0
balanceShift) {
  return shiftLayout(list, 'y', 'height', topBound, bottomBound, balanceShift);
}
function hideOverlap(labelList) {
  var displayedLabels = [];
  // TODO, render overflow visible first, put in the displayedLabels.
  labelList.sort(function (a, b) {
    return b.priority - a.priority;
  });
  var globalRect = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(0, 0, 0, 0);
  function hideEl(el) {
    if (!el.ignore) {
      // Show on emphasis.
      var emphasisState = el.ensureState('emphasis');
      if (emphasisState.ignore == null) {
        emphasisState.ignore = false;
      }
    }
    el.ignore = true;
  }
  for (var i = 0; i < labelList.length; i++) {
    var labelItem = labelList[i];
    var isAxisAligned = labelItem.axisAligned;
    var localRect = labelItem.localRect;
    var transform = labelItem.transform;
    var label = labelItem.label;
    var labelLine = labelItem.labelLine;
    globalRect.copy(labelItem.rect);
    // Add a threshold because layout may be aligned precisely.
    globalRect.width -= 0.1;
    globalRect.height -= 0.1;
    globalRect.x += 0.05;
    globalRect.y += 0.05;
    var obb = labelItem.obb;
    var overlapped = false;
    for (var j = 0; j < displayedLabels.length; j++) {
      var existsTextCfg = displayedLabels[j];
      // Fast rejection.
      if (!globalRect.intersect(existsTextCfg.rect)) {
        continue;
      }
      if (isAxisAligned && existsTextCfg.axisAligned) {
        // Is overlapped
        overlapped = true;
        break;
      }
      if (!existsTextCfg.obb) {
        // If self is not axis aligned. But other is.
        existsTextCfg.obb = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(existsTextCfg.localRect, existsTextCfg.transform);
      }
      if (!obb) {
        // If self is axis aligned. But other is not.
        obb = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(localRect, transform);
      }
      if (obb.intersect(existsTextCfg.obb)) {
        overlapped = true;
        break;
      }
    }
    // TODO Callback to determine if this overlap should be handled?
    if (overlapped) {
      hideEl(label);
      labelLine && hideEl(labelLine);
    } else {
      label.attr('ignore', labelItem.defaultAttr.ignore);
      labelLine && labelLine.attr('ignore', labelItem.defaultAttr.labelGuideIgnore);
      displayedLabels.push(labelItem);
    }
  }
}

/***/ })

};
;