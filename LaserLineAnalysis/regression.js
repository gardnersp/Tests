function linearRegression(start,ende,data) {

    var m=0.0, b=0.0;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    var dataLength = ende-start+1;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (dataLength <= 1) {
        m = 0;
        b = data[0][1];
    } else {
        // Initialize our sums and scope the `m` and `b`
        // variables that define the line.
        var sumX = 0, sumY = 0,
            sumXX = 0, sumXY = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        var point, x, y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2 and (x*y) for each
        // value.
        //
        // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
        for (var i = start; i <= ende; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sumX += x;
            sumY += y;

            sumXX += x * x;
            sumXY += x * y;
        }

        // `m` is the slope of the regression line
        m = ((dataLength * sumXY) - (sumX * sumY)) /
            ((dataLength * sumXX) - (sumX * sumX));

        // `b` is the y-intercept of the line.
        b = (sumY / dataLength) - ((m * sumX) / dataLength);
    }

    // Return both values as an object.
    return {
        m: m,
        b: b
    };
}

function maxDeltaRegression(start,ende,data,m,b) {

    // Store data length in a local variable to reduce
    // repeated object property lookups

    //console.log("start:" + start);
    //console.log("ende:" + ende);
    //console.log("m:" + m);
    //console.log("b:" + b);

    max = 0.0;

    x1 = -100;
    y1 = m * x1 + b;
    x2 = 100;
    y2 = m * x2 + b;

    //console.log("x1:" + x1 + " y1:" + y1);
    //console.log("x2:" + x2 + " y2:" + y2);
    var xsum = 0;
    var ysum = 0;
    var n=0;
    for (var i = start; i <= ende; i++,n++) {

        point = data[i];
        x0 = point[0];
        y0 = point[1];

        xsum += x0;
        ysum += y0;

        // abweichung perpendicular zur m/b linie
        // Uses d=|v^^·r|=(|(x2-x1)(y1-y0)-(x1-x0)(y2-y1)|)/(sqrt((x2-x1)^2+(y2-y1)^2)).
        d = Math.abs((x2-x1)*(y1-y0)-(x1-x0)*(y2-y1))/Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        //console.log("i:" + i + " x0:" + x0 + " y0:" + y0 + " d:" + d);
        if (d > max) max = d;

    }
    if ((n-1) > 0) {
      xsum = xsum/(n-1);
      ysum = ysum/(n-1);
    }

    // Return both values as an object.
    return {
        max: max,
        avex: xsum,
        avey: ysum
    };
}



module.exports.linearRegression=linearRegression;
module.exports.maxDeltaRegression=maxDeltaRegression;
