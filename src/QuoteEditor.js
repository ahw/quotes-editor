import React from 'react';

export default function QuoteEditor(props) {
    return <textarea id="main-quote-editor" value={props.rawText} onChange={props.onChange}/>
}

