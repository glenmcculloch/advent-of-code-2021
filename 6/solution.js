DAYS = 256;
BUCKETS = 9;

require('fs').readFile('./6/input.txt', 'utf8', (e, d) => {
    //setup
    buckets = Array(BUCKETS).fill(0);
    fish = d.split(',')
        .map(x=>parseInt(x))
        .forEach(x=>buckets[x]++);

    //processing
    for (i = 0; i < DAYS; i++) {
        newBuckets = [];
        for (x = 0; x < BUCKETS-1; x++) newBuckets.push(buckets[x+1]);
        newBuckets[6]+=buckets[0];
        newBuckets.push(buckets[0]);
        buckets=newBuckets;
    }

    //output
    console.log('Lantern fish: ', buckets.reduce((p,c)=>p+c,0));
});