import React from 'react';

export default function QuoteAndSource(props) {
    const containerStyle = {
        padding: '5px 10px',
        fontFamily: 'Georgia',
        marginBottom: props.marginBottom,
    }
    
    const sourceStyle = {
        display: 'block',
        textAlign: 'right',
        marginTop: 8,
        fontSize: '11px',
        fontFamily: 'Arial',
    }
    
    const quoteStyle = {
        fontWeight: 'normal',
        display: 'block',
    }
    
    return (
        <div style={containerStyle} className="quote-container">
            <span style={quoteStyle} className="quote">&ldquo;{props.quote}&rdquo;</span>
            <span style={sourceStyle} className="source">{props.source}</span>
        </div>
    );
}
