A = 0;
B = 1;
C = 2;
D = 3;
E = 4;
F = 5;
G = 6;
require('fs').readFile('./8/example.txt', 'utf8', (e, d) => {
    //constants
    INPUT = 0;
    OUTPUT = 1;
    SEGMENT_COUNT = {
        0: [],
        1: [],
        2: [1],
        3: [7],
        4: [4],
        5: [2,3,5],
        6: [0,9],
        7: [8]
    };
    DIGIT_TO_SEGMENT_COUNT = [
        6,
        2,
        5,
        5,
        4,
        5,
        6,
        7,
        7,
        6
    ];
    SEGMENT_TO_CHARACTER = Array(7).fill(null);
    DIGIT_TO_SIGNAL = Array(10).fill(null);

    //setup
    entries = d.split('\r\n').map(x => x.split(' | ').map(y => y.split(' ')));
    segmentToCharacters = entries.map(x => [ ...SEGMENT_TO_CHARACTER ]);
    digitToSignals = entries.map(x => y= [ ...DIGIT_TO_SIGNAL ]);
    // console.log(entries);
    // console.log(segmentToCharacters);
    // console.log(digitToSignals);

    // //processing (part 1)
    // occurrences = 0;
    // for (i = 0; i < entries.length; i++) {
    //     for (signal of entries[i][OUTPUT]) {
    //         if (NUM_SEGMENTS[signal.length]) occurrences++;
    //     }
    // }
    // console.log('Simple digit occurrences', segmentMaps);

    //processing (part 2)
    for (i = 0; i < entries.length; i++) {
        doSomeShit(entries[i], digitToSignals[i], segmentToCharacters[i]);
    }
    // console.log('Segment to characters', segmentToCharacters);
    // console.log('Digit to signals', digitToSignals);
});
// monolithic nonsense
doSomeShit = (entry, digitToSignal, segmentToCharacter) => {
    // set the ones we know
    for (signal of entry[INPUT]) {
        digit = SEGMENT_COUNT[signal.length];
        if (digit.length === 1) {
            digitToSignal[digit] = signal;      // simple signals (1,4,7,8)
        }
        else {

        }
    }

    segmentToCharacter[A] = getSegmentDifference(digitToSignal[7], digitToSignal[1]);
    // segmentToCharacter[D] = getSegmentDifference(digitToSignal[8], digitToSignal[0]);
    // segmentToCharacter[E] = getSegmentDifference(digitToSignal[6], digitToSignal[5]);

    console.log('Segment to characters', segmentToCharacter);
    console.log('Digit to signals', digitToSignal);
};

getSegmentDifference = (signalBig, signalSmall) => {
    for (segment of signalSmall) {
        signalBig = signalBig.replace(segment, '');
    }
    return signalBig;
};