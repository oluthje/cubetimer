import React, { useState, useRef } from "react";
import { Typography, Button, Space } from 'antd';
import {
  LockOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Title } = Typography

function Scrambler(props) {
  const locked = props.locked
  const scramble = props.scramble
  const lockBtnRef = useRef()
  const reloadBtnRef = useRef()

  const doSomeReload = () => {
    props.onScrambleReload()
    reloadBtnRef.current.blur()
  }

  const doSomeLock = () => {
    props.onLockToggle()
    lockBtnRef.current.blur()
  }

	return (
		<>
      <Space style={{width: '100%', justifyContent: 'center'}}>
        <Title level={4}>{scramble}</Title>
      </Space>

      <Space style={{width: '100%', justifyContent: 'center'}}>
        <Button ref={lockBtnRef} icon={<LockOutlined/>} onClick={doSomeLock} type={locked ? "primary" : "default"}></Button>
        <Button ref={reloadBtnRef} icon={<SyncOutlined/>} onClick={doSomeReload}></Button>
      </Space>
    </>
	)
}

export default Scrambler