import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {App, Button, Select, Spin} from "antd";
import styles from './PartnersPassportsPage.module.css'
import {removeProject} from "../../../../store/slices/projectSlice";
import {getAllPassports} from "../../../../store/slices/passportsSlice";
import {usePassports} from "../../../../hooks/use-passports";
import PassportsTable from "../../components/PassportsTable/PassportsTable";
import PassportsTableSettings from "../../components/PassportsTableSettings/PassportsTableSettings";
import PassportSettings from "../../components/PassportSettings/PassportSettings";
import {removePassport} from "../../../../store/slices/passportSlice";

export const initialPassportsTableColumns = [
    {
        key: 'uid',
        name: 'Номер паспорта',
    },
    {
        key: 'date',
        name: 'Дата паспорта',
    },
    {
        key: 'request_uid',
        name: 'Номер заявки',
    },
    {
        key: 'request_date',
        name: 'Дата заявки',
    },
    {
        key: 'short_name',
        name: 'Название',
    },
    {
        key: 'tags',
        name: 'Теги',
    },
    {
        key: 'kind',
        name: 'Тип проекта',
    },
    {
        key: 'request_goal',
        name: 'Цель',
    },
    {
        key: 'request_result',
        name: 'Результат',
    },
    {
        key: 'request_description',
        name: 'Описание',
    },
    {
        key: 'request_criteria',
        name: 'Критерии оценивания',
    },
    {
        key: 'status',
        name: 'Статус',
    },
    {
        key: 'course',
        name: 'Курсы',
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
        key: 'available_seats_number',
        name: 'Количество мест',
    },
]

export function PartnersPassportsPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();

    const [isParseModalOpen, setIsParseModalOpen] = useState(false);
    const [isSettingsTableOpen, setIsSettingsTableOpen] = useState(false);
    const [isPassportEditOpen, setIsPassportEditOpen] = useState(false);
    const [editPassportId, setEditPassportId] = useState(null);
    const [passportsTable, setPassportsTable] = useState([])
    const [passportsTableColumns, setPassportsTableColumns] = useState(
        JSON.parse(localStorage.getItem("PP-manager-passport-columns")) ||
        initialPassportsTableColumns
    )

    const [year, setYear] = useState(2023)
    const [term, setTerm] = useState(1)

    const handleChangeYear = (value) => {
        setYear(value)
    }

    const handleChangeTerm = (value) => {
        setTerm(value)
    }

    const passports = usePassports()

    useEffect(() => {
        if(!isPassportEditOpen) {
            dispatch(getAllPassports({period_id: 8}))
            dispatch(removePassport())
        }
    }, [year, term, isPassportEditOpen]);

    useEffect(() => {
        dispatch(removeProject())
    }, []);

    useEffect(() => {
        setPassportsTable(passports.passports.map(passport => ({
            id: passport.id,
            uid: passport.uid,
            short_name: passport.short_name || passport.request.name,
            is_name_from_request: !!!passport.short_name,
            diploma_name: passport.diploma_name,
            date: new Date(Date.parse(passport.date)),
            date_string: new Date(Date.parse(passport.date)).toLocaleDateString(),
            kind: passport.kind,
            status: passport.status,
            available_seats_number: passport.team_count * passport.students_count,
            team_count: passport.team_count,
            students_count: passport.students_count,
            request_id: passport.request.id,
            request_uid: passport.request.uid,
            request_date: new Date(Date.parse(passport.request.date)),
            request_date_string: new Date(Date.parse(passport.request.date)).toLocaleDateString(),
            request_goal: passport.request.goal,
            request_result: passport.request.result,
            request_description: passport.request.description,
            request_criteria: passport.request.criteria,
            course: passport.course,
            period: passport.request.period_id,
            customer_id: passport.request.customer_user.id,
            customer_name: (passport.request.customer_user.last_name || "") + " " + (passport.request.customer_user.first_name || "") + " " + (passport.request.customer_user.middle_name || ""),
            customer_first_name: passport.request.customer_user.first_name,
            customer_last_name: passport.request.customer_user.last_name,
            customer_middle_name: passport.request.customer_user.middle_name,
            customer_company_name: passport.request.customer_user.customer_company.name,
            tags: passport.request.tags
        })))
    }, [passports])

    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["PartnersPassports"]}/>

            <h1 className={styles.title}>Паспорта</h1>
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
                passports.isLoading ?
                    <Spin/> :
                    <PassportsTable
                        defaultPassports={passports}
                        passports={passportsTable}
                        columns={passportsTableColumns}
                        setIsPassportEditOpen={setIsPassportEditOpen}
                        setEditPassportId={setEditPassportId}
                    />
            }

            <PassportsTableSettings
                isOpen={isSettingsTableOpen}
                setIsOpen={setIsSettingsTableOpen}

                tableColumns={passportsTableColumns}
                setTableColumns={setPassportsTableColumns}
            />

            {
                editPassportId &&
                <PassportSettings
                    period_id={8}
                    isOpen={isPassportEditOpen}
                    setIsOpen={setIsPassportEditOpen}
                    editPassportId={editPassportId}
                    setEditPassportId={setEditPassportId}
                />
            }
        </div>
    )
}
