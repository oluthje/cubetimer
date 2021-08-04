import React from "react";
import { Layout, Menu } from "antd";
import {
  FieldTimeOutlined,
  BarChartOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Sider } = Layout

const AppMenu = () => {
  return (
    <Sider>
      <div style={{ width: 200 }}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<FieldTimeOutlined />}>
            Timer
          </Menu.Item>
          <Menu.Item key="2" icon={<MenuOutlined />}>
            Sessions
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Stats
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  )
}

export default AppMenu