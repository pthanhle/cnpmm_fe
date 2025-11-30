import React from 'react';
import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const items = [
        {
            key: 'vi',
            label: 'Tiếng Việt',
            onClick: () => changeLanguage('vi'),
        },
        {
            key: 'en',
            label: 'English',
            onClick: () => changeLanguage('en'),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <Button
                type="text"
                icon={<GlobalOutlined className="text-lg" />}
                className="!text-gray-800 dark:!text-white flex items-center justify-center"
            >
                <span className="ml-1 uppercase font-bold">{i18n.language || 'vi'}</span>
            </Button>
        </Dropdown>
    );
};

export default LanguageSwitch;