import SideBar from "../../../../components/SideBar/SideBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {App, Breadcrumb, Descriptions, Tag, Typography} from "antd";
import {useTeamproject} from "../../../../hooks/use-teamproject";
import {ArrowLeftOutlined, FundProjectionScreenOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./TeamprojectUserPage.module.css"
import React from "react";

const {Title} = Typography;


export function TeamprojectUserPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const teamproject = useTeamproject()

    let students = []

    teamproject.projects.forEach(project => {
        project.team.thematicGroups.forEach((group, groupIndex) => {
            group.students.forEach((student, studentIndex) => {
                if(!students.find(s => s.key === student.userId))
                    students.push(
                        {
                            key: student.userId,
                            fullname: student.fullname,
                            group: student.groupName,
                            projectName: project.project.title,
                            projectKey: project.project.id,
                            curator: group.curator.fullname,
                            expertsScore: project.results.expertsScore || "Нет оценки",
                            finalScore: project.results.thematicGroups[groupIndex].students[studentIndex].finalScore || "Нет оценки",
                            retakedScore: project.results.thematicGroups[groupIndex].students[studentIndex].retakedScore || "Не пересдавал",
                        }
                    )
            })
        })
    })
    let student = students.find(s => s.key === +id)

    console.log(student)
    if (teamproject.isLoading || !student)
        return (
            <div>
                <SideBar selectedKeys={["TeamprojectProjects"]}/>
            </div>
        )


    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["TeamprojectUsers"]}/>
            <Breadcrumb items={[
                {
                    title: <Link to={"/teamproject/users"}><ArrowLeftOutlined/> Назад</Link>,

                }
            ]}/>

            <div>
                <Title className={styles.title} level={3}>
                    <UserOutlined className={styles.title__icon}/>
                    {student.fullname}
                </Title>
            </div>
            <div className={styles.tags}>
                <Tag color={student.expertsScore === "Нет оценки" ? "red" : "gray"} >
                    Оценка комиссии: {student.expertsScore}
                </Tag>
                <Tag color={student.finalScore === "Нет оценки" ? "red" : "gray"} >
                    Оценка студента: {student.finalScore}
                </Tag>
                <Tag color={student.retakedScore === "Не пересдавал" ? "green" : "gray"} >
                    Пересдача: {student.retakedScore}
                </Tag>
            </div>

            <Descriptions
                bordered
                column={1}
                size={"small"}
                items={[
                    {
                        key: '1',
                        label: 'ФИО',
                        children: student.fullname,
                    },
                    {
                        key: '2',
                        label: 'Группа',
                        children: student.group,
                    },
                    // {
                    //     key: '3',
                    //     label: 'Уровень сложности',
                    //     children: project.details.level,
                    // },
                    // {
                    //     key: '4',
                    //     label: 'Описание',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.description}}/>,
                    //     className: styles.lists
                    // },
                    // {
                    //     key: '5',
                    //     label: 'Цель',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.goal}}/>,
                    //     className: styles.lists
                    // },
                    // {
                    //     key: '6',
                    //     label: 'Требуемый результат',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.result}}/>,
                    //     className: styles.lists
                    // },
                    // {
                    //     key: '7',
                    //     label: 'Критерии оценки',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.criteria}}/>,
                    //     className: styles.lists
                    // },
                    // {
                    //     key: '8',
                    //     label: 'Список формируемых компетенций',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.competences}}/>,
                    //     className: styles.lists
                    // },
                    // {
                    //     key: '9',
                    //     label: 'Организация заказчика',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.customerOrganizationName}}/>,
                    // },
                    // {
                    //     key: '10',
                    //     label: 'ФИО заказчика',
                    //     children: <div dangerouslySetInnerHTML={{__html: project.details.customerPersonName}}/>,
                    // },
                    // {
                    //     key: '11',
                    //     label: 'Образовательная программа',
                    //     children: project.details.program.code + " " + project.details.program.title
                    // },
                    // {
                    //     key: '12',
                    //     label: 'Главный руководитель образовательной программы',
                    //     children: project.details.program.programHead.fullname
                    // },
                    // {
                    //     key: '13',
                    //     label: 'Период выполнения',
                    //     children: `${project.details.period.term === 1 ? "Осенний" : "Весенний"} семестр ${project.details.period.year}/${project.details.period.year + 1} учебного года`
                    // },

                ]}/>
        </div>
    )
}
