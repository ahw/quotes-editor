import React from 'react';

export default function QuoteAndSource(props) {
    
    const style = {
        marginBottom: props.marginBottom,
        backgroundColor: props.invertedColors ? props.color : props.backgroundColor,
    };

    return (
        <div style={style} className="quote-container">
            <span className="quote-text">&ldquo;{props.quote}&rdquo;</span>
            <span className="source-text">{props.source}</span>
        </div>
    );
}
