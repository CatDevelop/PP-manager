import React, {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {App, Avatar, Button, Input, Modal, Space, Table, Tag, Tooltip} from "antd";
import {parseProjects} from "../../../../store/slices/teamprojectSlice";
import {useDispatch} from "react-redux";
import styles from "./ProjectsTable.module.css"
import {LinkOutlined, SearchOutlined} from "@ant-design/icons";

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

    const data = props.projects.map(project => {
        let students = []
        project.team.thematicGroups.forEach((group, groupIndex) => {
            group.students.forEach((student, studentIndex) => {
                if (!students.find(s => s.key === student.userId))
                    students.push(
                        {
                            key: student.userId,
                            fullname: student.fullname
                        }
                    )
            })
        })

        return {
            key: project.project.id,
            passport: project.project.passportNumber,
            name: project.project.title,
            students: students,

            // project.project.students.map(student => ({fullname: student.fullname})),
            curator: project.project.mainCurator.fullname,
            year: project.details.period.year,
            semester: project.details.period.term,
            isHaveReport: project.documents.reportId ? "Да" : "Нет",
            isHavePresentation: project.documents.presentationId ? "Да" : "Нет",
            comissionScore: project.results.expertsScore || "Нет оценки",
            status: project.results.status.isProjectCompleted ? "Завершённый" : "Активный"
        }
    })

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Найти
                    </Button>
                    {/*<Button*/}
                    {/*    onClick={() => clearFilters && handleReset(clearFilters) }*/}
                    {/*    size="small"*/}
                    {/*    style={{*/}
                    {/*        width: 90,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Сбросить*/}
                    {/*</Button>*/}
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
                //virtual
                className={styles.table}
                bordered={true}
                dataSource={data}
                size="small"
                scroll={{
                    y: "75vh",
                    x: 'max-content'
                }}
                pagination={{
                    pageSize: 7,
                    showSizeChanger: false
                }}
            >
                <Column
                    title="Паспорт"
                    width={90}
                    dataIndex="passport"
                    key="passport"
                />
                <Column
                    title="Название"
                    width={300}
                    dataIndex="name"
                    key="name"
                    render={(value, record) => {
                        return <div className={styles.nameItem}>
                            <p>{value}</p>
                            <a href={"https://teamproject.urfu.ru/,#/"+record.key+"/about"} target="_blank"> <LinkOutlined className={styles.link}/></a>
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
                                value.map(student => {
                                    return <Tooltip title={student.fullname} placement="top">
                                        <Avatar
                                            onClick={() => navigate(`/teamproject/users/${student.key}`)}
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
                    filters={[{text: "Да", value: "Да"}, {text: "Нет", value: "Нет"},]}
                    onFilter={(value, record) => record.isHaveReport.indexOf(value) === 0}
                />
                <Column
                    title="Презентация"
                    width={120}
                    dataIndex="isHavePresentation"
                    key="isHavePresentation"
                    filters={[{text: "Да", value: "Да"}, {text: "Нет", value: "Нет"},]}
                    onFilter={(value, record) => record.isHavePresentation.indexOf(value) === 0}
                />
                <Column width={100} title="Оценка комиссии" dataIndex="comissionScore" key="comissionScore"/>
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
                            <Link to={record.key}>К проекту</Link>
                        </Space>
                    }}
                />
            </Table>
        </div>
    );
};
