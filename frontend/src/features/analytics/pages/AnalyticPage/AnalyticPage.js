import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {App, Card, Select, Statistic, Typography} from "antd";
import styles from "./AnalyticPage.module.css"
import React, {useEffect, useState} from "react";
import {getProject} from "../../../../store/slices/projectSlice";
import {useAnalytic} from "../../../../hooks/use-analytic";
import {getMainAnalytics} from "../../../../store/slices/analyticSlice";

const {Title} = Typography;

export function AnalyticPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const analytic = useAnalytic()

    const [year, setYear] = useState(2023)
    const [term, setTerm] = useState(1)

    const handleChangeYear = (value) => {
        setYear(value)
    }

    const handleChangeTerm = (value) => {
        setTerm(value)
    }

    useEffect(() => {
        dispatch(getMainAnalytics({period_id: 8}))
    }, [])

    if (analytic.isLoading)
        return (
            <div>
                <SideBar selectedKeys={["AlanyticPage"]}/>
            </div>
        )

    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["AlanyticPage"]}/>

            <h1 className={styles.title}>Аналитика</h1>
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
            </div>

            <div className={styles.cards}>
                <Card bordered={false}>
                    <Statistic
                        title="Количество заявок"
                        value={analytic.mainAnalytic.requests_count}
                    />
                </Card>
                <Card bordered={false}>
                    <Statistic
                        title="Количество паспортов"
                        value={analytic.mainAnalytic.passports_count}
                    />
                </Card>
                <Card bordered={false}>
                    <Statistic
                        title="Количество мест для записи"
                        value={analytic.mainAnalytic.available_seats_count}
                    />
                </Card>
            </div>
        </div>
    )
}
