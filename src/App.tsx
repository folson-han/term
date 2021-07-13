import React, { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { Spin, ConfigProvider } from "antd";
import zhCN from 'antd/lib/locale/zh_CN';

const App: FC = () => {
    return <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Spin />}>
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route exact path={"/"} render={() => {
                            return <Redirect to={"/home"} />
                        }} />
                        <Route path={"/home"} component={loadable(() => import("./views/Home/Home"))} />
                        <Route path={"/login"} component={loadable(() => import("./views/Login/Login"))} />
                        <Route path={"*"} component={loadable(() => import("./views/UnKnow/UnKnow"))} />
                    </Switch>
                </Router>
            </ConfigProvider>
        </PersistGate>
    </Provider>
}

export default App;
