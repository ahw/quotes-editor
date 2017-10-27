import React from 'react';

export default function SpreadsheetDisplay(props) {
    let bgmatches = window.location.search.match(/bgcolor=(\w+)/)
    let fgmatches = window.location.search.match(/fgcolor=(\w+)/)
    let bgcolor = `#${bgmatches && bgmatches[1] || '000'}`
    let fgcolor = `#${fgmatches && fgmatches[1] || 'fff'}`
    let style = {
        background: props.invertedColors ? fgcolor : bgcolor,
        color: props.invertedColors ? bgcolor : fgcolor,
        padding: `40px ${props.padding}px`,
        width: '100vw',
        // display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
    }
    
    
    let children = props.quotes.map(item => {
        return item.quote + '\t' + item.source;
    }).join('\n');
    
    return <textarea onChange={() => true}style={style} value={children}/>
}
