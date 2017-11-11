const iphoneNotesRegex = /^(.+)\s[-–—]\s(.*)$/
const spreadsheetLineRegex = /^(.+)\t(.+)$/

export function isValidLine(line) {
    return iphoneNotesRegex.test(line) || spreadsheetLineRegex.test(line);
}

export function parseLine(line) {
    let matches = [];
    if (iphoneNotesRegex.test(line)) {
        matches = line.match(iphoneNotesRegex);
    } else if (spreadsheetLineRegex.test(line)) {
        matches = line.match(spreadsheetLineRegex);
    } else {
        console.warn(`Line does not match any of the patterns "${line}"`);
    }

    let [_, quote, source] = matches;
    return { quote, source };
}

export function clean({ quote: rawQuote, source: rawSource }) {
    const source = rawSource
        .replace(/\sst\s/, " St ")
        .replace(/\sst$/, " St")
        .replace(/\s([nsew])\s/, (_, dir) => ' ' + dir.toUpperCase() + ' ')
        .replace(/^([nsew])\s/, (_, dir) => dir.toUpperCase() + ' ')
        .replace(/subway/, "Subway")
        .replace(/park/, "Park")
        .replace(/square/, "Square")
        .replace(/^([a-z])(.*)/, (wholeMatch, firstChar, rest) => {
            return firstChar.toUpperCase() + rest;
        })
        .replace(/([a-z])(\strain)/, (wholeMatch, firstChar, rest) => {
            return firstChar.toUpperCase() + rest;
        })
        .replace(/(\w)(\w*)\s(ave|st|blvd|dr)/gi, (wholeMatch, firstChar, restOfStreet, ave) => {
            return firstChar.toUpperCase() + restOfStreet + ' ' + ave.charAt(0).toUpperCase() + ave.substr(1);
        })
        .replace(/(\d+)\s(\d+)/, (whole, n, m) => {
            let aveNumber = n;
            let streetNumber = m;
            let streetDir = 'W';
            if (1 <= m && m <= 11) {
                aveNumber = m;
                streetNumber = n;
            }

            if (aveNumber <= 5) {
                streetDir = 'E';
            }

            const streetLine = `${streetDir} ${streetNumber}${getOrdinalSuffix(streetNumber)} St`;
            const aveLine = `${aveNumber}${getOrdinalSuffix(aveNumber)} Ave`;
            if (streetNumber === n) {
                // Street then ave
                return `${streetLine} and ${aveLine}`;
            } else {
                // Ave then street
                return `${aveLine} and ${streetLine}`;
            }
        });

    const quote = rawQuote;
    return { quote, source };
}

export function getOrdinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}
