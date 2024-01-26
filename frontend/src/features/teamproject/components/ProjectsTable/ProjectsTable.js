import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {App, Avatar, Button, Input, Modal, Space, Table, Tag, Tooltip} from "antd";
import {parseProjects} from "../../../../store/slices/teamprojectSlice";
import {useDispatch} from "react-redux";
import styles from "./ProjectsTable.module.css"
import {LinkOutlined, SearchOutlined} from "@ant-design/icons";
import {useProjects} from "../../../../hooks/use-projects";
import {getAllProjects} from "../../../../store/slices/projectsSlice";

const {Column, ColumnGroup} = Table;
const {TextArea} = Input;

export default function ProjectsTable(props) {
    const navigate = useNavigate()
    const {message} = App.useApp();
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm({
            closeDropdown: false,
        });
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Поиск по названию`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Найти
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    });

    return (
        <div className={styles.tableContainer}>
            <Table
                className={styles.table}
                bordered={true}
                dataSource={props.projects}
                size="small"
                scroll={{
                    y: "100%",
                    x: false
                }}
                pagination={{
                    pageSize: 30,
                    showSizeChanger: false
                }}
            >
                <Column
                    title="Паспорт"
                    width={90}
                    dataIndex="passport"
                    key="passport"
                    {...getColumnSearchProps("passport")}
                />
                <Column
                    title="Название"
                    width={300}
                    dataIndex="name"
                    key="name"
                    render={(value, record) => {
                        return <div className={styles.nameItem}>
                            <p>{value}</p>
                            <a href={"https://teamproject.urfu.ru/,#/" + record.id + "/about"} target="_blank">
                                <LinkOutlined className={styles.link}/>
                            </a>
                        </div>
                    }}
                    {...getColumnSearchProps("name")}
                />
                <Column
                    title="Участники"
                    width={200}
                    dataIndex="students"
                    key="students"
                    render={(value, record) => {
                        return <Avatar.Group className={styles.students}>
                            {
                                JSON.parse(value || "[]").map(student => {
                                    return <Tooltip title={student.fullname} placement="top">
                                        <Avatar
                                            onClick={() => navigate(`/teamproject/users/${student.id}`)}
                                            style={{
                                                backgroundColor: "rgba(174, 126, 222, 0.6)",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {student.fullname.split(" ")[0][0]}{student.fullname.split(" ")[1][0]}
                                        </Avatar>
                                    </Tooltip>
                                })
                            }

                        </Avatar.Group>
                    }}
                    {...getColumnSearchProps("students")}
                />
                <Column title="Куратор" width={200} dataIndex="curator" key="curator"
                        {...getColumnSearchProps("curator")}
                />
                {/*<Column title="Год" width={"50px"} dataIndex="year" key="year"/>*/}
                {/*<Column title="Семестр" width={"80px"} dataIndex="semester" key="semester"/>*/}
                <Column
                    title="Отчет"
                    width={110}
                    dataIndex="isHaveReport"
                    key="isHaveReport"
                    render={(value, record) => {
                        return value ? "Да" : "Нет"
                    }}
                    filters={[{text: "Да", value: true}, {text: "Нет", value: false},]}
                    onFilter={(value, record) => record.isHaveReport === value}
                />
                <Column
                    title="Презентация"
                    width={120}
                    dataIndex="isHavePresentation"
                    key="isHavePresentation"
                    render={(value, record) => {
                        return value ? "Да" : "Нет"
                    }}
                    filters={[{text: "Да", value: true}, {text: "Нет", value: false},]}
                    onFilter={(value, record) => record.isHavePresentation === value}
                />
                <Column
                    width={100}
                    title="Оценка комиссии"
                    dataIndex="comissionScore"
                    key="comissionScore"
                    render={(value, record) => {
                        return value === null ? "Нет оценки" : value
                    }}
                    filters={[{text: "Есть оценка", value: true}, {text: "Нет оценки", value: false}]}
                    onFilter={(value, record) => {
                        return value ?
                            record.comissionScore !== null :
                            record.comissionScore === null;
                    }}
                />
                <Column
                    title="Статус"
                    dataIndex="status"
                    key="status"
                    width={120}
                    render={(value) => {
                        return <Tag color={value === "Активный" ? "green" : "gray"}>{value}</Tag>
                    }}
                    filters={[{text: "Активный", value: "Активный"}, {text: "Завершённый", value: "Завершённый"},]}
                    onFilter={(value, record) => record.status.indexOf(value) === 0}
                />
                <Column
                    width={90}
                    title="Действие"
                    key="action"
                    render={(value, record) => {
                        return <Space size="middle">
                            <Link to={record.id}>К проекту</Link>
                        </Space>
                    }}
                />
            </Table>
        </div>
    );
};
