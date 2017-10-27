import React from 'react';

import Control from './Control';

export default function LayoutEditor(props) {

    const toggleLinkStyle = {
        background: 'white',
        border: '2px solid black',
        borderRadius: 2,
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'none',
        padding: 12,
        display: 'block',
        width: '100%',
        margin: '2px 0',
        boxSizing: 'border-box',
        fontSize: 14,
        textAlign: 'center',
    }
    
    return (<div style={{padding: 2}}>
        <Control label="Extra CSS" type="text" value={props.extraCss} onChange={props.onCssChange.bind(this)} />
        <Control label="Padding" type="range" min={0} max={200} value={props.layoutStyles.padding} onChange={props.onLayoutChange.bind(this, 'padding')} />
        <Control label="Background color" type="text" value={props.layoutStyles.backgroundColor} onChange={props.onLayoutChange.bind(this, 'backgroundColor')} />
        <Control label="Text color" type="text" value={props.layoutStyles.color} onChange={props.onLayoutChange.bind(this, 'color')} />
        <Control label="Margin" type="range" value={props.layoutStyles.margin} min={0} max={100} onChange={props.onLayoutChange.bind(this, 'margin')} />
        <Control label="Bottom margin" type="range" value={props.layoutStyles.marginBottom} min={-40} max={100} onChange={props.onLayoutChange.bind(this, 'marginBottom')} />
        <Control label="Toggle overlay" type="checkbox" value={props.showOverlay} onChange={props.onOverlayToggle} />
        <Control label="Invert colors" type="checkbox" value={props.invertColors} onChange={props.onInvertColors} />
    </div>);
}

