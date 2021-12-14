require('fs').readFile('./2/input.txt', 'utf8', (e, d) => {
    input = d.split('\r\n').map(x=>x.split(' '));
    console.log(input.reduce((p,c,i,a)=>x(a[i],p),[0,0]).reduce((p,c)=>c*p));
    console.log(input.reduce((p,c,i,a)=>y(a[i],p),[0,0,0]).reduce((p,c,i)=>i==1?p*c:p));
});
x = (i,r) => {
    if (i[0] === 'forward') r[0] += parseInt(i[1]);
    else if (i[0] === 'down') r[1] += parseInt(i[1]);
    else if (i[0] === 'up') r[1] -= parseInt(i[1]);
    return r;
};
y = (i,r) => {
    if (i[0] === 'forward') { r[0] += parseInt(i[1]); r[1] += r[2] * parseInt(i[1]); }
    else if (i[0] === 'down') r[2] += parseInt(i[1]);
    else if (i[0] === 'up') r[2] -= parseInt(i[1]);
    return r;
};