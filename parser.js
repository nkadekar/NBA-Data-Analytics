const fs = require("fs");

//var csv is the CSV file with headers
function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var finalString = "";
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    for (let i = 0; i < result.length; i++){
        finalString += JSON.stringify(result[i]) + "," + "\n";
    }
    return finalString;
}

const players = fs.readFileSync("players.csv").toString();
const content = csvJSON(players);

fs.writeFile('test.json', content, err => {
    if (err) {
        console.error(err);
        return;
    }
})
