require('fs').readFile('./10/input.txt', 'utf8', (e, d) => {
    //setup
    lines = d.split('\r\n');
    errors = [];
    fixScores = [];
    CHUNKS = {
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>'
    };
    ERROR_SCORES = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    FIX_SCORES = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    };

    //processing
    for (line of lines) processLine(line, errors, fixScores);

    //output
    console.log('Error score: ', errors.reduce((p, c) => p + ERROR_SCORES[c], 0));
    console.log('Fix score: ', fixScores.sort((x, y) => x < y ? -1 : 1)[Math.floor(fixScores.length / 2)]);
});
processLine = (line, errors, fixScores) => {
    stack = [line[0]];
    for (i = 1; i < line.length; i++) {
        currentChar = line[i];
        currentExpected = CHUNKS[currentChar];
        expected = CHUNKS[stack[stack.length-1]];
        if (currentExpected) {
            stack.push(currentChar);
        } else if (expected === currentChar) {
            stack.pop();
        } else {
            errors.push(currentChar);
            return;
        }
    }
    score = 0;
    for (i = stack.length - 1; i >= 0; i--) {
        score *= 5;
        score += FIX_SCORES[stack[i]];
    }
    fixScores.push(score);
};