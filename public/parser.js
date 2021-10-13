const fs = require("fs");

function csvJSON(csv){
    var lines = csv.split("\n");
    var result = [];
    var finalString = "[\n";
    var headers = lines[0].split(",");
  
    for(var i = 1; i < lines.length; i++){
  
        var obj = {};
        var currentline = lines[i].split(",");
  
        for(var j=0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    for (let i = 0; i < result.length; i++){
        finalString += "\t" + JSON.stringify(result[i]);
        if (i != result.length - 1){
            finalString += "," + "\n";
        }
    }
    finalString += "\n]"
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