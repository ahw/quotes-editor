import React from 'react';
import BackgroundUploader from './BackgroundUploader';

/**
 * Usage:
 *
 * <Control
 *     label="Padding"
 *     type="number"
 *     value={props.padding}
 *     onChange={props.onLayoutChange.bind(this, 'padding')} />
 */
export default function Control(props) {
    const { label, type, value, min, max, onChange, step } = props;
    const checkedProp = type === 'checkbox' && !!value ? { checked: true } : {};
    return (
        <div className="control">
            <label className="control-label">{label}</label>
            <input className="control-input" value={value} {...checkedProp} step={step || 1} type={type} min={min || 0} max={max || 100} onChange={onChange} />
        </div>
    );
}
