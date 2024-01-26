import SideBar from "../../../../components/SideBar/SideBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {App, Breadcrumb, Descriptions, Tag, Typography} from "antd";
import {useTeamproject} from "../../../../hooks/use-teamproject";
import {ArrowLeftOutlined, FundProjectionScreenOutlined} from "@ant-design/icons";
import styles from "./TeamprojectProjectPage.module.css"
import React, {useEffect} from "react";
import {useProject} from "../../../../hooks/use-project";
import {getProject} from "../../../../store/slices/projectSlice";

const {Title} = Typography;

export function TeamprojectProjectPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const project = useProject()

    useEffect(() => {
        dispatch(getProject({id}))
    }, [])

    console.log(project)
    if (project.isLoading)
        return (
            <div>
                <SideBar selectedKeys={["TeamprojectProjects"]}/>
            </div>
        )

    let results = JSON.parse(project.project.results)
    let documents = JSON.parse(project.project.documents)
    let details = JSON.parse(project.project.details)
    let team = JSON.parse(project.project.team)

    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["TeamprojectProjects"]}/>
            <Breadcrumb items={[
                {
                    title: <Link to={"/teamproject/projects"}><ArrowLeftOutlined/> Назад</Link>,
                }
            ]}/>

            <div>
                <Title className={styles.title} level={3}>
                    <FundProjectionScreenOutlined className={styles.title__icon}/>
                    {details.title}
                </Title>
            </div>
            <div className={styles.tags}>
                <Tag color={results.status.isProjectCompleted ? "gray" : "green"} >
                    {
                        results.status.isProjectCompleted ? "Завершённый" : "Активный"
                    }
                </Tag>
                <Tag color={documents.reportId ? "green" : "red"}>
                    {
                        documents.reportId ? "Есть отчёт" : "Нет отчёта"
                    }
                </Tag>
                <Tag color={documents.presentationId ? "green" : "red"}>
                    {
                        documents.presentationId ? "Есть презентация" : "Нет презентации"
                    }
                </Tag>
                <Tag color={results.expertsScore ? "green" : "red"}>
                    {
                        results.expertsScore ? "Есть оценка комиссии" : "Нет оценки комиссии"
                    }
                </Tag>
            </div>

            <Descriptions
                bordered
                column={1}
                size={"small"}
                items={[
                    {
                        key: '1',
                        label: 'Краткое название',
                        children: details.shortTitle,
                    },
                    {
                        key: '2',
                        label: 'Название для диплома',
                        children: details.titleForDiploma,
                    },
                    {
                        key: '3',
                        label: 'Уровень сложности',
                        children: details.level,
                    },
                    {
                        key: '4',
                        label: 'Описание',
                        children: <div dangerouslySetInnerHTML={{__html: details.description}}/>,
                        className: styles.lists
                    },
                    {
                        key: '5',
                        label: 'Цель',
                        children: <div dangerouslySetInnerHTML={{__html: details.goal}}/>,
                        className: styles.lists
                    },
                    {
                        key: '6',
                        label: 'Требуемый результат',
                        children: <div dangerouslySetInnerHTML={{__html: details.result}}/>,
                        className: styles.lists
                    },
                    {
                        key: '7',
                        label: 'Критерии оценки',
                        children: <div dangerouslySetInnerHTML={{__html: details.criteria}}/>,
                        className: styles.lists
                    },
                    {
                        key: '8',
                        label: 'Список формируемых компетенций',
                        children: <div dangerouslySetInnerHTML={{__html: details.competences}}/>,
                        className: styles.lists
                    },
                    {
                        key: '9',
                        label: 'Организация заказчика',
                        children: <div dangerouslySetInnerHTML={{__html: details.customerOrganizationName}}/>,
                    },
                    {
                        key: '10',
                        label: 'ФИО заказчика',
                        children: <div dangerouslySetInnerHTML={{__html: details.customerPersonName}}/>,
                    },
                    {
                        key: '11',
                        label: 'Образовательная программа',
                        children: details.program.code + " " + details.program.title
                    },
                    {
                        key: '12',
                        label: 'Главный руководитель образовательной программы',
                        children: details.program.programHead.fullname
                    },
                    {
                        key: '13',
                        label: 'Период выполнения',
                        children: `${details.period.term === 1 ? "Осенний" : "Весенний"} семестр ${details.period.year}/${details.period.year + 1} учебного года`
                    },
                ]}/>
        </div>
    )
}
