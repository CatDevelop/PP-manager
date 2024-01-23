import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {App, Button, Input, Modal} from "antd";
import {parseProjects} from "../../../../store/slices/teamprojectSlice";
import {useDispatch} from "react-redux";
import styles from "./ParseModal.module.css"
const { TextArea } = Input;

export default function ParseModal(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const [token, setToken] = useState(localStorage.getItem("PP-analyze-bearer") || "")

    const [isLoading, setIsLoading] = useState(false);

    const parse = (payload) => {
        if (!isLoading) {
            setIsLoading(true);

            const data = {
                token: token,
                size: 1000
            }

            dispatch(parseProjects(data)).then((response) => {
                setIsLoading(false)
                message.success({content: "Информация успешно собрана!"})
            }, (error) => {
                setIsLoading(false)
                message.error({content: error.message})
            });
        }
    }

    return (
        <Modal title="Загрузка данных из Teamproject" open={props.isOpen} footer={() => undefined} closeIcon={false}>
            <div className={styles.modal}>
                <Input
                    addonBefore="Bearer"
                    value={token}
                    onChange={(e) => {
                        localStorage.setItem("PP-analyze-bearer", e.target.value)
                        setToken(e.target.value);
                    }}
                    placeholder="Введите токен"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                {
                    isLoading ?
                        <p className={styles.loading}>Не закрывайте страницу! Загружаю данные...</p> :
                        <div className={styles.buttons}>
                            <Button onClick={() => props.setIsOpen(false)} disabled={isLoading}>
                                Отмена
                            </Button>
                            <Button disabled={isLoading} onClick={() => parse()} type="primary">
                                Начать
                            </Button>
                        </div>
                }
            </div>
        </Modal>
    );
};
