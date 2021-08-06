import React, { useState } from "react";
import { Typography, Button } from 'antd';
import Timer from 'react-compound-timer'
import { formatCubeTime } from "../helper/functions.js";

const { Title } = Typography

function TimeInput(props) {
  const [buttonName, setButtonName] = useState("Start")
  const [running, setRunning] = useState(false)

  return (
    <>
      <Timer
        initialTime={0}
        startImmediately={false}
        timeToUpdate={10}
      >
        {({ start, stop, reset, getTime }) => (
          <>
            <Title>{formatCubeTime(getTime())}</Title>
            <Button onClick={() => {
              if (running) {
                setRunning(false)
                setButtonName("Start")
                stop()
                props.onTimerDone(getTime())
              } else {
                reset()
                setRunning(true)
                setButtonName("Finish")
                start()
              }
            }
            }>{buttonName}</Button>
          </>
        )}
      </Timer>
    </>
  );
}

export default TimeInput