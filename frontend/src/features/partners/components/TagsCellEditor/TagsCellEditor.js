import React, {useEffect, useState} from 'react';
import {App, Button, Input, Select, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./TagsCellEditor.module.css"
import {updatePassportTag} from "../../../../store/slices/passportSlice";
import {CheckCircleOutlined, EditOutlined} from "@ant-design/icons";
import {setPassports} from "../../../../store/slices/passportsSlice";

const {TextArea} = Input;
const {Column, ColumnGroup} = Table;


export default function TagsCellEditor(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState([])
    const [passportTags, setPassportTags] = useState([])

    const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        setTagOptions(props.tags.map(tag => ({
            value: tag.id,
            label: tag.text,
        })))
    }, [props.tags])

    useEffect(() => {
        setPassportTags(props.passport.tags.map(tag => tag.id))
    }, [props.passport])


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

    const savePassport = () => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Сохраняю паспорт...", key: 'updatePassport', duration: 0})

            dispatch(updatePassportTag({
                id: props.passport.id,
                tags: passportTags
            })).then((response) => {
                setIsLoading(false)
                message.destroy('updatePassport')
                message.success({content: "Вы успешно обновили паспорт"})
                let newPassports = [...props.passports]
                let currentIndex = newPassports.findIndex(passport => passport.id === props.passport.id)
                newPassports[currentIndex] = {...newPassports[currentIndex], tags: props.tags.filter(tag => passportTags.includes(tag.id))};
                dispatch(setPassports(newPassports))
            }, (error) => {
                setIsLoading(false)
                message.destroy('updatePassport')
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
                    savePassport();
                }}
                className={styles.tags__editButton}
            />
            <Select
                mode="tags"
                style={{
                    width: '100%',
                }}

                placeholder="Выберите теги"
                onChange={(value) => setPassportTags(value)}
                options={tagOptions}
                value={passportTags}
            />
        </div>
    );
};
