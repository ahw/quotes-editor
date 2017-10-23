import React from 'react';

export default function QuoteEditor(props) {
    const style = {
        width: '100%',
        height: '30vh',
        border: 'none',
        borderBottom: '1px solid gray',
        outline: 'none',
        boxSizing: 'border-box',
        padding: 5,
        fontSize: 16,
    }
    return <textarea style={style} value={props.rawText} onChange={props.onChange}/>
}

