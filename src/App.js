import React from 'react';
// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

class QuoteEditor extends React.Component {
    render() {
        let style = {
            width: '100%',
            height: '30vh',
            border: 'none',
            borderBottom: '1px solid gray',
            outline: 'none',
            boxSizing: 'border-box',
            padding: 5,
            fontSize: 16,
        }
        return <textarea style={style} value={this.props.rawText} onChange={this.props.onChange}/>
    }
}

class QuoteAndSource extends React.Component {
    render() {
        let containerStyle = {
            padding: '5px 10px',
            fontFamily: 'Georgia',
            marginBottom: this.props.linespacing,
        }
        
        let sourceStyle = {
            display: 'block',
            textAlign: 'right',
            marginTop: 8,
            fontSize: '11px',
            fontFamily: 'Arial',
            color: this.props.sourceColor || this.props.color,
        }
        
        let quoteStyle = {
            fontWeight: 'normal',
            display: 'block',
        }
        
        return (
            <div style={containerStyle} className="quote-container">
                <span style={quoteStyle} className="quote">&ldquo;{this.props.quote}&rdquo;</span>
                <span style={sourceStyle} className="source">{this.props.source}</span>
            </div>
        )
    }    
}

class QuoteContainer extends React.Component {
    
    render() {
        console.log('Rednering QuoteContainer with quotes', this.props.quotes);
        let style = {
            background: this.props.inverted ? this.props.color : this.props.backgroundColor,
            color: this.props.inverted ? this.props.backgroundColor : this.props.color,
            padding: `40px ${this.props.padding}px`,
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box',
        }
        
        
        let children = this.props.quotes.map(item => {
            return (<QuoteAndSource
                        key={item.quote + item.source}
                        {...item}
                        {...this.props}/>)
        })
        
        return <div
                   onClick={this.props.onClick}
                   style={style} id="all-quotes-container">{children}</div>
    }    
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
class LayoutEditor extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const toggleLinkStyle = {
            background: 'white',
            border: '2px solid black',
            borderRadius: 2,
            fontWeight: 'bold',
            color: 'black',
            textDecoration: 'none',
            padding: 12,
            display: 'block',
            width: '100%',
            margin: '2px 0',
            boxSizing: 'border-box',
            fontSize: 14,
            textAlign: 'center',
        }
        
        return (<div style={{padding: 2}}>
            <input
                style={toggleLinkStyle}
                type="number" value={this.props.padding}
                onChange={this.props.onLayoutChange.bind(this, 'padding')}/>
            <input
                style={toggleLinkStyle}
                value={this.props.backgroundColor}
                onChange={this.props.onLayoutChange.bind(this, 'backgroundColor')}/>
            <input
                style={toggleLinkStyle}
                value={this.props.color}
                onChange={this.props.onLayoutChange.bind(this, 'color')}/>
            <label>Source color</label>
            <input
                style={toggleLinkStyle}
                value={this.props.sourceColor}
                onChange={this.props.onLayoutChange.bind(this, 'sourceColor')}/>
            <a href="#"
                style={Object.assign({}, toggleLinkStyle, {
                        width: 'calc(50% - 1px)',
                        display: 'inline-block',
                        marginRight: 2,
                })}
                onClick={this.props.onLayoutChange.bind(this, 'decrement_padding')}
                onTouchStart={this.props.onLayoutChange.bind(this, 'decrement_padding')}
                >- margin</a>
            <a href="#"
                style={Object.assign({}, toggleLinkStyle, {
                        width: 'calc(50% - 1px)',
                        display: 'inline-block',
                })}
                onClick={this.props.onLayoutChange.bind(this, 'increment_padding')}
                onTouchStart={this.props.onLayoutChange.bind(this, 'increment_padding')}
                >+ margin</a>
            <a href="#"
                style={Object.assign({}, toggleLinkStyle, {
                        width: 'calc(50% - 1px)',
                        display: 'inline-block',
                        marginRight: 2,
                })}
                onClick={this.props.onLayoutChange.bind(this, 'decrement_linespacing')}
                onTouchStart={this.props.onLayoutChange.bind(this, 'decrement_linespacing')}
                >- line spacing</a>
            <a href="#"
                style={Object.assign({}, toggleLinkStyle, {
                        width: 'calc(50% - 1px)',
                        display: 'inline-block',
                })}
                onClick={this.props.onLayoutChange.bind(this, 'increment_linespacing')}
                onTouchStart={this.props.onLayoutChange.bind(this, 'increment_linespacing')}
                >+ line spacing</a>
            <a
                style={toggleLinkStyle}
                href="#"
                onTouchStart={this.props.onLayoutChange.bind(this, 'toggle_showOverlay')}
                onClick={this.props.onLayoutChange.bind(this, 'toggle_showOverlay')}>Toggle Overlay</a>
            <a
                style={toggleLinkStyle}
                href="#"
                onTouchStart={this.props.onLayoutChange.bind(this, 'toggle_inverted')}
                onClick={this.props.onLayoutChange.bind(this, 'toggle_inverted')}>Invert Colors</a>
        </div>);
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            rawText: this.getCleanedRawText(defaultRawText),
            startX: 0,
            startY: 0,
            inverted: false,
            padding: 30,
            backgroundColor: 'black',
            color: 'white',
            showOverlay: false,
            linespacing: 0,
        }
    }
    
    componentDidMount() {
        let hash = window.location.hash
        if (hash && hash !== '#') {
            let rawText = window.decodeURIComponent(hash.match(/^#?(.+)$/)[1])
            this.setState({ rawText })
        }
    }
    
    getCleanedRawText(text) {
        return text
    }
    
    handleRawTextChange(e) {
        let rawText = this.getCleanedRawText(e.target.value)
        let hash = window.encodeURIComponent(rawText)
        window.location.hash = hash
        this.setState({ rawText })
    }
        
    getRawTextFromQuotes(quotes) {
        return quotes.map(item => item.quote + ' - ' + item.source).join('\n\n')
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
        
        if (/^increment/.test(property)) {
            property = property.replace(/^increment_/, '')
            value = this.state[property] + 1
        }
        
        if (/^decrement/.test(property)) {
            property = property.replace(/^decrement_/, '')
            value = this.state[property] - 1
        }
        
        this.setState({
            hasTouch: e.type === 'touchstart' || this.state.hasTouch,
            [property]: value
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
                console.log(`Quote: "${quote}" Source: "${source}"`);
                return { quote, source }
            })
    }
        
    render() {
        let quotes = this.getQuotes(this.state.rawText)
        console.log(quotes);
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
        }
        
        setTimeout(() => window.smartquotes && window.smartquotes(), 200)
        return (
            <div> 
                {this.state.showOverlay ? <div style={squareOverlayStyle}/> : null}
                <QuoteEditor
                    rawText={this.state.rawText}
                    onChange={this.handleRawTextChange.bind(this)}/>
                <LayoutEditor
                    padding={this.state.padding}
                    backgroundColor={this.state.backgroundColor}
                    color={this.state.color}
                    onLayoutChange={this.handleLayoutChange.bind(this)}/>
                <QuoteContainer
                    inverted={this.state.inverted}
                    padding={this.state.padding}
                    color={this.state.color}
                    backgroundColor={this.state.backgroundColor}
                    linespacing={this.state.linespacing}
                    sourceColor={this.state.sourceColor}
                    quotes={quotes}/>
                <SpreadsheetDisplay quotes={quotes}/>
            </div>
        );
    }
}

export default App;
