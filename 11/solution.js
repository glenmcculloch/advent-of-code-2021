require('fs').readFile('./11/example.txt', 'utf8', (e, d) => {
    //setup
    octopuses = d.split('\r\n').map(x => x.split('').map(x => parseInt(x))).map(x => ['.', ...x, '.']);
    octopuses = [ Array(octopuses[0].length).fill('.'), ...octopuses, Array(octopuses[0].length).fill('.') ];
    flashes = 0;
    synchronised = false;

    BOUNDARY = '.';
    MAX_ROWS = octopuses.length;
    MAX_COLUMNS = octopuses[0].length;
    STEPS = 100;

    //processing
    step = 0;
    while (!synchronised) {
        step++;
        flashes += octopusSteps();
        synchronised = octopuses.find(x => x.find(y => y!== 0 && y !== BOUNDARY ? true : false) !== undefined) === undefined;
    }

    //output
    console.log('Flashes', flashes);
    console.log('Synchronised', step);
});
octopusSteps = () => {
    for (row = 1; row < MAX_ROWS - 1; row++) {
        for (column = 1; column < MAX_COLUMNS - 1; column++) {
            increaseOctopus(row, column);
        }
    }
    flashes = octopuses.reduce((p, c)=> p + c.reduce((x, y) => y > 9 ? x + 1 : x, 0), 0);
    octopuses = octopuses.map(x => x.map(y => y > 9 ? 0 : y));
    return flashes;
};
increaseOctopus = (row, column) => {
    if (octopuses[row][column] !== BOUNDARY) {
        if (++octopuses[row][column] === 10) calculateFlash(row, column);
    }
};
calculateFlash = (row, column) => {
    increaseOctopus(row, column-1); // left
    increaseOctopus(row-1, column-1); // top-left
    increaseOctopus(row-1, column); // top
    increaseOctopus(row-1, column+1); // top-right
    increaseOctopus(row, column+1); // right
    increaseOctopus(row+1, column+1); // bottom-right
    increaseOctopus(row+1, column); // bottom
    increaseOctopus(row+1, column-1); // bottom-left
};