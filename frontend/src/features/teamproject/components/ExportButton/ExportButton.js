import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {App, Button, Input, Table} from "antd";
import {useDispatch} from "react-redux";
import {createReport, parseProjects} from "../../../../store/slices/teamprojectSlice";
import {useTeamproject} from "../../../../hooks/use-teamproject";

const {Column, ColumnGroup} = Table;
const {TextArea} = Input;

export default function ExportButton(props) {
    const navigate = useNavigate()
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const teamproject = useTeamproject()

    const [isLoading, setIsLoading] = useState(false);

    const getReport = (payload) => {
        if (!isLoading) {
            setIsLoading(true);

            const data = {
                token: localStorage.getItem("PP-analyze-bearer")
                // projects: teamproject.projects
            }

            dispatch(createReport(data)).then((response) => {
                setIsLoading(false)
                message.success({content: "Отчёт !"})
            }, (error) => {
                setIsLoading(false)
                message.error({content: error.message})
            });
        }
    }

    return (
        <Button onClick={getReport}>Экспортировать</Button>
    );
};
