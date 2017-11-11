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
    const isCheckbox = type === 'checkbox';
    const checkedProp = (isCheckbox && !!value) ? { checked: true } : { checked: false };
    const labelEl = <label className="control-label">{label}</label>
    const inputEl = <input className="control-input" value={value} {...checkedProp} step={step || 1} type={type} min={min || 0} max={max || 100} onChange={onChange} />
    return (
        <div className="control" style={{ flexDirection: isCheckbox ? 'row' : 'column' }} >
            { isCheckbox ? inputEl : labelEl }
            { isCheckbox ? labelEl : inputEl }
        </div>
    );
}
