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
        <Control label="Display inline" type="checkbox" value={props.layoutStyles.inline} onChange={props.onLayoutChange.bind(this, 'inline', !props.layoutStyles.inline)} />
        <Control label="Invert colors" type="checkbox" value={props.invertedColors} onChange={props.onInvertColors} />
        <Control label="Toggle overlay" type="checkbox" value={props.showOverlay} onChange={props.onOverlayToggle} />
        <Control label="Hide source" type="checkbox" value={props.hideSource} onChange={props.onHideSource} />
        <Control label="Background image" type="file" onChange={props.onFileSelect} />
        <Control label="background-repeat" type="text" value={props.layoutStyles.backgroundRepeat} onChange={props.onLayoutChange.bind(this, 'backgroundRepeat')} />
        <Control label="background-position" type="text" value={props.layoutStyles.backgroundPosition} onChange={props.onLayoutChange.bind(this, 'backgroundPosition')} />
        <Control label="background-size" type="text" value={props.layoutStyles.backgroundSize} onChange={props.onLayoutChange.bind(this, 'backgroundSize')} />
        <Control label="Background color" type="color" value={props.layoutStyles.backgroundColor} onChange={props.onLayoutChange.bind(this, 'backgroundColor')} />
        <Control label="Overlay color" type="color" value={props.layoutStyles.overlayColor} onChange={props.onLayoutChange.bind(this, 'overlayColor')} />
        <Control label="Overlay opacity" type="range" step={0.02} min={0} max={1} value={props.layoutStyles.opacity} onChange={props.onLayoutChange.bind(this, 'opacity')} />
        <Control label="Text color" type="color" value={props.layoutStyles.color} onChange={props.onLayoutChange.bind(this, 'color')} />
        <Control label="Quote spacing" type="range" value={props.layoutStyles.marginBottom} min={-40} max={100} onChange={props.onLayoutChange.bind(this, 'marginBottom')} />
        <Control label="Right/left margins" type="range" min={0} max={200} value={props.layoutStyles.paddingRightLeft} onChange={props.onLayoutChange.bind(this, 'paddingRightLeft')} />
        <Control label="Top/bottom margins" type="range" min={0} max={200} value={props.layoutStyles.paddingTopBottom} onChange={props.onLayoutChange.bind(this, 'paddingTopBottom')} />
        <Control label="Source top margin" type="range" min={0} max={50} value={props.layoutStyles.sourceTopMargin} onChange={props.onLayoutChange.bind(this, 'sourceTopMargin')} />
        <Control label="Inner padding" type="range" min={0} max={100} value={props.layoutStyles.quoteAndSourcePadding} onChange={props.onLayoutChange.bind(this, 'quoteAndSourcePadding')} />
        <Control label="Border radius" type="range" min={0} max={50} value={props.layoutStyles.borderRadius} onChange={props.onLayoutChange.bind(this, 'borderRadius')} />
        <Control label="Inline line height" type="range" min={0} max={10} step={0.01} value={props.layoutStyles.lineHeight} onChange={props.onLayoutChange.bind(this, 'lineHeight')} />
        <Control label="Inline spacing" type="range" value={props.layoutStyles.inlineSpacing} min={0} max={50} onChange={props.onLayoutChange.bind(this, 'inlineSpacing')} />
    </div>);
}
