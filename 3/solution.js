require('fs').readFile('./3/input.txt', 'utf8', (e, d) => {
    oxyReadings = co2Readings = input = d.split('\r\n');
    bitCounter = [];
    for (i = 0; i < input[0].length; i++) {
        bitCounter.push(0);
    }
    input.forEach((reading) => {
        for (var i = 0; i < reading.length; i++) {
            if (reading[i] == 0) bitCounter[i]++;
        }
    });
    for (i = 0; i < input[0].length; i++) {
        if (oxyReadings.length != 1) {
            commonBit = oxyReadings.reduce((p,c) => c[i] == 0 ? p + 1 : p, 0) > oxyReadings.length / 2 ? 0 : 1;
            oxyReadings = oxyReadings.filter(r => r[i] == commonBit);
        }
        if (co2Readings.length != 1) {
            uncommonBit = co2Readings.reduce((p,c) => c[i] == 0 ? p + 1 : p, 0) <= co2Readings.length / 2 ? 0 : 1;
            co2Readings = co2Readings.filter(r => r[i] == uncommonBit);
        }
    }
    oxygenRate = parseInt(oxyReadings[0], 2);
    co2Rate = parseInt(co2Readings[0], 2);
    epsilonRate = parseInt(bitCounter.map(x => x > input.length / 2 ? 0 : 1).join(''), 2);
    gammaRate = parseInt(bitCounter.map(x => x < input.length / 2 ? 0 : 1).join(''), 2);
    // console.log('Oxygen rate: ', oxygenRate);
    // console.log('CO2 rate: ', co2Rate);
    // console.log('Epsilon rate: ', epsilonRate);
    // console.log('Gamma rate: ', gammaRate);
    console.log('Power rate: ', epsilonRate * gammaRate);
    console.log('Life support rate: ', oxygenRate * co2Rate);
});