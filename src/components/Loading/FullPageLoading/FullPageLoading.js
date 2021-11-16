import React from 'react';
import './FullPageLoading.sass';
import { BugTwoTone, ShopTwoTone } from '@ant-design/icons';

function FullPageLoading({ opacity = 1 }) {
    return (
        <div
            className="full-page-loading"
            style={{ backgroundColor: `rgba(255,255,255,${opacity})` }}
        >
            <BugTwoTone spin style={{ fontSize: '100px' }} />
            {/* <ShopTwoTone spin style={{ fontSize: '100px' }}/> */}
        </div>
    );
}

export default FullPageLoading;
