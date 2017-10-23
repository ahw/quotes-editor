import React from 'react';
import QuoteAndSourceInline from './QuoteAndSourceInline';
import QuoteAndSource from './QuoteAndSource';

export default function QuoteContainer(props) {
    let style = {
        background: props.invertedColors ? props.color : props.backgroundColor,
        color: props.invertedColors ? props.backgroundColor : props.color,
        padding: `40px ${props.padding}px`,
        // width: '100vw',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
    }
    
    
    let children = props.quotes.map(item => {
        return (<QuoteAndSource
                    key={item.quote + item.source}
                    {...item}
                    {...props}/>)
    });
    
    return <div
               onClick={props.onClick}
               style={style} id="all-quotes-container">{children}</div>
}

