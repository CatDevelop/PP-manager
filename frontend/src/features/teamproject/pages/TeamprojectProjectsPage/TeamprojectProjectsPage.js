import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {App, Button, Modal, Select, Spin} from "antd";
import {parseProjects} from "../../../../store/slices/teamprojectSlice";
import ParseModal from "../../components/ParseModal/ParseModal";
import {useTeamproject} from "../../../../hooks/use-teamproject";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";
import styles from './TeamprojectProjectsPage.module.css'
import ExportButton from "../../components/ExportButton/ExportButton";
import {useProjects} from "../../../../hooks/use-projects";
import {getAllProjects} from "../../../../store/slices/projectsSlice";
import {removeProject} from "../../../../store/slices/projectSlice";

export function TeamprojectProjectsPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    // const teamproject = useTeamproject()

    const [isParseModalOpen, setIsParseModalOpen] = useState(false);

    const [year, setYear] = useState(2023)
    const [term, setTerm] = useState(1)

    const handleChangeYear = (value) => {
        setYear(value)
    }

    const handleChangeTerm = (value) => {
        setTerm(value)
    }

    const projects = useProjects()

    useEffect(() => {
        dispatch(getAllProjects({year, term}))
    }, [year, term]);

    useEffect(() => {
        dispatch(removeProject())
    }, []);


    // console.log(teamproject)
    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["TeamprojectProjects"]}/>

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
                        defaultValue={1}
                        onChange={handleChangeTerm}
                        options={[
                            {value: 1, label: 'Осенний'},
                            {value: 2, label: 'Весенний'},
                        ]}
                    />
                </div>

                <Button
                    type="primary"
                    onClick={() => setIsParseModalOpen(true)}
                >
                    Обновить информацию
                </Button>

                {/*<ExportButton projects={teamproject.projects}/>*/}
            </div>

            {
                projects.isLoading ?
                    <Spin/> :
                    <ProjectsTable projects={projects.projects}/>
            }

            <ParseModal isOpen={isParseModalOpen} setIsOpen={setIsParseModalOpen}/>
        </div>
    )
}
