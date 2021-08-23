import React, { useState, useEffect } from "react"
import { List, Divider, Button, Card, Row, Col, Typography, Space } from 'antd'
import { getSessionTimesById } from "../helper/functions.js"
import SessionsMenu from "../components/SessionsMenu"
import StatsPreview from "../components/StatsPreview"
import TimesTable from "../components/TimesTable"
import ConfirmModal from "../components/ConfirmModal"
import axios from 'axios'

const { Title } = Typography

function Sessions(props) {
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState()
  const [times, setTimes] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)

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

  const handleSessionDelete = () => {
    axios.delete(`/api/v1/sessions/${session.id}`)
    .then(response => {
      if (response) {
        setSessions(sessions.filter(someSession => someSession.id !== session.id))
      }
    })
    .catch(error => console.log(error))
  }

  const handleModalConfirm = () => {
    setShowConfirmModal(false)
    handleSessionDelete()
  }

  return (
    <>
      <ConfirmModal
        visible={showConfirmModal}
        title={"Delete " + (session ? session.name : "null") + "?"}
        description="Are you sure?"
        onConfirm={handleModalConfirm}
        handleCancel={() => setShowConfirmModal(false)}
      />
      <Row>
        <Title>Sessions</Title>
        <Col align="right">
          <Button onClick={() => setShowConfirmModal(true)} type="primary" danger>Delete Session</Button>
        </Col>
      </Row>
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