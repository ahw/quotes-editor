import React from 'react';
import QuoteAndSourceInline from './QuoteAndSourceInline';
import QuoteAndSource from './QuoteAndSource';

export default function QuoteContainer(props) {
    let style = {
        backgroundColor: props.invertedColors ? props.color : props.backgroundColor,
        color: props.invertedColors ? props.backgroundColor : props.color,
        backgroundImage: props.backgroundImage,
        backgroundRepeat: props.backgroundRepeat,
        backgroundPosition: props.backgroundPosition,
        backgroundSize: props.backgroundSize,
        padding: `40px ${props.padding}px`,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
    }


    let children = props.quotes.map(item => {
        return (
            <QuoteAndSource
                    key={item.quote + item.source}
                    marginBottom={props.marginBottom}
                    backgroundColor={props.backgroundColor}
                    opacity={props.opacity}
                    color={props.color}
                    invertedColors={props.invertedColors}
                    quote={item.quote}
                    source={item.source} />
        );
    });

    return <div style={style} id="all-quotes-container">{children}</div>
}

