import React from 'react';
// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import QuoteEditor from './QuoteEditor';
import LayoutEditor from './LayoutEditor';
import QuoteContainer from './QuoteContainer';
import SpreadsheetDisplay from './SpreadsheetDisplay';

const defaultRawText = `She's nice. She's normal. - 8th Ave and W 41st St
Have you met her yet? - Bryant Park
No. Well—no. - 6th Ave and W 40th St
She's psycho. - Bryant Park`;

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



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            editorHasFocus: false,
            layoutStyles: {
                padding: 30,
                backgroundColor: '#000000',
                backgroundImage: 'none',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                color: '#ffffff',
                opacity: 1,
                marginBottom: 10,
                margin: 0,
                quoteAndSourcePadding: 5,
                sourceTopMargin: 0,
                borderRadius: 4,
            },
            hideSource: false,
            invertedColors: false,
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
        pairs.filter(pair => pair).forEach(pair => {
            const [key, value] = pair.split('=');
            hash[key] = decodeURIComponent(value);
        });

        const newHash = Object.assign({}, this.state.hash, hash);
        this.setState({ hash: newHash })
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
    //     this.updateHash({ extraCss });
    //     style.innerHTML = extraCss;
    // }

    handleCssChange(e) {
        const extraCss = e.target.value;
        this.updateHash({ extraCss });
    }

    handleInvertColors() {
        this.setState({ invertedColors: !this.state.invertedColors });
    }

    handleOverlayToggle() {
        this.setState({ showOverlay: !this.state.showOverlay });
    }

    handleHideSource() {
        this.setState({ hideSource: !this.state.hideSource });
    }

    handleFileSelect(evt) {
        const files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (let i = 0, f; f = files[i]; i++) {
        // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            const reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (theFile => {
              return e => {
                const layoutStyles = Object.assign({}, this.state.layoutStyles, {
                    backgroundImage: `url('${e.target.result}')`
                });
                this.setState({ layoutStyles });
              };
            })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
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

        const layoutStyles = Object.assign({}, this.state.layoutStyles, { [property]: value });

        this.setState({
            hasTouch: e.type === 'touchstart' || this.state.hasTouch,
            layoutStyles,
        })
    }

    getQuotes(rawText) {
        return rawText.split('\n')
            .filter(line => line && (iphoneNotesRegex.test(line) || spreadsheetLineRegex.test(line)))
            .map(line => {
                let matches = []
                if (iphoneNotesRegex.test(line)) {
                    matches = line.match(iphoneNotesRegex)
                } else if (spreadsheetLineRegex.test(line)) {
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
                return { quote, source }
            })
    }

    render() {
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
                {this.state.showOverlay ? <div onClick={this.handleOverlayToggle.bind(this)} style={squareOverlayStyle}/> : null}
                <QuoteEditor
                    rawText={this.state.hash.rawText}
                    editorHasFocus={this.state.editorHasFocus}
                    onFocus={() => this.setState({ editorHasFocus: true })}
                    onCloseButtonClick={() => this.setState({ editorHasFocus: false })}
                    onChange={this.handleRawTextChange.bind(this)}/>
                <LayoutEditor
                    layoutStyles={layoutStyles}
                    onLayoutChange={this.handleLayoutChange.bind(this)}
                    onOverlayToggle={this.handleOverlayToggle.bind(this)}
                    onHideSource={this.handleHideSource.bind(this)}
                    onFileSelect={this.handleFileSelect.bind(this)}
                    onInvertColors={this.handleInvertColors.bind(this)}
                    extraCss={this.state.hash.extraCss}
                    showOverlay={this.state.showOverlay}
                    hideSource={this.state.hideSource}
                    invertedColors={this.state.invertedColors}
                    onCssChange={this.handleCssChange.bind(this)}/>
                <QuoteContainer
                    invertedColors={this.state.invertedColors}
                    padding={layoutStyles.padding}
                    color={layoutStyles.color}
                    backgroundColor={layoutStyles.backgroundColor}
                    backgroundImage={layoutStyles.backgroundImage}
                    marginBottom={layoutStyles.marginBottom}
                    backgroundSize={layoutStyles.backgroundSize}
                    backgroundPosition={layoutStyles.backgroundPosition}
                    backgroundRepeat={layoutStyles.backgroundRepeat}
                    quoteAndSourcePadding={layoutStyles.quoteAndSourcePadding}
                    borderRadius={layoutStyles.borderRadius}
                    sourceTopMargin={layoutStyles.sourceTopMargin}
                    hideSource={this.state.hideSource}
                    opacity={layoutStyles.opacity}
                    quotes={quotes}/>
                <SpreadsheetDisplay quotes={quotes}/>
            </div>
        );
    }
}

export default App;
