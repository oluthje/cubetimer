import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "../components/AppMenu";
import Sessions from "../components/Sessions";
import Session from "../components/Session";

const { Content } = Layout;

export default (
  <Router>
    <Layout style={{ height:"100vh" }}>
      <Layout>
        <AppMenu/>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <Switch>
            <Route path="/sessions" exact component={Sessions} />
            <Route path="/sessions/:id" exact component={Session} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Router>
);