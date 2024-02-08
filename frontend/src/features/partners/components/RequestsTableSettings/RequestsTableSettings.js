import React, {useState} from 'react';
import {App, Button, Drawer, Input, Switch, Table} from "antd";
import {useDispatch} from "react-redux";
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styles from "./RequestsTableSettings.module.css"
import {initialPassportsTableColumns} from "../../pages/PartnersPassportsPage/PartnersPassportsPage";
import {initialRequestsTableColumns} from "../../pages/PartnersRequestsPage/PartnersRequestsPage";

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


export default function RequestsTableSettings(props) {
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
            title="Настройки таблицы заявок"
            onClose={() => {
                props.setTableColumns(JSON.parse(localStorage.getItem("PP-manager-requests-columns")) || initialRequestsTableColumns)
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
                                "PP-manager-requests-columns",
                                JSON.stringify(props.tableColumns)
                            );
                            message.success("Настройки таблицы успешно сохранены!")
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={() => {
                            props.setTableColumns(initialRequestsTableColumns);
                            localStorage.setItem(
                                "PP-manager-requests-columns",
                                JSON.stringify(initialRequestsTableColumns)
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
                                    name: 'Номер',
                                }]) :
                                props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'uid')])
                        }}/>
                        Номер
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "date")} onChange={(value) => {
                            value ? props.setTableColumns([...props.tableColumns, {
                                    key: 'date',
                                    name: 'Дата',
                                }]) :
                                props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'date')])
                        }}/>
                        Дата
                    </div>
                    <div className={styles.columnSwitch}>
                        <Switch value={props.tableColumns.find(column => column.key === "name")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'name',
                                            name: 'Название',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'name')])
                                }}/>
                        Название
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
                        <Switch value={props.tableColumns.find(column => column.key === "max_copies")}
                                onChange={(value) => {
                                    value ? props.setTableColumns([...props.tableColumns, {
                                            key: 'max_copies',
                                            name: 'Максимальное количество копий',
                                        }]) :
                                        props.setTableColumns([...props.tableColumns.filter(column => column.key !== 'max_copies')])
                                }}/>
                        Максимальное количество копий
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
