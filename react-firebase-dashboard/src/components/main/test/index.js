import React from 'react';

import composedHoc from './HOC/index';

const MyComponent = (props) => {
    return (
        <div>
            <h1>{props.data}</h1>
        </div>
    )
}

export default composedHoc(MyComponent);