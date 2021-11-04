
function createGraph(){
    var tP = require("../Analytics/pointsPerPlayerAnalytics.js").totalPoints
    console.log(
        "points", tP
    )
    var data = [
        {
            x: ['Points'],
            y: [tP],
            type: 'bar'
        }
    ];

    Plotly.newPlot('myDiv', data);
}