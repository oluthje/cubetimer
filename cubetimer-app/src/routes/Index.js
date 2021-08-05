import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "../components/AppMenu";
import Sessions from "../components/Sessions";
import Session from "../components/Session";

const { Content } = Layout;

const Routes = () => {
  return (
    <>
      <Layout style={{ height:"100vh" }}>
        <AppMenu/>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <Router>
            <Switch>
              <Route path="/timer/" exact component={Session} />
              <Route path="/sessions" exact component={Sessions} />
            </Switch>
          </Router>
        </Content>
      </Layout>
    </>
  );
}

export default Routes;