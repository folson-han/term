import React, { FC, useState, useRef } from "react";
import css from "./Login.module.less";
import {Button, Form, Input, Space, Modal} from "antd";

const Login: FC = () => {
    const registryForm = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    function showModal(){
        setVisible(true);
    }

    function registrySubmit(){

    }

    function loginSubmit(){

    }

    return <>
        <div className={css.login}>
            <div className={css.box}>
                <Form onFinish={loginSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label={"username"} name={"username"} rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"password"} name={"password"} rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password  />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type={"primary"} htmlType={"submit"}>
                                Submit
                            </Button>
                            <Button onClick={showModal}>
                                Registry
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
        <Modal visible={visible} closable={false} footer={null} maskClosable={true} onCancel={() => { setVisible(false); }} destroyOnClose>
            <Form ref={registryForm} onFinish={registrySubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item label={"username"} name={"username"} rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={"password"} name={"password"} rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password  />
                </Form.Item>
                <Form.Item label={"againPassword"} name={"againPassword"} rules={[{ required: true, message: 'Please input your againPassword!' }]}>
                    <Input.Password  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type={"primary"} htmlType={"submit"}>
                        Registry
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default Login;
