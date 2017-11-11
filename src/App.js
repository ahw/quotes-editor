import React from 'react';
// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import QuoteEditor from './QuoteEditor';
import LayoutEditor from './LayoutEditor';
import QuoteContainer from './QuoteContainer';
import SpreadsheetDisplay from './SpreadsheetDisplay';
import { isValidLine, parseLine, clean, getOrdinalSuffix } from './utils';

const defaultRawText = `She's nice. She's normal. - 8th Ave and W 41st St
Have you met her yet? - Bryant Park
No. Well—no. - 6th Ave and W 40th St
She's psycho. - Bryant Park`;




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
                marginRight: 0,
                margin: 0,
                quoteAndSourcePadding: 5,
                sourceTopMargin: 0,
                borderRadius: 4,
                inline: false,
                overlayColor: '#000000',
                lineHeight: 'normal',
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

        if (e.target) {
            e.preventDefault();
        }

        let value = e;
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
            .filter(isValidLine)
            .map(parseLine)
            .map(clean);
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
                    inline={layoutStyles.inline}
                    lineHeight={layoutStyles.lineHeight}
                    padding={layoutStyles.padding}
                    color={layoutStyles.color}
                    backgroundColor={layoutStyles.backgroundColor}
                    overlayColor={layoutStyles.overlayColor}
                    backgroundImage={layoutStyles.backgroundImage}
                    marginBottom={layoutStyles.marginBottom}
                    marginRight={layoutStyles.marginRight}
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
