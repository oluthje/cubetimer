import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from 'antd';
import { getSessionTimesById } from "../helper/functions.js"
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
  const [showComps, setShowComps] = useState(true)
  const sessionRef = useRef()
  sessionRef.current = session

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

  const addCubetime = (ms) => {
    axios.post(`/api/v1/sessions/${sessionRef.current.id}/cubetimes`, {cubetime: {seconds: ms}})
    .then(response => {
      setTimes(times => [...times, response.data])
    })
    .catch(error => console.log(error))
  }

  const handleTimerDone = (ms) => {
    addCubetime(ms)
    setShowComps(true)
  }

  const handleTimerStart = () => {
    setShowComps(false)
  }

  return (
    <>
      <Row>
        <Col offset={20} span={2}>
          {showComps ?
            <SessionsDropdown
              session={session}
              sessions={sessions}
              onDropdownClick={handleDropdownClick}
            /> : null }
        </Col>
      </Row>
      {showComps ? null : <br/>}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row justify="center">
        <Col>
          <Timer onTimerDone={handleTimerDone} onTimerStart={handleTimerStart}/>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col offset={1} span={10}>
          {showComps ? <TimesTable times={times}/> : null}
        </Col>
        <Col offset={2} span={10}>
          {showComps ? <StatsPreview times={times}/> : null}
        </Col>
      </Row>
    </>
  )
}

export default Session