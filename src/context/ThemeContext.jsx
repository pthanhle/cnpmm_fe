import React, { createContext, useState, useContext, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 1. Lấy trạng thái từ LocalStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('isDarkMode');
        return storedTheme === 'true';
    });

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    // 2. Effect cập nhật class vào thẻ HTML
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('isDarkMode', 'true');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('isDarkMode', 'false');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: '#1677ff',
                        colorBgLayout: isDarkMode ? '#141414' : '#f5f5f5',
                        colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
                    },
                    components: {
                        Layout: {
                            headerBg: isDarkMode ? '#001529' : '#ffffff',
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);