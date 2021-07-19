import React, { FC, useState } from "react";
import css from "./Demand.module.less";
import { blue, red, orange, yellow } from "@ant-design/colors";
import { Tag, Card, Space, Modal, Input, Form, Avatar, Select } from "antd";
import { UserOutlined  } from "@ant-design/icons";

const Demand: FC = () => {
    const [items, setItems] = useState<Array<any>>([
        { type: "red", title: "待修复", records: [
            { id: new Date().getTime(), title: "标题", principal: ["负责人"], content: "内容" },
            { id: new Date().getTime() + 1, title: "标题", principal: ["负责人"], content: "内容" },
            { id: new Date().getTime() + 2, title: "标题", principal: ["负责人"], content: "内容" },
            { id: new Date().getTime() + 3, title: "标题", principal: ["负责人"], content: "内容" },
        ] },
        { type: "yellow", title: "待检验", records: [] },
        { type: "orange", title: "待复现", records: [] },
        { type: "blue", title: "已完成", records: [] }
    ]);
    const [visible, setVisible] = useState<boolean>(false);
    const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

    function tagRender(props: any) {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    }

    function caseType(type: string){
        let color: any;
        switch (type) {
            case "red":
                color = red.primary;
                break;
            case "orange":
                color = orange.primary;
                break;
            case "blue":
                color = blue.primary;
                break;
            case "yellow":
                color = yellow.primary;
                break;
            default:
                break;
        }
        return color;
    }

    function show(id: number){
        console.log(id);
        setVisible(true);
    }

    function keyup(e: any){
        if(e.keyCode === 13){
            alert(1111);
        }
    }

    return <>
        <div className={css.demand}>
            {
                items.map(item => {
                    return <div key={item.type} className={css.item}>
                        <div className={css.title}>
                            <span style={{background: caseType(item.type), color: "#fff"}}>{ item.title }</span>
                            <span>{ item.records.length }</span>
                        </div>
                        <div className={css.repair}>
                            {
                                item.records.map((record: any) => {
                                    return <Card title={record.title} extra={<span onClick={() => { show(record.id) }} className={css.show}>查看</span>} key={record.id} className={css.coder}>
                                        <Space className={css.principal}>
                                            {
                                                record.principal.map((pri: any) => {
                                                    return <Tag key={pri} color={"blue"} style={{ fontSize: 10, marginTop: 5 }}>{ pri }</Tag>
                                                })
                                            }
                                        </Space>
                                    </Card>
                                })
                            }
                        </div>
                    </div>
                })
            }
            <Modal title={null} visible={visible} width={"60vw"} footer={null} closable={false} onCancel={() => { setVisible(false); }}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} labelAlign={"left"}>
                    <Form.Item>
                        <input placeholder={"Untitled"} style={{ fontSize: 18, width: "100%", border: "none", outline: "none" }} />
                    </Form.Item>
                    <Form.Item label={"创建人"}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar size={24} icon={<UserOutlined />} />
                            <span style={{ marginLeft: 10 }}>创建人</span>
                        </div>
                    </Form.Item>
                    <Form.Item label={"负责人"}>
                        <Select mode="multiple" showArrow style={{ width: '100%' }} tagRender={tagRender} options={options} />
                    </Form.Item>
                    <Form.Item label={"状态"}>
                        <Select showArrow style={{ width: '100%' }} options={options} />
                    </Form.Item>
                    <div style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar size={24} icon={<UserOutlined />} />
                            <span style={{ flex: 1, marginLeft: 10 }}>
                                <input style={{ border: "none", outline: "none", width: "100%" }} onKeyUp={keyup} />
                            </span>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    </>
}

export default Demand;
