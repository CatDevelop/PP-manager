import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Spotlight} from "@mantine/spotlight";
import {FileAddOutlined, SearchOutlined} from "@ant-design/icons";
import {MantineProvider} from '@mantine/core';
import styles from "./MainLayout.module.css"

export default function MainLayout() {
    const navigate = useNavigate()

    let actions = [
        {
            title: 'Создать статью',
            description: 'Создать новую статью',
            onTrigger: () => navigate("/notes/0?createnote=1"),
            icon: <FileAddOutlined/>,
        },
        {
            title: 'Создать серию статей',
            description: 'Создать новую серию статей',
            onTrigger: () => navigate("/notes/0?creategroup=1"),
            icon: <FileAddOutlined/>,
        }
    ];

    return (
        <div>
            <MantineProvider theme={{colorScheme: 'dark'}}>
                {/*<Spotlight*/}
                {/*    shortcut={['mod + F']}*/}
                {/*    actions={actions}*/}
                {/*    limit={3}*/}
                {/*    searchProps={{*/}
                {/*        searchIcon: <SearchOutlined/>,*/}
                {/*        searchPlaceholder: "Поиск...",*/}
                {/*        nothingFoundMessage: "Ничего не найдено..."*/}
                {/*    }}*/}
                {/*>*/}
                    <div className={styles.mainLayout}>
                        <div className={styles.mainLayout__app}>
                            <Outlet/>
                        </div>
                    </div>
                {/*</Spotlight>*/}
            </MantineProvider>
        </div>
    );
};
