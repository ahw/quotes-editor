import React from 'react';

export default function QuoteAndSource(props) {
    
    const backgroundColor = props.invertedColors ? props.color : props.backgroundColor;
    const overlayColor = props.invertedColors ? props.color : props.overlayColor;
    const opacity = props.opacity;

    const display = props.inline ? 'inline' : 'block'; 
    const quoteContainerStyle = {
        marginBottom: props.marginBottom,
        borderRadius: props.borderRadius,
        // xxpadding: props.inline ? `${props.padding}px 0` : props.padding,
        padding: props.padding,
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
        display,
        background: props.inline ? overlayColor : 'transparent',
        marginRight: props.inlineSpacing,
        // xxboxShadow: `
        //      ${props.padding}px 0 0 ${props.inline ? props.overlayColor : 'transparent'},
        //     -${props.padding}px 0 0 ${props.inline ? props.overlayColor : 'transparent'}`,
    };
    const sourceStyle = Object.assign({ marginTop: props.sourceTopMargin }, { display });
    const overlayStyle = {
        borderRadius: props.borderRadius,
        opacity,
        backgroundColor: overlayColor,
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
