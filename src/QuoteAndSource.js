import React from 'react';

export default function QuoteAndSource(props) {
    
    const backgroundColor = props.invertedColors ? props.color : props.backgroundColor;
    const opacity = props.opacity;

    const display = props.inline ? 'inline' : 'block'; 
    const quoteContainerStyle = {
        marginBottom: props.marginBottom,
        padding: props.inline ? `${props.padding}px 0` : props.padding,
        display,
        background: props.inline ? props.overlayColor : 'transparent',
        marginRight: props.marginRight,
        boxShadow: `
             ${props.padding}px 0 0 ${props.inline ? props.overlayColor : 'transparent'},
            -${props.padding}px 0 0 ${props.inline ? props.overlayColor : 'transparent'}`,
    };
    const sourceStyle = Object.assign({ marginTop: props.sourceTopMargin }, { display });
    const overlayStyle = {
        borderRadius: props.borderRadius,
        opacity,
        backgroundColor: props.overlayColor,
        display: props.inline ? 'none' : 'block',
    };

    return (
        <div style={quoteContainerStyle} className="quote-container">
            <div style={overlayStyle} className="overlay" />
            <div className="quote-container-inner">
                <span style={{ display }} className="quote-text">&ldquo;{props.quote}&rdquo;</span>
                {
                    !props.hideSource
                    ? <span style={sourceStyle} className="source-text">{props.source}</span>
                    : null
                }
            </div>
        </div>
    );
}
