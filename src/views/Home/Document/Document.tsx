import React, { FC, useState } from "react";
import css from "./Document.module.less";
import {Button, Space, Modal, Input} from "antd";
import { FileOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const Document: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [markdown, setMarkdown] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    function sendMarkdown(){
        setDescription(markdown);
        setVisible(false);
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
        <Modal visible={visible} width={"60vw"} onCancel={() => { setVisible(false); }} onOk={sendMarkdown}>
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <div style={{ width: "50%" }}>
                    <Input.TextArea rows={30} value={markdown} onChange={(e) => { setMarkdown(e.target.value) }} />
                </div>
                <div style={{ width: "50%", height: "100%", padding: 5, boxSizing: "border-box" }}>
                    <ReactMarkdown components={components} children={markdown} />
                </div>
            </div>
        </Modal>
    </>
}

export default Document;
