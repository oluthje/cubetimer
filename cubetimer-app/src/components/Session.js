import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Row, Col } from 'antd';
import Timer from "../components/Timer";
import axios from 'axios'

function Session(props) {
  const [times, setTimes] = useState([])
  const [sessions, setSessions] = useState()
  const [session, setSession] = useState()

  const { Column } = Table;

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

  const handleSessionClick = e => {
    setSession(sessions[e.key])
  }

  const sessionMenu = (
    <Menu onClick={handleSessionClick}>{sessionMenuItems}</Menu>
  )

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    getSessionTimes()
  }, [session])

  const getSessions = () => {
    axios.get('/api/v1/sessions')
    .then(response => {
      if (response.data !== undefined) {
        setSessions(response.data)
        if (response.data[0]) {
          setSession(response.data[0])
        }
      }
    })
    .catch(error => console.log(error))
  }

  const getSessionTimes = () => {
    var id = 9
    if (session) {
      id = session.id
    }

    axios.get(`/api/v1/sessions/${id}`)
    .then(response => {
      setTimes(response.data);
    })
    .catch(error => console.log(error))
  }

  const addCubetime = (seconds) => {
    axios.post(`/api/v1/sessions/${session.id}/cubetimes`, {cubetime: {seconds: seconds}})
    .then(response => {
      setTimes(times => [...times, response.data])
    })
    .catch(error => console.log(error))
  }

  const data = [];

  for (let i = 0; i < times.length; i++) {
    const dict = {
      key: i + 1,
      id: times[i].id,
      seconds: times[i].seconds
    }
    data.push(dict)
  }

  return (
    <>
      <Row>
        <Timer addCubetime={addCubetime}/>
        <Col offset={20} span={2}>
          <Dropdown overlay={sessionMenu} placement="bottomCenter" size={"large"}>
            <Button style={{ width: '100px'}}>{session ? session.name : "Session"}</Button>
          </Dropdown>
        </Col>
      </Row>
      <br/>
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Seconds" dataIndex="seconds" key="seconds" />
      </Table>
    </>
  );
}

export default Session;