import React from 'react';
import 'components/Layout/ListHeader/ListHeader.sass'
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
function ListHeader(
    {
        title = "",
        children
    }
) {
    const { t } = useTranslation();
    return (
        <div className="list-header">
            <div className="list-header__text">
                {title}
            </div>
            <div className="list-header__redirect">
                {children}
            </div>
        </div>
    );
}

export default ListHeader;