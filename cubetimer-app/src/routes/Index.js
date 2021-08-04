import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "../components/AppMenu";
import Cubes from "../components/Cubes";
import Cube from "../components/Cube";

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
            <Route path="/cubes" exact component={Cubes} />
            <Route path="/cubes/:id" exact component={Cube} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Router>
);