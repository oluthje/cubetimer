import React, { useState, useEffect } from "react";
import { List, Divider, Button, Layout } from 'antd';
import axios from 'axios'
import NewCube from "../components/NewCube";

function Cubes(props) {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    getCubes()
  }, []);

  const getCubes = () => {
    axios.get('/api/v1/cubes')
    .then(response => {
      setCubes(response.data);
    })
    .catch(error => console.log(error))
  }

  const onCreateCube = (name) => {
    axios.post('/api/v1/cubes', {cube: {name: name}})
    .then(response => {
      setCubes(cubes => [...cubes, response.data])
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <Layout>
        <Divider orientation="left">Cubes</Divider>
        <List
          bordered
          dataSource={cubes}
          renderItem={cube => (
            <List.Item>
              <Button key={cube.id} href={`/cube/${cube.id}`} type="primary">{cube.name}</Button>
            </List.Item>
          )}
        />
        <NewCube createCube={onCreateCube}/>
      </Layout>
    </>
  );
}

export default Cubes;