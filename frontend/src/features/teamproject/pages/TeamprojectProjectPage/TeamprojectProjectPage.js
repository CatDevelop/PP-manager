import SideBar from "../../../../components/SideBar/SideBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {App, Breadcrumb, Descriptions, Tag, Typography} from "antd";
import {useTeamproject} from "../../../../hooks/use-teamproject";
import {ArrowLeftOutlined, FundProjectionScreenOutlined} from "@ant-design/icons";
import styles from "./TeamprojectProjectPage.module.css"
import React from "react";

const {Title} = Typography;


export function TeamprojectProjectPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const teamproject = useTeamproject()

    const project = teamproject.projects.find(project => project.project.id === id)

    console.log(project)
    if (teamproject.isLoading)
        return (
            <div>
                <SideBar selectedKeys={["TeamprojectProjects"]}/>
            </div>
        )


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
                    {project.project.title}
                </Title>
            </div>
            <div className={styles.tags}>
                <Tag color={project.results.status.isProjectCompleted ? "gray" : "green"} >
                    {
                        project.results.status.isProjectCompleted ? "Завершённый" : "Активный"
                    }
                </Tag>
                <Tag color={project.documents.reportId ? "green" : "red"}>
                    {
                        project.documents.reportId ? "Есть отчёт" : "Нет отчёта"
                    }
                </Tag>
                <Tag color={project.documents.presentationId ? "green" : "red"}>
                    {
                        project.documents.presentationId ? "Есть презентация" : "Нет презентации"
                    }
                </Tag>
                <Tag color={project.results.expertsScore ? "green" : "red"}>
                    {
                        project.results.expertsScore ? "Есть оценка комиссии" : "Нет оценки комиссии"
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
                        children: project.details.shortTitle,
                    },
                    {
                        key: '2',
                        label: 'Название для диплома',
                        children: project.details.titleForDiploma,
                    },
                    {
                        key: '3',
                        label: 'Уровень сложности',
                        children: project.details.level,
                    },
                    {
                        key: '4',
                        label: 'Описание',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.description}}/>,
                        className: styles.lists
                    },
                    {
                        key: '5',
                        label: 'Цель',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.goal}}/>,
                        className: styles.lists
                    },
                    {
                        key: '6',
                        label: 'Требуемый результат',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.result}}/>,
                        className: styles.lists
                    },
                    {
                        key: '7',
                        label: 'Критерии оценки',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.criteria}}/>,
                        className: styles.lists
                    },
                    {
                        key: '8',
                        label: 'Список формируемых компетенций',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.competences}}/>,
                        className: styles.lists
                    },
                    {
                        key: '9',
                        label: 'Организация заказчика',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.customerOrganizationName}}/>,
                    },
                    {
                        key: '10',
                        label: 'ФИО заказчика',
                        children: <div dangerouslySetInnerHTML={{__html: project.details.customerPersonName}}/>,
                    },
                    {
                        key: '11',
                        label: 'Образовательная программа',
                        children: project.details.program.code + " " + project.details.program.title
                    },
                    {
                        key: '12',
                        label: 'Главный руководитель образовательной программы',
                        children: project.details.program.programHead.fullname
                    },
                    {
                        key: '13',
                        label: 'Период выполнения',
                        children: `${project.details.period.term === 1 ? "Осенний" : "Весенний"} семестр ${project.details.period.year}/${project.details.period.year + 1} учебного года`
                    },

                ]}/>
        </div>
    )
}
