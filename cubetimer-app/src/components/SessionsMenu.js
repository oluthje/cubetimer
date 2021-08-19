import React, { useState, useEffect } from "react"
import { Menu, Card } from 'antd';

function SessionsMenu(props) {
	const [sessionKey, setSessionKey] = useState("1")

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
		    	<Menu.Item key="1">3x3</Menu.Item>
		    	<Menu.Item key="2">4x4</Menu.Item>
		    	<Menu.Item key="3">Pyraminx</Menu.Item>
	    	</Menu>
    	</Card>
		</>
	)
}

export default SessionsMenu