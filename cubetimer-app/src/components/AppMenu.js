import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FieldTimeOutlined,
  BarChartOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Sider } = Layout

const AppMenu = (props) => {
  const lastMenuKey = sessionStorage.getItem("lastMenuKey")
  const [menuKey, setMenuKey] = useState(lastMenuKey || "1")
  console.log("menuKey: " + menuKey)

  const handleClick = e => {
    sessionStorage.setItem("lastMenuKey", e.key)
    setMenuKey(e.key)
    console.log("handle click")
  }

  return (
    <Sider>
      <div style={{ width: 200 }}>
        <Menu
          selectedKeys={[menuKey]}
          mode="inline"
          theme="dark"
          onClick={handleClick}
        >
          <Menu.Item key="1" icon={<FieldTimeOutlined />}>
            Timer
          </Menu.Item>
          <Menu.Item key="2" icon={<MenuOutlined />}>
            <a href="/sessions/" rel="noopener noreferrer">
              Sessions
            </a>
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