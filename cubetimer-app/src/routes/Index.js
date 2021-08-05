import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "../components/AppMenu";
import Sessions from "../components/Sessions";
import Session from "../components/Session";

const { Content } = Layout;

const Routes = () => {
  const [menuKey, setMenuKey] = useState("1")

  const onSetMenuKey = (key) => {
    console.log("set key to " + key + " old key is " + menuKey)
    setMenuKey(key)
  }

  return (
    <>
      <Layout style={{ height:"100vh" }}>
        <AppMenu setMenuKey={onSetMenuKey} menuKey={menuKey}/>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <Router>
            <Switch>
              <Route path="/sessions" exact component={Sessions} />
              <Route path="/sessions/:id" exact component={Session} />
            </Switch>
          </Router>
        </Content>
      </Layout>
    </>
  );
}

export default Routes;