import React, { FC, useState } from "react";
import css from "./User.module.less";
import { Upload, Form, Button, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const User: FC = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [user] = Form.useForm();

    function beforeUpload(){
        return false;
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function showModal(){
        setVisible(true);
        user.resetFields();
    }

    return <>
        <div className={css.user}>
            <Form labelCol={{ span: 4 }}>
                <Form.Item label={"头像"}>
                        <Upload name={"avatar"} listType={"picture-card"} showUploadList={false} beforeUpload={beforeUpload}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
                <Form.Item label={"昵称"}>
                    { "111111" }
                </Form.Item>
                <Form.Item label={"邮箱"}>
                    { "111111" }
                </Form.Item>
                <Form.Item label={"微信"}>
                    { "111111" }
                </Form.Item>
            </Form>
            <div className={css.operation}>
                <Button type={"primary"} onClick={showModal}>修改</Button>
            </div>
        </div>
        <Modal visible={visible} onCancel={() => { setVisible(false); }} title={null} footer={null} closable={false}>
            <Form name={"user"} form={user}>
                <Form.Item label={"头像"}>

                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default User;
