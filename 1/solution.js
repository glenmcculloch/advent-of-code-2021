require('fs').readFile('./1/input.txt', 'utf8', (e, d) => {
    input = d.split('\r\n');
    console.log(input.reduce((p,c,i,a) => c > a[i-1] ? p+1 : p, 0));
    console.log(input.reduce((p,c,i,a) => i > 2 && c+a[i-1]+a[i-2] > a[i-1]+a[i-2]+a[i-3] ? p+1 : p, 0));
});