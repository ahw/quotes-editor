import React from 'react';

export default function QuoteAndSource(props) {
    
    return (
        <div style={{marginBottom: props.marginBottom}} className="quote-container">
            <span className="quote-text">&ldquo;{props.quote}&rdquo;</span>
            <span className="source-text">{props.source}</span>
        </div>
    );
}
