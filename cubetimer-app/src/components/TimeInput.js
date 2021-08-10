import React from "react";
import { Input, Col } from 'antd';

function TimeInput(props) {
  const input_id = "timer-input"

  const onEnter = () => {
    var element = document.getElementById(input_id);
    props.addCubetime(element.value)
  }

  return (
    <>
      <Col offset={9} span={8}>
        <Input id={input_id} size="large" placeholder="seconds" onPressEnter={onEnter} />
      </Col>
    </>
  );
}

export default TimeInput