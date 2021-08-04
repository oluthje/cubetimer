import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import axios from 'axios'

function Session(props) {
  const [times, setTimes] = useState([])
  
  var url = props.match.url.split("/")
  const id = url[url.length - 1]

  useEffect(() => {
    getSession()
  }, [])

  const getSession = () => {
    axios.get(`/api/v1/sessions/${id}`)
    .then(response => {
      setTimes(response.data);
    })
    .catch(error => console.log(error))
  }

  const { Column } = Table;
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
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Seconds" dataIndex="seconds" key="seconds" />
      </Table>
    </>
  );
}

export default Session;