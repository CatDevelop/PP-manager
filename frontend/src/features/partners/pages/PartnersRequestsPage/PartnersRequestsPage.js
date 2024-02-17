import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {App, Button, Select, Spin} from "antd";
import styles from './PartnersRequestsPage.module.css'
import {removeProject} from "../../../../store/slices/projectSlice";
import RequestsTableSettings from "../../components/RequestsTableSettings/RequestsTableSettings";
import {useRequests} from "../../../../hooks/use-requests";
import {getAllRequests} from "../../../../store/slices/requestsSlice";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import {removeProjects} from "../../../../store/slices/projectsSlice";
import {removePassports} from "../../../../store/slices/passportsSlice";

export const initialRequestsTableColumns = [
    {
        key: 'uid',
        name: 'Номер',
    },
    {
        key: 'date',
        name: 'Дата',
    },
    {
        key: 'name',
        name: 'Название',
    },
    {
        key: 'goal',
        name: 'Цель',
    },
    {
        key: 'result',
        name: 'Результат',
    },
    {
        key: 'description',
        name: 'Описание',
    },
    {
        key: 'criteria',
        name: 'Критерии оценивания',
    },
    {
        key: 'status',
        name: 'Статус',
    },
    {
        key: 'tags',
        name: 'Теги',
    },
    {
        key: 'students_count',
        name: 'Количество студентов',
    },
    {
        key: 'customer_company_name',
        name: 'Заказчик',
    },
    {
        key: 'customer_name',
        name: 'Представитель заказчика',
    },
    {
        key: 'max_copies',
        name: 'Максимальное количество копий',
    },
]

export function PartnersRequestsPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();

    const [isParseModalOpen, setIsParseModalOpen] = useState(false);
    const [isSettingsTableOpen, setIsSettingsTableOpen] = useState(false);
    const [requestsTable, setRequestsTable] = useState([])
    const [requestsTableColumns, setRequestsTableColumns] = useState(
        JSON.parse(localStorage.getItem("PP-manager-requests-columns")) ||
        initialRequestsTableColumns
    )

    const [year, setYear] = useState(2023)
    const [term, setTerm] = useState(1)

    const handleChangeYear = (value) => {
        setYear(value)
    }

    const handleChangeTerm = (value) => {
        setTerm(value)
    }

    const requests = useRequests()

    useEffect(() => {
        dispatch(getAllRequests({period_id: 8}))
    }, [year, term]);

    useEffect(() => {
        dispatch(removeProject())
        dispatch(removePassports())
    }, []);

    useEffect(() => {
        setRequestsTable(requests.requests.map(request => ({
            id: request.id,
            uid: request.uid,
            name: request.name,
            goal: request.goal,
            result: request.result,
            description: request.description,
            criteria: request.criteria,
            date: new Date(Date.parse(request.date)),
            date_string: new Date(Date.parse(request.date)).toLocaleDateString(),
            max_copies: request.max_copies,
            status: request.status,
            period: request.period_id,
            tags: request.tags,
            customer_id: request.customer_user.id,
            customer_name: (request.customer_user.first_name || "") + " " + (request.customer_user.last_name || "") + " " + (request.customer_user.middle_name || ""),
            customer_first_name: request.customer_user.first_name,
            customer_last_name: request.customer_user.last_name,
            customer_middle_name: request.customer_user.middle_name,
            customer_company_name: request.customer_user.customer_company.name,
            students_count: request.students_count
        })))
    }, [requests.requests])

    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["PartnersRequests"]}/>

            <h1 className={styles.title}>Заявки</h1>
            <div className={styles.header}>
                <div className={styles.filters}>
                    <Select
                        defaultValue={2023}
                        onChange={handleChangeYear}
                        options={[
                            {value: 2023, label: '2023/2024'},
                            {value: 2022, label: '2022/2023'},
                            {value: 2021, label: '2021/2022'},
                            {value: 2020, label: '2020/2021'},
                            {value: 2019, label: '2019/2020'},
                            {value: 2018, label: '2018/2019'},
                        ]}
                    />

                    <Select
                        defaultValue={2}
                        onChange={handleChangeTerm}
                        options={[
                            {value: 1, label: 'Осенний'},
                            {value: 2, label: 'Весенний'},
                        ]}
                    />
                </div>

                {/*<div className={styles.buttons}>*/}
                {/*    <Button*/}
                {/*        type="primary"*/}
                {/*        onClick={() => setIsParseModalOpen(true)}*/}
                {/*    >*/}
                {/*        Обновить информацию*/}
                {/*    </Button>*/}
                {/*</div>*/}

                <div className={styles.buttons}>
                    <Button
                        onClick={() => setIsSettingsTableOpen(true)}
                    >
                        Настроить таблицу
                    </Button>
                </div>
            </div>

            {
                requests.isLoading ?
                    <Spin/> :
                    <RequestsTable
                        defaultRequests={requests}
                        requests={requestsTable}
                        columns={requestsTableColumns}
                    />
            }

            <RequestsTableSettings
                isOpen={isSettingsTableOpen}
                setIsOpen={setIsSettingsTableOpen}

                tableColumns={requestsTableColumns}
                setTableColumns={setRequestsTableColumns}
            />
        </div>
    )
}
