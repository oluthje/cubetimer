import React, { useState, useEffect, useRef } from "react"
import { Row, Col, Space } from 'antd'
import { getSessionTimesById } from "../helper/functions.js"
import { makeScramble } from "../helper/scrambles.js"
import Timer from "../components/Timer"
import TimeInput from "../components/TimeInput"
import TimesTable from "../components/TimesTable"
import SessionsDropdown from "../components/SessionsDropdown"
import StatsPreview from "../components/StatsPreview"
import CubetimesGraph from "../components/CubetimesGraph"
import Scrambler from "../components/Scrambler"
import axios from 'axios'

function Session(props) {
  const [sessions, setSessions] = useState()
  const [session, setSession] = useState()
  const [times, setTimes] = useState([])
  const [showComps, setShowComps] = useState(true)
  const [scramble, setScramble] = useState(makeScramble())
  const [scrambleLocked, setScrambleLocked] = useState(false)
  const sessionRef = useRef()
  sessionRef.current = session
  const lockedRef = useRef()
  lockedRef.current = scrambleLocked

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
    handleScrambleReload()
  }

  const handleTimerStart = () => {
    setShowComps(false)
  }

  const handleCubetimeDelete = (record) => {
    axios.delete(`/api/v1/sessions/${sessionRef.current.id}/cubetimes/${record.id}`)
    .then(response => {
      if (response) {
        setTimes(times.filter(time => time.id !== record.id))
      }
    })
    .catch(error => console.log(error))
  }

  const handleScrambleReload = () => {
    if (!lockedRef.current) {
      setScramble(makeScramble())
    }
  }

  const toggleLocked = () => setScrambleLocked(scrambleLocked => !scrambleLocked)

  return (
    <>
      {showComps ?
        <Row>
          <Col offset={20} span={2}>
              <SessionsDropdown
                session={session}
                sessions={sessions}
                onDropdownClick={handleDropdownClick}
              />
          </Col>
        </Row>
      : null }

      <Scrambler onScrambleReload={handleScrambleReload} scramble={scramble} onLockToggle={toggleLocked} locked={scrambleLocked}/>
      <br/>

      <br/>
      <Space style={{width: '100%', justifyContent: 'center'}}>
        <Timer onTimerDone={handleTimerDone} onTimerStart={handleTimerStart}/>
      </Space>
      <br/>
      <br/>
      <br/>
      <br/>

      {showComps ?
        <Row>
          <Col offset={1} span={7}>
            <TimesTable times={times} delete={true} onCubetimeDelete={handleCubetimeDelete}/>
          </Col>
          <Col offset={1} span={14}>
            <Space size={32} direction="vertical">
              <StatsPreview times={times}/>
              <CubetimesGraph times={times}/>
            </Space>
          </Col>
        </Row>
      : null}
    </>
  )
}

export default Session