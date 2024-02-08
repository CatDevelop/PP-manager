import React, {useState} from 'react';
import {App, Button, Drawer, Input, Switch, Table} from "antd";
import {useDispatch} from "react-redux";
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styles from "./PassportsTableSettings.module.css"
import {initialPassportsTableColumns} from "../../pages/PartnersPassportsPage/PartnersPassportsPage";

const {TextArea} = Input;
const {Column, ColumnGroup} = Table;


const Row = (props) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};


export default function PassportsTableSettings(props) {
    const {message} = App.useApp();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    );
    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            props.setTableColumns((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };


    return (
        <Drawer
            title="Настройки таблицы паспортов"
            onClose={() => {
                props.setTableColumns(JSON.parse(localStorage.getItem("PP-manager-passport-columns")) || initialPassportsTableColumns)
                props.setIsOpen(false)
            }}
            open={props.isOpen}
        >
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <Button
                        type="primary"
                        onClick={() => {
                            localStorage.setItem(
                                "PP-manager-passport-columns",
                                JSON.stringify(props.tableColumns)
                            );
                            message.success("Настройки таблицы успешно сохранены!")
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={() => {
                            props.setTableColumns(initialPassportsTableColumns);
                            localStorage.setItem(
                                "PP-manager-passport-columns",
                                JSON.stringify(initialPassportsTableColumns)
                            );
                            message.success("Настройки таблицы успешно сброшены!")
                        }}>
                        Сбросить
                    </Button>
                </div>
                <div className={styles.columnSwitchs}>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "uid")} onChange={(value) => {
                            value ? props.setTableColumns([...props.tableColumns, {
                                    key: 'uid',
                                    name: 'Номер паспорта',
                                }]) :
                                props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'uid')])
                        }}/>
                        Номер паспорта
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "date")} onChange={(value) => {
                            value ? props.setTableColumns([...props.tableColumns, {
                                    key: 'date',
                                    name: 'Дата паспорта',
                                }]) :
                                props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'date')])
                        }}/>
                        Дата паспорта
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "request_uid")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'request_uid',
                                            name: 'Номер заявки',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'request_uid')])
                                }}/>
                        Номер заявки
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "request_date")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'request_date',
                                            name: 'Дата заявки',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'request_date')])
                                }}/>
                        Дата заявки
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "short_name")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'short_name',
                                            name: 'Название',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'short_name')])
                                }}/>
                        Название
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "kind")} onChange={(value) => {
                            value ? props.setTableColumns([...props.tableColumns, {
                                    key: 'kind',
                                    name: 'Тип проекта',
                                }]) :
                                props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'kind')])
                        }}/>
                        Тип проекта
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "status")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'status',
                                            name: 'Статус',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'status')])
                                }}/>
                        Статус
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "course")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'course',
                                            name: 'Курсы',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'course')])
                                }}/>
                        Курсы
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "customer_company_name")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'customer_company_name',
                                            name: 'Заказчик',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'customer_company_name')])
                                }}/>
                        Заказчик
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "customer_name")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'customer_name',
                                            name: 'Представитель заказчика',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'customer_name')])
                                }}/>
                        Представитель заказчика
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "available_seats_number")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'available_seats_number',
                                            name: 'Количество мест',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'available_seats_number')])
                                }}/>
                        Количество мест
                    </div>
                </div>

                <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext
                        items={props.tableColumns.map((i) => i.key)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table
                            bordered={true}
                            components={{
                                body: {
                                    row: Row,
                                },
                            }}
                            pagination={false}
                            rowKey="key"
                            dataSource={props.tableColumns}
                        >
                            <Column
                                title="Столбцы"
                                width={90}
                                dataIndex="name"
                                key="name"
                            />
                        </Table>
                    </SortableContext>
                </DndContext>
            </div>
        </Drawer>
    );
};
