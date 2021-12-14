const { start } = require('repl');

require('fs').readFile('./12/example.txt', 'utf8', (e, d) => {
    //setup
    paths = d.split('\r\n').map(x=>x.split('-'));
    routes = [];
    
    //processing
    generatePaths();


    //output
    
});
generatePaths = () => {
    //find paths that have start (use these as starting points)
    begin = [];
    for (path of paths) {
        s = path.findIndex(x => x === 'start');
        if (s !== -1) begin.push(['start', path[s === 0 ? 1 : 0]]);
    }
    console.log(begin);

    // for each start, iterate through to find 
};
// findNextPath = (routes, index) => {
//     length = routes[index].length;
//     for (route of routes) {
//         for (t = 0; t < MAX_PATHS; t++) {
//             cave1 = paths[i].findIndex(x => x === routes[index][length-1]);
//             if (cave1) {
//                 cave2 = paths[i][cave1 === 0 ? 1 : 0];
                
//             }
//         }
//     }
// };
// isSmallCave = (string) => string.match(/^[a-z]+$/) ? true : false;
// hasCave = (route, cave) => route.findIndex(x => x === cave) ? true : false;
// hasEnd = (route) => route.findIndex(x => x === 'end');