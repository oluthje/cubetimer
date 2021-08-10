import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from 'antd';
import Timer from "../components/Timer";
import TimeInput from "../components/TimeInput";
import TimesTable from "../components/TimesTable";
import SessionsDropdown from "../components/SessionsDropdown";
import StatsPreview from "../components/StatsPreview";
import axios from 'axios'

function Session(props) {
  const [sessions, setSessions] = useState()
  const [session, setSession] = useState()
  const [times, setTimes] = useState([])
  const sessionRef = useRef()
  sessionRef.current = session

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    getSessionTimes()
  }, [session])

  const handleDropdownClick = e => {
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

  const getSessionTimes = () => {
    if (session) {
      axios.get(`/api/v1/sessions/${session.id}`)
      .then(response => {
        setTimes(response.data);
      })
      .catch(error => console.log(error))
    }
  }

  const addCubetime = (seconds) => {
    axios.post(`/api/v1/sessions/${sessionRef.current.id}/cubetimes`, {cubetime: {seconds: seconds}})
    .then(response => {
      setTimes(times => [...times, response.data])
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <Row>
        <Col offset={20} span={2}>
          <SessionsDropdown session={session} sessions={sessions} onDropdownClick={handleDropdownClick}/>
        </Col>
      </Row>
      <br/>
      <br/>
      <Row justify="center">
        <Col>
          <Timer onTimerDone={addCubetime}/>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col offset={1} span={10}>
          <TimesTable times={times}/>
        </Col>
        <Col offset={2} span={10}>
          <StatsPreview times={times}/>
        </Col>
      </Row>
    </>
  )
}

export default Session