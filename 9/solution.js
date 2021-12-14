solution = () => {
    require('fs').readFile('./9/input.txt', 'utf8', (e, d) => {
        //setup
        points = d.split('\r\n');
        
        lowPoints = [];
        basins = [];
        MAX_ROWS = points.length;
        MAX_COLUMNS = points[0].length;

        //processing
        for (row = 0; row < MAX_ROWS; row++) {
            for (column = 0; column < MAX_COLUMNS; column++) {
                if (isLowPoint(row, column, points)) {
                    lowPoints.push(parseInt(points[row][column]));
                    basins.push([]);
                    calculateBasinPoint(row, column, basins.length-1);
                }
            }
        }
        largestBasins = basins.map(x=>x.length).sort((x,y)=>x>y?-1:1).splice(0, 3).reduce((p,c)=>p*c);

        //output
        console.log('Risk factor:', lowPoints.reduce((p,c) => 1 + p + c, 0));
        console.log('Largest basins:', largestBasins);
    });
}

isLowPoint = (row, column) => {
    point = parseInt(points[row][column]);
    if (
        (column - 1 >= 0 && point >= parseInt(points[row][column-1])) ||
        (column + 1 < MAX_COLUMNS && point >= parseInt(points[row][column+1])) ||
        (row - 1 >= 0 && point >= parseInt(points[row-1][column])) ||
        (row + 1 < MAX_ROWS && point >= parseInt(points[row+1][column]))
    ) return false;
    return true;
};

calculateBasinPoint = (row, column, basinIndex) => {
    if (addToBasin(row, column, basinIndex)) {
        // left
        if (column - 1 >= 0 && parseInt(points[row][column-1]) !== 9) {
            calculateBasinPoint(row, column-1, basinIndex);
        }
        // right
        if (column + 1 < MAX_COLUMNS && parseInt(points[row][column+1]) !== 9) {
            calculateBasinPoint(row, column+1, basinIndex);
        }
        // top
        if (row - 1 >= 0 && parseInt(points[row-1][column]) !== 9) {
            calculateBasinPoint(row-1, column, basinIndex);
        }
        // bottom
        if (row + 1 < MAX_ROWS && parseInt(points[row+1][column]) !== 9) {
            calculateBasinPoint(row+1, column, basinIndex);
        }
    }
};

addToBasin = (row, column, basinIndex) => {
    success = false;
    if (!basins[basinIndex].length || basins[basinIndex].findIndex(x=> x[0] === row && x[1] === column ? true : false) === -1) {
        basins[basinIndex].push([row, column]);
        success = true;
    }
    return success;
};

solution();