import React from 'react';

export default function QuoteAndSource(props) {
    
    const backgroundColor = props.invertedColors ? props.color : props.backgroundColor;
    const opacity = props.opacity;
    const displayProp = props.hideSource ? { display: 'none' } : {};
    const sourceStyle = Object.assign({ marginTop: props.sourceTopMargin }, displayProp);

    return (
        <div style={{ marginBottom: props.marginBottom, padding: props.padding }} className="quote-container">
            <div style={{ borderRadius: props.borderRadius, opacity, backgroundColor }} className="overlay" />
            <div style={{ position: 'relative' }}>
                <span className="quote-text">&ldquo;{props.quote}&rdquo;</span>
                <span style={sourceStyle} className="source-text">{props.source}</span>
            </div>
        </div>
    );
}
