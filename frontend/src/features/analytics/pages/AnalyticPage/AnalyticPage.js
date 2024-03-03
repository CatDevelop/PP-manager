import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {App, Card, Select, Statistic, Typography} from "antd";
import styles from "./AnalyticPage.module.css"
import React, {useEffect, useState} from "react";
import {getProject} from "../../../../store/slices/projectSlice";
import {useAnalytic} from "../../../../hooks/use-analytic";
import {getMainAnalytics} from "../../../../store/slices/analyticSlice";
import {getAllPeriods} from "../../../../store/slices/periodsSlice";
import {usePeriods} from "../../../../hooks/use-periods";

const {Title} = Typography;

export function AnalyticPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const analytic = useAnalytic()

    const [year, setYear] = useState(2023)
    const [term, setTerm] = useState(2)

    const handleChangeYear = (value) => {
        setYear(value)
    }

    const handleChangeTerm = (value) => {
        setTerm(value)
    }

    const periods = usePeriods()

    useEffect(() => {
        if (!periods.isLoading) {
            dispatch(getMainAnalytics({period_id: periods.periods.find(period => period.year === year && period.term === term).id}))
        }
    }, [year, term, periods])

    useEffect(() => {
        dispatch(getAllPeriods())
    }, []);

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
                        options={
                            [...new Set(periods.periods.map(period => period.year))].map(year => ({
                                value: year, label: `${year}/${year + 1}`
                            }))
                        }
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
