import React, { useState, useEffect, useCallback, useRef } from "react";
import { Typography } from 'antd';
import CompoundTimer from 'react-compound-timer'
import { formatCubeTime } from "../helper/functions.js";

const { Title } = Typography

function Timer(props) {
  const [titleType, setTitleType] = useState("default")
  const timerControl = useRef()
  var spaceDown = false
  var running = false
  var timerReady = false
  var waitTime = 500

  var waitIntervalId

  function startTimerWait() {
    waitIntervalId = setInterval(onTimerWaitCompleted, waitTime)
  }

  function cancelTimerWait() {
    clearInterval(waitIntervalId)
  }

  function onTimerWaitCompleted() {
    setTitleType("success")
    clearInterval(waitIntervalId)
    timerReady = true
  }

  const onKeyDown = useCallback((event) => {
    if(event.keyCode === 32 && !spaceDown) {
      if (running) {
        handleTimerToggle()
      } else {
        setTitleType("danger")
        startTimerWait()
      }
      spaceDown = true
    }
  })

  const onKeyUp = useCallback((event) => {
    if(event.keyCode === 32 && spaceDown) {
      if (!running && timerReady) {
        handleTimerToggle()
      } else if (!timerReady) {
        cancelTimerWait()
      }
      timerReady = false
      spaceDown = false
      setTitleType("default")
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
      document.addEventListener("keyup", onKeyUp);
    };
  }, [])

  function handleTimerToggle() {
    const control = timerControl.current
    if (running) {
      control.stop()
      props.onTimerDone(control.getTime())
      setButtonName("Start")
    } else {
      control.reset()
      control.start()
      setButtonName("Finish")
    }
    running = !running
  }

  return (
    <>
      <CompoundTimer
        initialTime={0}
        startImmediately={false}
        timeToUpdate={10}
        id={"compound-timer"}
      >
        {(control) => {
          timerControl.current = control
          return (
            <React.Fragment>
              <Title type={titleType}>{formatCubeTime(control.getTime())}</Title>
            </React.Fragment>
          )
        }}
      </CompoundTimer>
    </>
  );
}

export default Timer