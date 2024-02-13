import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {App, Button, Input, Space, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./RequestsTable.module.css"
import {SearchOutlined} from "@ant-design/icons";

const {Column, ColumnGroup} = Table;
const {TextArea} = Input;

export default function RequestsTable(props) {
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
                dataSource={props.requests}
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
                            return <Column
                                title="Номер заявки"
                                width={80}
                                dataIndex="uid"
                                key="uid"
                                render={(value, record) => {
                                    return <a
                                        target="_blank"
                                        href={"https://partner.urfu.ru/ptraining/services/learning/#/requests/" + record.id}
                                    >
                                        {value}
                                    </a>
                                }}
                                {...getColumnSearchProps("uid")}
                            />

                        if (column.key === "date")
                            return <Column
                                title="Дата"
                                width={50}
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

                        if (column.key === "name")
                            return <Column
                                title="Название"
                                width={200}
                                dataIndex="name"
                                key="name"
                                sorter={(a, b) => a.name.localeCompare(b.name)}
                                {...getColumnSearchProps("name")}
                            />

                        if (column.key === "status")
                            return <Column
                                title="Статус"
                                width={90}
                                dataIndex="status"
                                key="status"
                                {...getColumnSearchProps("status")}
                            />


                        if (column.key === "customer_company_name")
                            return <Column
                                title="Заказчик"
                                width={150}
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

                        if (column.key === "max_copies")
                            return <Column
                                title="Максимальное количество копий"
                                width={90}
                                dataIndex="max_copies"
                                key="max_copies"
                                sorter={(a, b) => a.max_copies - b.max_copies}
                            />
                    })
                }
            </Table>
        </div>
    );
};
