import React from 'react';

export default function QuoteAndSource(props) {
    
    const backgroundColor = props.invertedColors ? props.color : props.backgroundColor;
    const opacity = props.opacity;

    console.log('Rendering QuoteAndSource', props);
    return (
        <div style={{ marginBottom: props.marginBottom }} className="quote-container">
            <div style={{ opacity, backgroundColor }} className="overlay" />
            <div style={{ position: 'relative' }}>
                <span className="quote-text">&ldquo;{props.quote}&rdquo;</span>
                <span className="source-text">{props.source}</span>
            </div>
        </div>
    );
}
