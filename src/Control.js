import React from 'react';
// import Slider from './Slider';

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
    const { label, type, value, min, max, onChange } = props;
    console.log('Creating control with label', label, 'value', value);
    return (
        <div className="control">
            <label className="control-label">{label}</label>
            <input value={value} type={type} min={min || 0} max={max || 100} onChange={onChange} />
        </div>
    );
}
