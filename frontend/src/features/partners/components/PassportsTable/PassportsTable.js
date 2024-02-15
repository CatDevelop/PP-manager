import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {App, Button, Dropdown, Input, Menu, Space, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./PassportsTable.module.css"
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {getAllTags} from "../../../../store/slices/tagsSlice";
import {useTags} from "../../../../hooks/use-tags";
import TagsCellEditor from "../TagsCellEditor/TagsCellEditor";

const {Column, ColumnGroup} = Table;
const {TextArea} = Input;

export default function PassportsTable(props) {
    const navigate = useNavigate()
    const {message} = App.useApp();
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const tags = useTags()

    useEffect(() => {
        dispatch(getAllTags())
    }, []);

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
                    placeholder={`Поиск`}
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

    const getUidPassportDropdown = (value, record) => [
        {
            key: '0',
            label: (
                <a target="_blank" href={"https://partner.urfu.ru/ptraining/services/learning/#/passport/" + record.id}>
                    Перейти к паспорту в ЛКП
                </a>
            ),
        },
        // {
        //     key: '1',
        //     label: (
        //         <Link to={"/partners/passport/" + record.id}>
        //             Перейти в PP-manager
        //         </Link>
        //     ),
        // },
    ]

    const getRequestUidPassportDropdown = (value, record) => [
        {
            key: '0',
            label: (
                <a target="_blank"
                   href={"https://partner.urfu.ru/ptraining/services/learning/#/requests/" + record.request_id}>
                    Перейти к заявке в ЛКП
                </a>
            ),
        },
        // {
        //     key: '1',
        //     label: (
        //         <Link to={"/partners/request/" + record.id}>
        //             Перейти в PP-manager
        //         </Link>
        //     ),
        // },
    ]

    return (
        <div className={styles.tableContainer}>
            <Table
                className={styles.table}
                bordered={true}
                dataSource={props.passports}
                size="small"
                scroll={{
                    y: "100%",
                    x: "max-content"
                }}
                pagination={{
                    pageSize: 30,
                    showSizeChanger: false
                }}
            >
                {
                    props.columns.map(column => {
                        if (column.key === "uid")
                            return (
                                <Column
                                    title="Номер паспорта"
                                    width={100}
                                    dataIndex="uid"
                                    key="uid"
                                    render={(value, record) => {
                                        return (
                                            <Dropdown
                                                trigger={['click']}
                                                menu={{
                                                    items: getUidPassportDropdown(value, record),
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    {value}
                                                </a>
                                            </Dropdown>
                                        )
                                    }}
                                    {...getColumnSearchProps("uid")}
                                />
                            )

                        if (column.key === "date")
                            return <Column
                                title="Дата паспорта"
                                width={120}
                                dataIndex="date"
                                key="date"
                                render={(value, record) => {
                                    return <p>
                                        {value.toLocaleDateString()}
                                    </p>
                                }}
                                sorter={(a, b) => a.date - b.date}
                                {...getColumnSearchProps("date_string")}
                            />

                        if (column.key === "request_uid")
                            return <Column
                                title="Номер заявки"
                                width={100}
                                dataIndex="request_uid"
                                key="request_uid"
                                render={(value, record) => {
                                    return (
                                        <Dropdown
                                            trigger={['click']}
                                            menu={{
                                                items: getRequestUidPassportDropdown(value, record),
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                {value}
                                            </a>
                                        </Dropdown>
                                    )
                                }}
                                {...getColumnSearchProps("request_uid")}
                            />

                        if (column.key === "request_date")
                            return <Column
                                title="Дата заявки"
                                width={120}
                                dataIndex="request_date"
                                key="request_date"
                                render={(value, record) => {
                                    return <p>
                                        {value.toLocaleDateString()}
                                    </p>
                                }}
                                sorter={(a, b) => a.request_date - b.request_date}
                                {...getColumnSearchProps("request_date_string")}
                            />

                        if (column.key === "short_name")
                            return <Column
                                title="Название"
                                width={250}
                                dataIndex="short_name"
                                key="short_name"
                                render={(value, record) => {
                                    return <p>
                                        {
                                            record.is_name_from_request &&
                                            <p className={styles.requestName__warning}>Из заявки</p>
                                        }
                                        {value}
                                    </p>
                                }}
                                sorter={(a, b) => a.short_name.localeCompare(b.short_name)}
                                {...getColumnSearchProps("short_name")}
                            />

                        if (column.key === "tags")
                            return (
                                <Column
                                    title="Теги"
                                    width={200}
                                    dataIndex="tags"
                                    key="tags"
                                    render={(value, record) => {
                                        return <TagsCellEditor
                                            value={value}
                                            tags={!tags.isLoading ? tags.tags : []}
                                            passport={record}
                                            passports={props.defaultPassports.passports}
                                        />
                                    }}
                                    filters={!tags.isLoading ? tags.tags.map(tag => ({
                                        text: tag.text,
                                        value: tag.id
                                    })) : []}
                                    onFilter={(value, record) => record.tags.find(t => t.id === value)}
                                />
                            )

                        if (column.key === "kind")
                            return <Column
                                title="Тип проекта"
                                width={90}
                                dataIndex="kind"
                                key="kind"
                                render={(value, record) => {
                                    return <Tag>{
                                        value === "KERN" ? "Ядерный проект" : value === "MONO" ? "Монопроект" : ""
                                    }</Tag>
                                }}
                                filters={[{text: "Монопроект", value: "MONO"}, {
                                    text: "Ядерный проект",
                                    value: "KERN"
                                },]}
                                onFilter={(value, record) => record.kind === value}
                            />

                        if (column.key === "status")
                            return <Column
                                title="Статус"
                                width={90}
                                dataIndex="status"
                                key="status"
                                {...getColumnSearchProps("status")}
                            />

                        if (column.key === "course")
                            return <Column
                                title="Курсы"
                                width={50}
                                dataIndex="course"
                                key="course"
                                render={(value, record) => {
                                    return <>
                                        {
                                            value.map(course => {
                                                return <Tag>{course.name}</Tag>
                                            })
                                        }

                                    </>
                                }}
                                filters={[{text: "1 курс", value: 1}, {text: "2 курс", value: 2}, {
                                    text: "3 курс",
                                    value: 3
                                }, {text: "4 курс", value: 4},]}
                                onFilter={(value, record) => record.course.filter(course => course.number === value).length !== 0}
                            />

                        if (column.key === "request_goal")
                            return <Column
                                title="Цель"
                                width={200}
                                dataIndex="request_goal"
                                key="request_goal"
                                render={(value, record) => {
                                    return <div dangerouslySetInnerHTML={{__html: value}}/>
                                }}
                                {...getColumnSearchProps("request_goal")}
                            />

                        if (column.key === "request_result")
                            return <Column
                                title="Результат"
                                width={200}
                                dataIndex="request_result"
                                key="request_result"
                                render={(value, record) => {
                                    return <div dangerouslySetInnerHTML={{__html: value}}/>
                                }}
                                {...getColumnSearchProps("request_result")}
                            />

                        if (column.key === "request_description")
                            return <Column
                                title="Описание"
                                width={500}
                                dataIndex="request_description"
                                key="request_description"
                                render={(value, record) => {
                                    return <div dangerouslySetInnerHTML={{__html: value}}/>
                                }}
                                {...getColumnSearchProps("request_description")}
                            />

                        if (column.key === "request_criteria")
                            return <Column
                                title="Критерии оценивания"
                                width={300}
                                dataIndex="request_criteria"
                                key="request_criteria"
                                render={(value, record) => {
                                    return <div dangerouslySetInnerHTML={{__html: value}}/>
                                }}
                                {...getColumnSearchProps("request_criteria")}
                            />

                        if (column.key === "customer_company_name")
                            return <Column
                                title="Заказчик"
                                width={200}
                                dataIndex="customer_company_name"
                                key="customer_company_name"
                                {...getColumnSearchProps("customer_company_name")}
                            />

                        if (column.key === "customer_name")
                            return <Column
                                title="Представитель заказчика"
                                width={140}
                                dataIndex="customer_name"
                                key="customer_name"
                                {...getColumnSearchProps("customer_name")}
                            />

                        if (column.key === "available_seats_number")
                            return <Column
                                title="Количество мест"
                                width={110}
                                dataIndex="available_seats_number"
                                key="available_seats_number"
                                sorter={(a, b) => a.available_seats_number - b.available_seats_number}
                            />
                    })
                }
                {/*<Column*/}
                {/*    width={90}*/}
                {/*    title="Действие"*/}
                {/*    key="action"*/}
                {/*    render={(value, record) => {*/}
                {/*        return <Space size="middle">*/}
                {/*            <a*/}
                {/*                onClick={() => {*/}
                {/*                    props.setIsPassportEditOpen(true);*/}
                {/*                    props.setEditPassportId(record.id)*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Редактировать*/}
                {/*            </a>*/}
                {/*        </Space>*/}
                {/*    }}*/}
                {/*/>*/}
            </Table>
        </div>
    );
};
