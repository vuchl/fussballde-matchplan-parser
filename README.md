# fussballde-matchplan-parser
a parser for matchplan urls in html form

# Install
```bash
npm install --save fussballde-matchplan-parser
```

# Usage
```javascript
// see https::/github.com/vuchl/fussballde-matchplan-url-builder
const builder = require('fussballde-matchplan-url-builder')
const parser = require('fussballde-matchplan-parser')

const teamId = '011MIC6ASO000000VTVG0001VTR8C1K7'
const options = {
    datumVon: '2017-11-01',
    datumBis: '2018-04-30',
    max: 5,
    showVenues: false,
    matchType: 1,
    wettkampftyp: 1
}
const MatchplanUrlBuilder = new builder.MatchplanUrlBuilder(teamId, options)
const matchplanUrl = MatchplanUrlBuilder.buildUrl()
// http://www.fussball.de/ajax.team.matchplan/-/datum-von/2017-11-01/datum-bis/2018-04-30/max/5/match-type/1/wettkampftyp/1/show-venues/false/mime-type/HTML/team-id/011MIC6ASO000000VTVG0001VTR8C1K7


const MatchplanParser = new parser.MatchplanParser(matchplanUrl)
// let matchplan = await MatchplanParser.execute()  // in async funtions
MatchplanParser.execute().then(matchplan => {
    console.log(JSON.stringify(matchplan))
})
```
Json object
```
[
  {
    "id":"890024115",
    "matchType":"ME",
    "matchMoment":"1917-12-05T12:30:00.000Z",
    "homeTeam":{
      "name":"FC Erzgebirge Aue",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GNBOO00000KVV0AG08LVUPGND5I"
    },
    "awayTeam":{
      "name":"Arminia Bielefeld",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GN8LS00009PVV0AG08LVUPGND5I"
    },
    "location":""
  },
  {
    "id":"890024133",
    "matchType":"ME",
    "matchMoment":"1917-12-26T12:30:00.000Z",
    "homeTeam":{
      "name":"FC Erzgebirge Aue",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GNBOO00000KVV0AG08LVUPGND5I"
    },
    "awayTeam":{
      "name":"VfL Bochum 1848",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GN8N400001IVV0AG08LVUPGND5I"
    },
    "location":""
  },
  {
    "id":"890024152",
    "matchType":"ME",
    "matchMoment":"1918-01-10T12:30:00.000Z",
    "homeTeam":{
      "name":"FC Erzgebirge Aue",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GNBOO00000KVV0AG08LVUPGND5I"
    },
    "awayTeam":{
      "name":"SV Darmstadt 98",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GN9V800001JVV0AG08LVUPGND5I"
    },
    "location":""
  },
  {
    "id":"890024160",
    "matchType":"ME",
    "matchMoment":"1918-01-17T12:30:00.000Z",
    "homeTeam":{
      "name":"FC Erzgebirge Aue",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GNBOO00000KVV0AG08LVUPGND5I"
    },
    "awayTeam":{
      "name":"1. FC Heidenheim 1846",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00RL1C8TPC000000VV0AG80NVV76V439"
    },
    "location":""
  },
  {
    "id":"890024178",
    "matchType":"ME",
    "matchMoment":"1918-02-28T12:30:00.000Z",
    "homeTeam":{
      "name":"FC Erzgebirge Aue",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GNBOO00000KVV0AG08LVUPGND5I"
    },
    "awayTeam":{
      "name":"Eintracht Braunschweig",
      "icon":"//www.fussball.de/export.media/-/action/getLogo/format/3/id/00ES8GN6TK000009VV0AG08LVUPGND5I"
    },
    "location":""
  }
]
```
