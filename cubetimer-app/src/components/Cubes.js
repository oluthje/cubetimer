import React from "react";
import { List, Typography, Divider, Button } from 'antd';
import axios from 'axios'

//run 'heroku local -f Procfile.dev' in terminal to start app

class Cubes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubes: []
    };
  }

  getCubes() {
    axios.get('/api/v1/cubes')
    .then(response => {
      this.setState({cubes: response.data});
      console.log(response.data);
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getCubes()
    console.log("cubes")
    console.log(this.state.cubes)
  }

  render() {
    return (
      <>
        <Divider orientation="left">Cubes</Divider>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={this.state.cubes}
          renderItem={cube => (
            <List.Item>
              <List.Item.Meta
                //title={<link to={`/cube/${cube.id}`}>{cube.name}</link>}
                title={<Button href={`/cube/${cube.id}`} type="link">{cube.name}</Button>}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default Cubes;