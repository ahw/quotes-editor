import React from 'react';

export default function QuoteAndSourceInline(props) {
    let containerStyle = {
        padding: '1px 4px',
        fontFamily: 'Georgia',
        marginBottom: 2, //props.marginBottom,
        display: 'inline',
        background: '#F6E14A',
        color: 'black',
        margin: '0 2px',
    }
    
    let sourceStyle = {
        display: 'block',
        textAlign: 'right',
        marginTop: 8,
        fontSize: '11px',
        fontFamily: 'Arial',
        display: 'none',
    }
    
    let quoteStyle = {
        fontWeight: 'normal',
        display: 'inline',
    }
    
    return (
        <div style={containerStyle} className="quote-container">
            <span style={quoteStyle} className="quote">{props.quote}</span>
            <span style={sourceStyle} className="source">{props.source}</span>
        </div>
    )
}
