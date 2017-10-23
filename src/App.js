import React from 'react';
// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import QuoteEditor from './QuoteEditor';
import LayoutEditor from './LayoutEditor';
import QuoteContainer from './QuoteContainer';

const defaultRawText = `
She's nice. She's normal. - 8th Ave and W 41st St
Have you met her yet? - Bryant Park
No. Well—no. - 6th Ave and W 40th St
She's psycho. - Bryant Park
`;

const iphoneNotesRegex = /^(.+)\s[-–—]\s(.*)$/
const spreadsheetLineRegex = /^(.+)\t(.+)$/

function getOrdinalSuffix(i) {
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




class SpreadsheetDisplay extends React.Component {
    
    render() {
        let bgmatches = window.location.search.match(/bgcolor=(\w+)/)
        let fgmatches = window.location.search.match(/fgcolor=(\w+)/)
        let bgcolor = `#${bgmatches && bgmatches[1] || '000'}`
        let fgcolor = `#${fgmatches && fgmatches[1] || 'fff'}`
        let style = {
            background: this.props.inverted ? fgcolor : bgcolor,
            color: this.props.inverted ? bgcolor : fgcolor,
            padding: `40px ${this.props.padding}px`,
            width: '100vw',
            // display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box',
        }
        
        
        let children = this.props.quotes.map(item => {
            return item.quote + '\t' + item.source;
        }).join('\n');
        
        return <textarea style={style} value={children}/>
    }    
}


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            layoutStyles :{
                padding: 30,
                backgroundColor: 'black',
                color: 'white',
                marginBottom: 10,
                margin: 0,
            },
            inverted: false,
            showOverlay: false,
            hash: {
                rawText: defaultRawText,
            },
        };
    }

    updateHash(hash) {
        const newHash = Object.assign({}, this.state.hash, hash);
        const str = Object.keys(newHash).map(key => {
            const value = newHash[key];
            return `${key}=${encodeURIComponent(value)}`;
        }).join('&');

        window.location.hash = str;
        this.setState({ hash: newHash });
    }
    
    componentDidMount() {
        const hash = {};
        const hashStr = window.location.hash
        const pairs = hashStr.replace(/^#/, '').split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            hash[key] = decodeURIComponent(value);
        });

        this.setState({ hash })
    }
    
    getCleanedRawText(text) {
        return text
    }
    
    handleRawTextChange(e) {
        let rawText = this.getCleanedRawText(e.target.value)
        const hash = Object.assign({}, { rawText });
        this.updateHash(hash);
    }
        
    getRawTextFromQuotes(quotes) {
        return quotes.map(item => item.quote + ' - ' + item.source).join('\n\n')
    }

    // setExtraCss(extraCss) {
    //     let style = document.getElementById('extraCssStyle');
    //     if (!style) {
    //         style = document.createElement('style');
    //         style.id = 'extraCssStyle';
    //         document.head.appendChild(style);
    //     }

    //     console.log('Setting extra CSS to', extraCss);
    //     this.updateHash({ extraCss });
    //     style.innerHTML = extraCss;
    // }

    handleCssChange(e) {
        const extraCss = e.target.value;
        this.updateHash({ extraCss });
    }

    handleLayoutChange(property, e) {
        if (e.type === 'click' && this.state.hasTouch) {
            // Ignore
            return
        }

        let value = e;
        if (e.target) {
            e.preventDefault();
        }
        
        if (e.target && typeof e.target.value !== 'undefined') {
            value = e.target.value
        }
        
        if (/^toggle/.test(property)) {
            property = property.replace(/^toggle_/, '')
            value = !this.state[property]
        }
        
        /*
        if (/^increment/.test(property)) {
            property = property.replace(/^increment_/, '')
            value = this.state[property] + 1
        }
        
        if (/^decrement/.test(property)) {
            property = property.replace(/^decrement_/, '')
            value = this.state[property] - 1
        }
        */
        
        this.setState({
            hasTouch: e.type === 'touchstart' || this.state.hasTouch,
            layoutStyles: Object.assign({}, this.state.layoutStyles, { [property]: value }),
        })
    }
        
    getQuotes(rawText) {
        // rawText.split('\n').forEach(line => {
        //     console.log('matches spreadsheet regex?', spreadsheetLineRegex.test(line));
        //     console.log('matches iphoneNotes regex?', iphoneNotesRegex.test(line));
        // });
        return rawText.split('\n')
            .filter(line => line && (iphoneNotesRegex.test(line) || spreadsheetLineRegex.test(line)))
            .map(line => {
                let matches = []
                if (iphoneNotesRegex.test(line)) {
                    // console.log(`Line matches iphone regex "${line}"`);
                    matches = line.match(iphoneNotesRegex)
                } else if (spreadsheetLineRegex.test(line)) {
                    // console.log(`Line matches spreadsheet regex "${line}"`);
                    matches = line.match(spreadsheetLineRegex)
                } else {
                    console.warn(`Line does not match any of the patterns "${line}"`);
                }
                
                let spreadsheetMatches = line.match(spreadsheetLineRegex)
                let [_, quote, source] = matches

                source = source
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

                // quote = quote.replace(/'(.*)'/g, '\u2018$1\u2019').replace(/"(.*)"/g, '\u201C$1\u201D')
                // console.log(`Quote: "${quote}" Source: "${source}"`);
                return { quote, source }
            })
    }
        
    render() {
        // console.log(this.state.hash);
        let quotes = this.getQuotes(this.state.hash.rawText)
        let squareOverlayStyle = {
            background: 'red',
            opacity: 0.2,
            zIndex: 100,
            width: '100vw',
            height: '100vw',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };

        const { layoutStyles } = this.state;
        
        setTimeout(() => window.smartquotes && window.smartquotes(), 200)

        return (
            <div> 
                <style dangerouslySetInnerHTML={{__html: this.state.hash.extraCss}} />
                {this.state.showOverlay ? <div style={squareOverlayStyle}/> : null}
                <QuoteEditor
                    rawText={this.state.hash.rawText}
                    onChange={this.handleRawTextChange.bind(this)}/>
                <LayoutEditor
                    layoutStyles={layoutStyles}
                    onLayoutChange={this.handleLayoutChange.bind(this)}
                    extraCss={this.state.hash.extraCss}
                    onCssChange={this.handleCssChange.bind(this)}/>
                <QuoteContainer
                    inverted={this.state.inverted}
                    padding={layoutStyles.padding}
                    color={layoutStyles.color}
                    backgroundColor={layoutStyles.backgroundColor}
                    marginBottom={layoutStyles.marginBottom}
                    quotes={quotes}/>
                <SpreadsheetDisplay quotes={quotes}/>
            </div>
        );
    }
}

export default App;
