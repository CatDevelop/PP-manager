import SideBar from "../../../../components/SideBar/SideBar";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {App, Button, Modal, Spin} from "antd";
import {parseProjects} from "../../../../store/slices/teamprojectSlice";
import ParseModal from "../../components/ParseModal/ParseModal";
import {useTeamproject} from "../../../../hooks/use-teamproject";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";
import styles from './TeamprojectUsersPage.module.css'
import UsersTable from "../../components/UsersTable/UsersTable";

export function TeamprojectUsersPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const teamproject = useTeamproject()

    const [isParseModalOpen, setIsParseModalOpen] = useState(false);

    console.log(teamproject)
    return (
        <div className={styles.page}>
            <SideBar selectedKeys={["TeamprojectUsers"]}/>

            <div>
                <Button
                    type="primary"
                    onClick={() => setIsParseModalOpen(true)}
                >
                    Обновить информацию
                </Button>
            </div>

            {
                teamproject.isLoading ?
                    <Spin/> :
                    <UsersTable projects={teamproject.projects}/>
            }

            <ParseModal isOpen={isParseModalOpen} setIsOpen={setIsParseModalOpen}/>
        </div>
    )
}
