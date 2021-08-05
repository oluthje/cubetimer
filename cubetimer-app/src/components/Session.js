import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import Timer from "../components/Timer";
import TimesTable from "../components/TimesTable";
import SessionsDropdown from "../components/SessionsDropdown";
import axios from 'axios'

function Session(props) {
  const [sessions, setSessions] = useState()
  const [session, setSession] = useState()
  const [times, setTimes] = useState([])

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    getSessionTimes()
  })

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

  return (
    <>
      <Row>
        <Timer addCubetime={addCubetime}/>
        <Col offset={20} span={2}>
          <SessionsDropdown session={session} sessions={sessions} onDropdownClick={handleDropdownClick}/>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col offset={1} span={22}>
          <TimesTable times={times}/>
        </Col>
      </Row>
    </>
  )
}

export default Session