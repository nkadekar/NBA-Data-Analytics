var rankingData = require("./parser").rankingData

//my idea is creating a separate variable
//push the team name and wins if their games equal 82 or 72
//nba2004 finals jun,15,2004
//nba2005 finals Jun 23, 2005
//nba2006 finals Jun 20, 2006
//nba2007 finals June 14, 2007
//nba2008 finals Jun 17, 2008
//nba2009 finals Jun 14, 2009
//nba2010 finals Jun 17, 2010
//nba2011 finals Jun 12, 2011
//nba2012 finals Jun 21, 2012
//nba2013 finals Jun 20, 2013
//nba2014 finals Jun 15, 2014
//nba2015 finals Jun 16, 2015
//nba2016 finals Jun 19, 2016
//nba2017 finals Jun 12, 2017
//nba2018 finals Jun 17, 2018
//nba2019 finals Jun 13, 2019
//nba2020 finals Oct 11, 2020
let res = []
for (var i = 0; i < rankingData.length; i++) {
    if (rankingData[i].G == 82 && rankingData[i].G == 72) {
        if (rankingData[i].STANDINGSDATE == "2004-06-15") {
            res.push(rankingData[i])
        }

        if (rankingData[i].STANDINGSDATE == "2005-06-23") {
            res.push(rankingData[i])
        }

        if (rankingData[i].STANDINGSDATE == "2006-06-20") {
            res.push(rankingData[i])
        }

        if (rankingData[i].STANDINGSDATE == "2007-06-14") {
            res.push(rankingData[i])
        }

        if (rankingData[i].STANDINGSDATE == "2008-06-17") {
            res.push(rankingData[i])
        }

        if (rankingData[i].STANDINGSDATE == "2009-06-14") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2010-06-17") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2011-06-12") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2012-06-21") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2013-06-20") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2014-06-15") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2015-06-16") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2016-06-19") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2017-06-12") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2018-06-17") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2019-06-13") {
            res.push(rankingData[i])
        }
        if (rankingData[i].STANDINGSDATE == "2020-10-11") {
            res.push(rankingData[i])
        }
    }
}

//aggregate and sort thats all I want
var result = [];
for (var i = 0; i < 30; i++) {
    result.push(res[i].TEAM)
    for (var i = i + 1; i < res.length; i++) {
        if (res[i].TEAM = res[j].TEAM) {
            result[i].W += result[i].W + res[j].W
        }
    }
}