import React from 'react';

export default function(props) {
    return (
        <div>
            <input onChange={props.onChange} type="file" id="files" name="files[]" multiple />
        </div>
    );
}

