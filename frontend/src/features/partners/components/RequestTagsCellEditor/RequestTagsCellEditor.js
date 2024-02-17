import React, {useEffect, useState} from 'react';
import {App, Button, Input, Select, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./RequestTagsCellEditor.module.css"
import {CheckCircleOutlined, EditOutlined} from "@ant-design/icons";
import {updateRequest} from "../../../../store/slices/requestSlice";
import {setRequests} from "../../../../store/slices/requestsSlice";

const {TextArea} = Input;
const {Column, ColumnGroup} = Table;


export default function RequestTagsCellEditor(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState([])
    const [requestTags, setRequestTags] = useState([])

    const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        setTagOptions(props.tags.map(tag => ({
            value: tag.id,
            label: tag.text,
        })))
    }, [props.tags])

    useEffect(() => {
        setRequestTags(props.request.tags.map(tag => tag.id))
    }, [props.request])


    if (!isEdit) {
        return (
            <div className={styles.tags__container}>
                <Button
                    icon={<EditOutlined/>}
                    type="text"
                    onClick={() => setIsEdit(true)}
                    className={styles.tags__editButton}
                />
                <div className={styles.tags__list}>
                    {props.value.map(tag => {
                        return <Tag color={tag.color}>{tag.text}</Tag>
                    })}
                </div>
            </div>
        )
    }

    const saveRequest = () => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Сохраняю заявку...", key: 'updateRequest', duration: 0})

            dispatch(updateRequest({
                id: props.request.id,
                tags: requestTags
            })).then((response) => {
                setIsLoading(false)
                message.destroy('updateRequest')
                message.success({content: "Вы успешно обновили заявку!"})
                let newRequests = [...props.requests]
                let currentIndex = newRequests.findIndex(request => request.id === props.request.id)
                newRequests[currentIndex] = {...newRequests[currentIndex], tags: props.tags.filter(tag => requestTags.includes(tag.id))};
                dispatch(setRequests(newRequests))
            }, (error) => {
                setIsLoading(false)
                message.destroy('updateRequest')
                message.error({content: error.message})
            });
        }
    }

    return (
        <div className={styles.tags__container}>
            <Button
                icon={<CheckCircleOutlined/>}
                type="text"
                onClick={() => {
                    setIsEdit(false);
                    saveRequest();
                }}
                className={styles.tags__editButton}
            />
            <Select
                style={{
                    width: '100%',
                }}
                showSearch={true}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                mode="multiple"
                placeholder="Выберите теги"
                onChange={(value) => setRequestTags(value)}
                options={tagOptions}
                value={requestTags}
            />
        </div>
    );
};
