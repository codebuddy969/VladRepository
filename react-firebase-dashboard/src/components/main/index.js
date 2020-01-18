import React from 'react';
import './index.css';

import Navbar from './navbar';
import Content from './content';

const Main = (props) => {
    return (
        <div className='main'>
            <Navbar />
            <Content />
        </div>
    )
}

export default Main;