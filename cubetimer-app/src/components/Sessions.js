import React, { useState, useEffect } from "react"
import { List, Divider, Button, Card, Row, Col, Typography, Space } from 'antd'
import { getSessionTimesById } from "../helper/functions.js"
import axios from 'axios'
import SessionsMenu from "../components/SessionsMenu"
import StatsPreview from "../components/StatsPreview"
import TimesTable from "../components/TimesTable"

const { Title } = Typography

function Sessions(props) {
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState()
  const [times, setTimes] = useState([])

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    if (session) {
      getSessionTimesById(session.id)
        .then(times => {
          setTimes(times)
        })
    }
  }, [session])

  const handleSessionClick = e => {
    setSession(sessions[e.key])
  }

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

  const onCreateSession = (name) => {
    axios.post('/api/v1/sessions', {session: {name: name}})
    .then(response => {
      setSessions(sessions => [response.data, ...sessions])
    })
    .catch(error => console.log(error))
  }

  const btn_style = {
    width: "100%",
    textAlign: "left"
  }

  var sessionBtns = []
  for (var key in sessions) {
    const session = sessions[key]
    sessionBtns.push(
      <Button style={btn_style} key={session.id} href={`/sessions/${session.id}`} type="primary">{session.name}</Button>
    )
  }

  return (
    <>
      <Title>Sessions</Title>
      <Row>
        <Col offset={0} span={6}>
          <SessionsMenu
            createSession={onCreateSession}
            onSessionClick={handleSessionClick}
            sessions={sessions}
          />
        </Col>
        <Col offset={1} span={10}>
          <StatsPreview times={times}/>
        </Col>
        <Col offset={1} span={6}>
          <TimesTable times={times} delete={false}/>
        </Col>
      </Row>
    </>
  )
}

export default Sessions