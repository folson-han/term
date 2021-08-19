import React, { FC, useState } from "react";
import css from "./Document.module.less";
import { Space, Modal, Input, Upload, Card, Row, Col } from "antd";
import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Hover from "../../../components/Hover";

const components = {
    code({node, inline, className, children, ...props}: any) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

const uploadButton = (<div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>)

interface List {
    id: number;
    name: string;
    desc: string;
}

const Document: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [markdown, setMarkdown] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fileList, setFileList] = useState<Array<any>>([]);
    const [list, setList] = useState<Array<List>>([
        { id: 1, name: "1", desc: "1" },
        { id: 2, name: "2", desc: "2" },
        { id: 3, name: "3", desc: "3" },
        { id: 4, name: "4", desc: "4" },
        { id: 5, name: "5", desc: "5" },
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    function sendMarkdown(){
        setDescription(markdown);
        setVisible(false);
    }

    function uploadChange(info: any){
        setFileList(info.fileList);
    }

    function newDocument(){
        setDescription("");
        setMarkdown("");
        setFileList([]);
        setVisible(true);
    }

    function showDetail(id: number){
        console.log(id);
        setShow(true);
    }

    return <>
        <div className={css.document}>
            <Row gutter={[16, 24]}>
                {
                    list.map(item => {
                        return <Col key={item.id} span={6}>
                            <Card hoverable={!loading} loading={loading} onClick={() => { showDetail(item.id) }}>
                                <Card.Meta title={"开发文档" + item.name} description={"文档简介" + item.desc} />
                            </Card>
                        </Col>
                    })
                }
                <Col span={6}>
                    <Card hoverable onClick={newDocument}>
                        <Card.Meta title={<div style={{ textAlign: "center" }}><PlusOutlined /></div>} description={<div style={{ textAlign: "center" }}>新建</div>} />
                    </Card>
                </Col>
            </Row>
        </div>
        <Modal visible={visible} width={"60vw"} onCancel={() => { setVisible(false); }} onOk={sendMarkdown} closable={false}>
            <div style={{ height: "70vh", overflowY: "auto" }}>
                <div>
                    <div>文档:</div>
                    <div style={{ width: "100%", height: "100%", display: "flex" }}>
                        <div style={{ width: "50%" }}>
                            <Input.TextArea rows={30} value={markdown} onChange={(e) => { setMarkdown(e.target.value) }} />
                        </div>
                        <div style={{ width: "50%", height: "100%", padding: 5, boxSizing: "border-box" }}>
                            <ReactMarkdown components={components} children={markdown} />
                        </div>
                    </div>
                </div>
                <div>
                    <div>附件:</div>
                    <Upload listType={"picture-card"} beforeUpload={() => false} onChange={uploadChange}>
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </div>
            </div>
        </Modal>
        <Modal visible={show} width={"60vw"} footer={null} onCancel={() => { setShow(false); }} closable={false} getContainer={false}>
            <div>
                <div style={{ fontSize: 18, fontWeight: "bolder" }}>
                    正文:
                </div>
                <div style={{ minHeight: 180, padding: 10, borderRadius: 5, background: "#f1f1f1", boxSizing: "border-box" }}>
                    <ReactMarkdown components={components} children={description} />
                </div>
            </div>
            <div>
                <div style={{ fontSize: 18, fontWeight: "bolder" }}>
                    附件:
                </div>
                <div>
                    <Space>
                        <Hover style={{ padding: 10, border: "1px solid #ccc", borderRadius: 5, cursor: "pointer", transition: "all .2s" }}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </Hover>
                        <Hover style={{ padding: 10, border: "1px solid #ccc", borderRadius: 5, cursor: "pointer", transition: "all .2s" }}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </Hover>
                        <Hover style={{ padding: 10, border: "1px solid #ccc", borderRadius: 5, cursor: "pointer", transition: "all .2s" }}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </Hover>
                    </Space>
                </div>
                <div style={{ fontSize: 10 }}>
                    点击下载附件...
                </div>
            </div>
        </Modal>
    </>
}

export default Document;
