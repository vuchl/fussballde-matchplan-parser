const fetch = require ('node-fetch')
const cheerio = require('cheerio')

class MatchplanParser {
    constructor(matchplanUrl){
        this.matchplanUrl = matchplanUrl
    }

    _parseMatchplan(body) {
        const $ = cheerio.load(body)
        
        let matches = []
    
        // parsing the first row in the table with the .row-competition class
        $('tr.row-competition').each((index, element) => {
            // get the "ME | 636363636363" from the right
            let typeAndMatchIdText = $(element).children().last().text().trim();
            let typeAndMatchId = typeAndMatchIdText.split(' | ');
    
            // get the date and time from the left
            let dateString = $('.column-date', element).text().trim()
            let datePortion = dateString.match(/\d{2}\.\d{2}\.\d{2}/)[0].trim() // match dd.MM.yy
            let timePortion = dateString.split('|')[1].trim() // get everthing after |
            let matchMoment = new Date(
                datePortion.split('.')[2],
                datePortion.split('.')[1],
                datePortion.split('.')[0],
                timePortion.indexOf(':') != -1 ? timePortion.split(':')[0] : null,
                timePortion.indexOf(':') != -1 ? timePortion.split(':')[1] : null
            ) 
    
            // parsing the the third row when it is present
            let location = ''
            let secondSibling = $(element).nextAll()[1] // get the second sibling after it self
            // and see if it is the venue row
            if(secondSibling != undefined && secondSibling != null && $(secondSibling).hasClass('row-venue')) {
                location = $(secondSibling).text().trim()
            }
            
            // put everything into a simple pojo
            matches.push({
                id: typeAndMatchId[1], 
                matchType: typeAndMatchId[0], 
                matchMoment, 
                homeTeam: {
                    name: '', 
                    icon: ''
                }, 
                awayTeam: {
                    name: '', 
                    icon: ''
                }, 
                location
            })
        })
    
        // parsing the .column-club div in the row after the first row
        $('tr.row-competition + tr .column-club').each((index, element) => {
            let clubName = $(element).text().trim()
            let iconUrl = $('.club-logo span', element).data('responsive-image') || ''
            let matchIndex = Math.floor(index / 2)
            if(index % 2 == 0) {
                matches[matchIndex].homeTeam.name = clubName
                matches[matchIndex].homeTeam.icon = iconUrl
            } else {
                matches[matchIndex].awayTeam.name = clubName     
                matches[matchIndex].awayTeam.icon = iconUrl     
            }
        })
        return matches
    }

    _fetchMatchplanHtml() {
        return new Promise((resolve, reject) => {
            fetch(this.matchplanUrl)
            .then(res => {
                return res.text()
            }).then(body => {
                resolve(body)
            }).catch(error => {
                console.log(error)
            })
        })
    }
    

    async execute() {
        const body = await this._fetchMatchplanHtml()
        const matchPlan = await this._parseMatchplan(body)
        return matchPlan
    }
}

exports.MatchplanParser = MatchplanParser