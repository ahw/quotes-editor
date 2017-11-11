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
        display: props.inline ? 'block' : 'flex',
        flexDirection: props.inline ? 'row' : 'column',
        justifyContent: props.inline ? 'flex-start' : 'center',
        minHeight: props.inline ? 'auto' : '100vh',
        flexWrap: props.inline ? 'wrap' : 'nowrap',
        boxSizing: 'border-box',
        lineHeight: props.lineHeight,
    }


    let children = props.quotes.map(item => {
        return (
            <QuoteAndSource
                    key={item.quote + item.source}
                    marginBottom={props.marginBottom}
                    marginRight={props.marginRight}
                    padding={props.quoteAndSourcePadding}
                    sourceTopMargin={props.sourceTopMargin}
                    borderRadius={props.borderRadius}
                    backgroundColor={props.backgroundColor}
                    overlayColor={props.overlayColor}
                    opacity={props.opacity}
                    color={props.color}
                    invertedColors={props.invertedColors}
                    hideSource={props.hideSource}
                    inline={props.inline}
                    quote={item.quote}
                    source={item.source} />
        );
    });

    return <div style={style} id="all-quotes-container">{children}</div>
}

