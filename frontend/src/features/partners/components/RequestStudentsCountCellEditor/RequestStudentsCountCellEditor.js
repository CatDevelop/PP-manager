import React, {useState} from 'react';
import {App, Button, Input, InputNumber, Table} from "antd";
import {useDispatch} from "react-redux";
import styles from "./RequestStudentsCountCellEditor.module.css"
import {CheckCircleOutlined, EditOutlined} from "@ant-design/icons";
import {updateRequest} from "../../../../store/slices/requestSlice";
import {setRequests} from "../../../../store/slices/requestsSlice";

const {TextArea} = Input;
const {Column, ColumnGroup} = Table;


export default function RequestStudentsCountCellEditor(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(props.value)
    const [isEdit, setIsEdit] = useState(false)

    if (!isEdit) {
        return (
            <div className={styles.studentsCount__container}>
                <Button
                    icon={<EditOutlined/>}
                    type="text"
                    onClick={() => setIsEdit(true)}
                    className={styles.studentsCount__editButton}
                />
                <p>{props.value}</p>
            </div>
        )
    }

    const saveRequest = (value) => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Сохраняю заявку...", key: 'updateRequest', duration: 0})
            dispatch(updateRequest({
                id: props.request.id,
                students_count: inputValue || 0
            })).then((response) => {
                setIsLoading(false)
                message.destroy('updateRequest')
                message.success({content: "Вы успешно обновили заявку!"})
                let newRequests = [...props.requests]
                let currentIndex = newRequests.findIndex(request => request.id === props.request.id)
                newRequests[currentIndex] = {...newRequests[currentIndex], students_count: inputValue || 0};
                dispatch(setRequests(newRequests))
            }, (error) => {
                setIsLoading(false)
                message.destroy('updateRequest')
                message.error({content: error.message})
            });
        }
    }

    return (
        <div className={styles.studentsCount__container}>
            <Button
                icon={<CheckCircleOutlined/>}
                type="text"
                onClick={() => {
                    setIsEdit(false);
                    saveRequest();
                }}
                className={styles.studentsCount__editButton}
            />
            <InputNumber value={inputValue} onChange={(value) => setInputValue(value)}/>
        </div>
    );
};
