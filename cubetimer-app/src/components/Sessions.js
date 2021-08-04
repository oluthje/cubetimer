import React, { useState, useEffect } from "react";
import { List, Divider, Button, Layout } from 'antd';
import axios from 'axios'
import NewSession from "../components/NewSession";

function Sessions(props) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions()
  }, []);

  const getSessions = () => {
    axios.get('/api/v1/sessions')
    .then(response => {
      if (response.data !== undefined) {
        setSessions(response.data);
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

  return (
    <>
      <Layout>
        <Divider orientation="left">Sessions</Divider>
        <List
          bordered
          dataSource={sessions}
          renderItem={session => (
            <List.Item>
              <Button key={session.id} href={`/sessions/${session.id}`} type="primary">{session.name}</Button>
            </List.Item>
          )}
        />
        <NewSession createSession={onCreateSession}/>
      </Layout>
    </>
  );
}

export default Sessions;