import React from 'react';
import {App, Card, Collapse, Descriptions, Input, Statistic, Tag} from "antd";
import {useDispatch} from "react-redux";
import styles from "./StudentProjectDescription.module.css"

const {TextArea} = Input;

export default function StudentProjectDescription(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();

    return (
        <Card
            title={(
                <div className={styles.title}>
                    <p className={styles.title__name}>{props.project.name}</p>
                    <p className={styles.title__period}>{props.project.period.term === 1 ? "Осенний" : "Весенний"} семестр {props.project.period.year}/{props.project.period.year + 1}</p>
                </div>
            )}
            bordered={false}
            className={styles.project}
        >
            <div className={styles.project__content}>
                <div className={styles.project__content__left}>
                    <div className={styles.project__content__info__row}>
                        <p >
                            <p className={styles.project__content__info__title}>Заявка</p>
                            {props.project.passport.request.uid} <br/>
                            от {new Date(Date.parse(props.project.passport.request.date)).toLocaleDateString()}
                        </p>
                        <p >
                            <p className={styles.project__content__info__title}>Паспорт</p>
                            {props.project.passport.uid} <br/>
                            от {new Date(Date.parse(props.project.passport.date)).toLocaleDateString()}
                        </p>
                        <p >
                            <p className={styles.project__content__info__title}>Тип проекта</p>
                            {props.project.passport.kind === "KERN" ? "Ядерный проект" : props.project.passport.kind === "MONO" ? "Монопроект" : "Межпрограммный"}
                        </p>
                    </div>
                    <div>
                        <p className={styles.project__content__row}>
                            <p className={styles.project__content__info__title}>Краткое название:</p>
                            {props.project.passport.short_name}
                        </p>
                        <p className={styles.project__content__row}>
                            <p className={styles.project__content__info__title}>Название для диплома:</p>
                            {props.project.passport.diploma_name}
                        </p>
                    </div>

                    <div className={styles.project__content__info}>
                        <p className={styles.project__content__info__title}>Описание</p>
                        <div dangerouslySetInnerHTML={{__html: props.project.passport.request.description}}/>
                    </div>
                    <div className={styles.project__content__info}>
                        <p className={styles.project__content__info__title}>Цель</p>
                        <div dangerouslySetInnerHTML={{__html: props.project.passport.request.goal}}/>
                    </div>
                    <div className={styles.project__content__info}>
                        <p className={styles.project__content__info__title}>Требуемый результат</p>
                        <div dangerouslySetInnerHTML={{__html: props.project.passport.request.result}}/>
                    </div>
                    <div className={styles.project__content__info}>
                        <p className={styles.project__content__info__title}>Критерии оценки</p>
                        <div dangerouslySetInnerHTML={{__html: props.project.passport.request.criteria}}/>
                    </div>
                    <div className={styles.project__content__info__row}>
                        <div className={styles.project__content__info}>
                            <p className={styles.project__content__info__title}>Организация заказчика</p>
                            <div>{props.project.passport.request.customer_user.customer_company.name}</div>
                        </div>
                        <div className={styles.project__content__info}>
                            <p className={styles.project__content__info__title}>ФИО заказчика</p>
                            <div>{(props.project.passport.request.customer_user.last_name || "") + " " + (props.project.passport.request.customer_user.first_name || "") + " " + (props.project.passport.request.customer_user.middle_name || "")}</div>
                        </div>
                        <div className={styles.project__content__info}>
                            <p className={styles.project__content__info__title}>Куратор</p>
                            <div>{props.project.curator || ""}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.project__content__right}>
                    {
                        props.project.passport.request.tags.length !== 0 &&
                        <div className={styles.project__content__right__tags}>
                            {
                                props.project.passport.request.tags.map(tag => {
                                    return <Tag style={{margin: 0}} color={tag.color}>{tag.text}</Tag>
                                })
                            }
                        </div>
                    }
                    {
                        props.project.students_result?.[0]?.expertsScore &&
                        <Statistic
                            title="Сводная оценка экспертной комиссии"
                            value={
                                `${props.project.students_result?.[0]?.expertsScore} * ${props.project.students_result?.[0]?.coefficient} = ${props.project.students_result?.[0]?.brsScore}`
                            }
                        />
                    }

                    {
                        props.project.students_result?.[0]?.retakedScore &&
                        <Statistic
                            title="Пересдача"
                            value={props.project.students_result?.[0]?.retakedScore}
                        />
                    }
                </div>
            </div>
        </Card>
    );
};
