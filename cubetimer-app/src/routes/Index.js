import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import Header from "../components/Header";
import Cubes from "../components/Cubes";
import Cube from "../components/Cube";

const { Content } = Layout;

export default (
  <Router>
    <Header/>
    <Switch>
      <Layout>
        <Content style={{ margin: '0px 16px', padding: '0 16px', marginTop: 64 }}>
          <Route path="/cubes" exact component={Cubes} />
          <Route path="/cubes/:id" exact component={Cube} />
        </Content>
      </Layout>
    </Switch>
  </Router>
);