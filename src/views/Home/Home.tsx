import React, { FC, useState } from "react";
import css from "./Home.module.less";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import { Layout, Dropdown, Menu, Space, Avatar, Divider } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const Home: FC = () => {
    const [activeProject, setActiveProject] = useState<string>("项目 0");
    function choose(menuInfo: any){
        setActiveProject(menuInfo.key);
    }

    return <Layout className={css.home}>
        <Layout.Header className={css.header}>
            <div>
                <Dropdown overlay={<Menu onClick={choose}>
                    {
                        [0, 1, 2, 3].map(item => {
                            return <Menu.Item key={"项目 " + item}>
                                项目 { item }
                            </Menu.Item>
                        })
                    }
                </Menu>}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        { activeProject } <DownOutlined />
                    </a>
                </Dropdown>
            </div>
            <div>
                <Space split={<Divider type="vertical" />}>
                    <Link to={"/home/demand"}>
                        需求
                    </Link>
                    <Link to={"/home/headway"}>
                        进展
                    </Link>
                    <Link to={"/home/document"}>
                        文档
                    </Link>
                </Space>
            </div>
            <div>
                <Avatar size={36} icon={<UserOutlined />} />
            </div>
        </Layout.Header>
        <Layout.Content className={css.content}>
            <Switch>
                <Route path={"/home/demand"} component={loadable(() => import("./Demand/Demand"))} />
                <Route path={"/home/headway"} component={loadable(() => import("./Headway/Headway"))} />
                <Route path={"/home/document"} component={loadable(() => import("./Document/Document"))} />
                <Route render={() => {
                    return <Redirect to={"/home/demand"} />
                }} />
            </Switch>
        </Layout.Content>
    </Layout>
}

export default Home;
