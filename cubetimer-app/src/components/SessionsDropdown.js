import React from "react";
import { Button, Dropdown, Menu } from 'antd';

function SessionsDropdown(props) {
	const sessions = props.sessions
	const session = props.session
	const sessionMenuItems = []
	
  for (var key in sessions) {
    const name = sessions[key].name
    var disabled = false
    session ? disabled = (session.name === name) : disabled = false
    sessionMenuItems.push(
      <Menu.Item key={key} disabled={disabled}>
        <a target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Menu.Item>
    )
  }

  const sessionMenu = (
    <Menu onClick={props.onDropdownClick}>{sessionMenuItems}</Menu>
  )

  return (
  	<>
	    <Dropdown overlay={sessionMenu} placement="bottomCenter" size={"large"}>
	      <Button style={{ width: '100px'}}>{session ? session.name : "Session"}</Button>
	    </Dropdown>
  	</>
  )
}

export default SessionsDropdown