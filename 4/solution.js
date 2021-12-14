require('fs').readFile('./4/input.txt', 'utf8', (e, d) => {
    lines = d.split('\r\n');
    inputNumbers = lines[0].split(',').map(x => parseInt(x));
    inputBoards = generateBoards(lines.splice(1).filter(x => x !== '').map(x => x.trim().split(/\s+/).map(x => parseInt(x))));
    resultBoards = [...inputBoards].map(x => x.map(y => y.map(z => false)));

    results = inputBoards.map(x => false);
    for ([iteration, number] of inputNumbers.entries()) {
        bingoCall(inputBoards, resultBoards, number);
        winIndex = getResults(resultBoards, results, iteration);
        // if ((winIndex = results.findIndex(x => x === true)) !== -1) {
        //     console.log(`Results [${index + 1}] Board: ${winIndex + 1}`);
        //     console.log('Solution: ', getScore(inputBoards[winIndex], resultBoards[winIndex]) * number);
        //     break;
        // }
        if (results.reduce((t,c) => c === true ? t + 1 : t, 0) === results.length) {
            console.log('Results: ', getScore(inputBoards[winIndex], resultBoards[winIndex]) * number);
            break;
        }
    }
});
generateBoards = (a) => {
    boards = [];
    for (i = 0; i < a.length; i += 5) {
        boards.push(a.slice(i, i+5));
    }
    return boards;
}
bingoCall = (boards, results, number) => {
    for ([boardIndex, board] of boards.entries()) {
        for ([lineIndex, line] of board.entries()) {
            if ((index = line.findIndex(x => x === number)) !== -1) {
                results[boardIndex][lineIndex][index] = true;
                break;
            }
        }
    }
};
getResults = (boards, results) => {
    theIndex = -1;
    for ([index, board] of boards.entries()) {
        if (results[index] === true) continue;
        for (i = 0; i < 5; i++) {
            foundRow = true;
            foundColumn = true;
            // row
            if (board[i].findIndex(x => x === false) !== -1) foundRow = false;
            // column
            for (t = 0; t < 5; t++) {
                if (board[t][i] === false) {
                    foundColumn = false;
                    break;
                }
            }
            // result
            if (foundRow || foundColumn) {
                results[index] = true;
                theIndex = index;
                break;
            }
        }
    }
    return theIndex;
}
getScore = (board, result) => {
    return board.reduce((totalScore,valueLine,lineIndex) => {
        return totalScore + valueLine.reduce((totalLine,valueColumn,columnIndex) => {
            return result[lineIndex][columnIndex] === false ? totalLine + valueColumn : totalLine;
        }, 0);
    }, 0);
}