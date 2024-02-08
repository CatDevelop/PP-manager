import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {App, Button, Input, Space, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./PassportsTable.module.css"
import {SearchOutlined} from "@ant-design/icons";

const {Column, ColumnGroup} = Table;
const {TextArea} = Input;

export default function PassportsTable(props) {
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

    return (
        <div className={styles.tableContainer}>
            <Table
                className={styles.table}
                bordered={true}
                dataSource={props.passports}
                size="small"
                scroll={{
                    y: "100%",
                    x: 90
                }}
                pagination={{
                    pageSize: 30,
                    showSizeChanger: false
                }}
            >
                {
                    props.columns.map(column => {
                        if (column.key === "uid")
                            return <Column
                                title="Номер паспорта"
                                width={90}
                                dataIndex="uid"
                                key="uid"
                                render={(value, record) => {
                                    return <a
                                        target="_blank"
                                        href={"https://partner.urfu.ru/ptraining/services/learning/#/passport/" + record.id}
                                    >
                                        {value}
                                    </a>
                                }}
                                {...getColumnSearchProps("uid")}
                            />

                        if (column.key === "date")
                            return <Column
                                title="Дата паспорта"
                                width={80}
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
                                width={90}
                                dataIndex="request_uid"
                                key="request_гid"
                                render={(value, record) => {
                                    return <a
                                        target="_blank"
                                        href={"https://partner.urfu.ru/ptraining/services/learning/#/requests/" + record.request_id}
                                    >
                                        {value}
                                    </a>
                                }}
                                {...getColumnSearchProps("request_гid")}
                            />

                        if (column.key === "request_date")
                            return <Column
                                title="Дата заявки"
                                width={80}
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
                                width={200}
                                dataIndex="short_name"
                                key="short_name"
                                sorter={(a, b) => a.short_name.localeCompare(b.short_name)}
                                {...getColumnSearchProps("short_name")}
                            />

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

                        if (column.key === "customer_company_name")
                            return <Column
                                title="Заказчик"
                                width={90}
                                dataIndex="customer_company_name"
                                key="customer_company_name"
                                {...getColumnSearchProps("customer_company_name")}
                            />

                        if (column.key === "customer_name")
                            return <Column
                                title="Представитель заказчика"
                                width={90}
                                dataIndex="customer_name"
                                key="customer_name"
                                {...getColumnSearchProps("customer_name")}
                            />

                        if (column.key === "available_seats_number")
                            return <Column
                                title="Количество мест"
                                width={90}
                                dataIndex="available_seats_number"
                                key="available_seats_number"
                                sorter={(a, b) => a.available_seats_number - b.available_seats_number}
                            />
                    })
                }
            </Table>
        </div>
    );
};
