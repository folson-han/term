import React, { FC, useState } from "react";
import css from "./Document.module.less";
import {Button, Space, Modal, Input, Upload} from "antd";
import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {UploadRequestOption as RcCustomRequestOptions} from "rc-upload/lib/interface";

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

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)

const Document: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [markdown, setMarkdown] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fileList, setFileList] = useState<Array<any>>([]);

    function sendMarkdown(){
        setDescription(markdown);
        setVisible(false);
    }

    function uploadChange(info: any){
        setFileList(info.fileList);
    }

    return <>
        <div className={css.document}>
            <div className={css.operation}>
                <Button type={"primary"} onClick={() => { setVisible(true); }}>
                    编辑
                </Button>
            </div>
            <div className={css.description}>
                <div className={css.title}>
                    正文:
                </div>
                <div className={css.content}>
                    <ReactMarkdown components={components} children={description} />
                </div>
            </div>
            <div className={css.annex}>
                <div className={css.title}>
                    附件:
                </div>
                <div className={css.content}>
                    <Space>
                        <div className={css.item}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </div>
                        <div className={css.item}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </div>
                        <div className={css.item}>
                            <Space direction={"vertical"} align="center">
                                <FileOutlined />
                                xxxxx.png
                            </Space>
                        </div>
                    </Space>
                </div>
                <div className={css.desc}>
                    点击下载附件...
                </div>
            </div>
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
    </>
}

export default Document;
