require('fs').readFile('./7/input.txt', 'utf8', (e, d) => {
    //setup
    crabs = d.split(',').map(x=>parseInt(x));
    POSITIONS = getHorizontalPositions(crabs);

    //processing
    leastFuelConsumption = null;
    for (i = 0; i < POSITIONS; i++) {
        fuelConsumption = calculateCrabSteps(i, crabs);
        if (!leastFuelConsumption || fuelConsumption < leastFuelConsumption) {
            leastFuelConsumption = fuelConsumption;
        }
    }

    //output
    console.log('Least fuel consumption: ', leastFuelConsumption);
});

calculateCrabSteps = (position, crabs) => {
    fuelConsumption = 0;
    for (x = 0; x < crabs.length; x++) {
        steps = Math.abs(crabs[x] - position);
        fuelConsumption += getFuelConsumption(steps);
    }
    return fuelConsumption;
};

getHorizontalPositions = (crabs) => {
    return crabs.reduce((p, c) => !p || c > p ? c : p, 0) + 1;
};

getFuelConsumption = (steps) => {
    fuel = 0;
    for (t = 1; t <= steps; t++) fuel += t;
    return fuel;
};