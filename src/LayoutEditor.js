import React from 'react';
import Control from './Control';
import BackgroundUploader from './BackgroundUploader';

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

    return (<div style={{padding: 5}}>
        <Control label="Extra CSS" type="text" value={props.extraCss} onChange={props.onCssChange.bind(this)} />
        <Control label="Invert colors" type="checkbox" value={props.invertColors} onChange={props.onInvertColors} />
        <Control label="Toggle overlay" type="checkbox" value={props.showOverlay} onChange={props.onOverlayToggle} />
        <Control label="Background image" type="file" onChange={props.onFileSelect} />
        <Control label="background-repeat" type="text" value={props.layoutStyles.backgroundRepeat} onChange={props.onLayoutChange.bind(this, 'backgroundRepeat')} />
        <Control label="background-position" type="text" value={props.layoutStyles.backgroundPosition} onChange={props.onLayoutChange.bind(this, 'backgroundPosition')} />
        <Control label="background-size" type="text" value={props.layoutStyles.backgroundSize} onChange={props.onLayoutChange.bind(this, 'backgroundSize')} />
        <Control label="Background color" type="color" value={props.layoutStyles.backgroundColor} onChange={props.onLayoutChange.bind(this, 'backgroundColor')} />
        <Control label="Background opacity" type="range" step={0.02} min={0} max={1} value={props.layoutStyles.opacity} onChange={props.onLayoutChange.bind(this, 'opacity')} />
        <Control label="Text color" type="color" value={props.layoutStyles.color} onChange={props.onLayoutChange.bind(this, 'color')} />
        <Control label="Quote spacing" type="range" value={props.layoutStyles.marginBottom} min={-40} max={100} onChange={props.onLayoutChange.bind(this, 'marginBottom')} />
        <Control label="Side margins" type="range" min={0} max={200} value={props.layoutStyles.padding} onChange={props.onLayoutChange.bind(this, 'padding')} />
    </div>);
}
