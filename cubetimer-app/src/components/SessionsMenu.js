import React, { useState, useEffect } from "react"
import { Menu, Card, Button } from 'antd';
import NewSession from "../components/NewSession"

function SessionsMenu(props) {
  const [sessionKey, setSessionKey] = useState("0")
  const sessions = props.sessions
  const sessionMenuItems = []

  for (var key in sessions) {
    const name = sessions[key].name
    sessionMenuItems.push(
      <Menu.Item key={key}>
        <a target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Menu.Item>
    )
  }
  sessionMenuItems.push(
    <NewSession createSession={props.createSession}/>
  )

  const handleClick = e => {
    setSessionKey(e.key)
    props.onSessionClick(e)
  }

  return (
    <>
      <Card>
        <Menu
          onClick={handleClick}
          style={{ width: "100%" }} 
          defaultOpenKeys={"1"}
          selectedKeys={[sessionKey]}
          mode="inline"
        >
          {sessionMenuItems}
        </Menu>
      </Card>
    </>
  )
}

export default SessionsMenu