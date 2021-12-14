require('fs').readFile('./5/input.txt', 'utf8', (e, d) => {
    //setup
    MAP_SIZE = 1000;
    input = d.split('\r\n').map(x=>x.replace(' -> ', ',').split(',')).map(x=>x.map(y=>parseInt(y)));
    map = [];
    for (i = 0; i < MAP_SIZE; i++) map.push(Array(MAP_SIZE).fill(0));

    // perform calculations
    for (line of input) calculatePoints(map, line);

    // result
    result = map.reduce((t1,c1) => t1 + c1.reduce((t2,c2) => c2 >= 2 ? t2 + 1 : t2, 0), 0);
    console.log('Result: ', result);
});
calculatePoints = (map, line) => {
    X1 = line[0]; Y1 = line[1];
    X2 = line[2]; Y2 = line[3];
    INCREASING = 0;
    DECREASING = 1;
    // vertical
    if (X1 === X2) {
        LOW = Y1 < Y2 ? Y1 : Y2;
        HIGH = LOW === Y1 ? Y2 : Y1;
        for (t = LOW; t <= HIGH; t++) map[t][X1]++;
    }
    // horizontal
    else if (Y1 === Y2) {
        LOW = X1 < X2 ? X1 : X2;
        HIGH = LOW === X1 ? X2 : X1;
        for (t = LOW; t <= HIGH; t++) map[Y1][t]++;
    // diagonal
    } else {
        Y_START = Y1 < Y2 ? Y1 : Y2;
        Y_END = Y_START === Y1 ? Y2 : Y1;
        X_START = Y_START === Y1 ? X1 : X2;
        X_END = X_START === X1 ? X2 : X1;
        X_DIRECTION = X_START < X_END ? INCREASING : DECREASING;
        xVal = X_START;
        for (t = Y_START; t <= Y_END; t++) {
            map[t][xVal]++;
            X_DIRECTION === INCREASING ? xVal++ : xVal--;
        }
    }
};