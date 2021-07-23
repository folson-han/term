import React, { FC, useState } from "react";
import css from "./Home.module.less";
import { Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import loadable from "@loadable/component";
import { Layout, Dropdown, Menu, Space, Avatar, Divider } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const Home: FC = () => {
    const history = useHistory();
    const [activeProject, setActiveProject] = useState<string>("项目 0");
    function choose(menuInfo: any){
        setActiveProject(menuInfo.key);
    }

    function toUser(){
        history.push("/user");
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
                    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        { activeProject } <DownOutlined />
                    </span>
                </Dropdown>
            </div>
            <div>
                <Space split={<Divider type="vertical" />}>
                    <Link to={"/document"}>
                        文档
                    </Link>
                    <Link to={"/demand"}>
                        需求
                    </Link>
                    <Link to={"/headway"}>
                        进展
                    </Link>
                </Space>
            </div>
            <div>
                <span onClick={toUser} style={{ cursor: "pointer" }}>
                    <Avatar size={36} icon={<UserOutlined />} />
                </span>
            </div>
        </Layout.Header>
        <Layout.Content className={css.content}>
            <Switch>
                <Route path={"/user"} component={loadable(() => import("./User/User"))} />
                <Route path={"/demand"} component={loadable(() => import("./Demand/Demand"))} />
                <Route path={"/headway"} component={loadable(() => import("./Headway/Headway"))} />
                <Route path={"/document"} component={loadable(() => import("./Document/Document"))} />
                <Route render={() => {
                    return <Redirect to={"/document"} />
                }} />
            </Switch>
        </Layout.Content>
    </Layout>
}

export default Home;
