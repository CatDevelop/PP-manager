import {useNavigate} from "react-router-dom";
import {Menu} from "antd";
import {FundProjectionScreenOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import styles from './SideBar.module.css';
import {useCallback} from "react";

export default function SideBar(props) {
    const navigate = useNavigate();

    const getItem = useCallback((label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }, [])

    const topMenu = [
        // getItem('Основная', 'Home', <HomeOutlined/>),
        // {type: 'divider'},
        getItem('Проекты', 'TeamprojectProjects', <FundProjectionScreenOutlined />),
        // getItem('Пользователи', 'TeamprojectUsers', <UserOutlined />),
    ];

    const onClick = (item) => {
        switch (item.key) {
            case 'Home':
                navigate('/')
                break
            case 'TeamprojectProjects':
                navigate('/teamproject/projects')
                break
            case 'TeamprojectUsers':
                navigate('/teamproject/users')
                break
            default:
                navigate('/')
                break
        }
    }

    return (
        <div className={styles.menu}>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="light"
                inlineCollapsed={true}
                className={styles.menu__buttons}
                items={topMenu}
                selectedKeys={props.selectedKeys ?? []}
                onClick={onClick}
            />
        </div>
    )
}
