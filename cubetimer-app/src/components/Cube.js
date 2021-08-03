import React from "react";
import { Link } from "react-router-dom";
import { Table } from 'antd';

class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    };
  }
  
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    
    const url = `/api/v1/show/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ times: response }))
      .catch(() => this.props.history.push("/"));

    console.log(this.state.times)
  }

  render() {
    const { Column } = Table;
    const { times } = this.state;
    const data = [];

    for (let i = 0; i < times.length; i++) {
      const dict = {
        key: i + 1,
        id: times[i].id,
        seconds: times[i].seconds
      }
      data.push(dict);
    }

    let table = (
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Seconds" dataIndex="seconds" key="seconds" />
      </Table>
    );

    return (
      <>
        {table}
      </>
    );
  }
}
export default Cube;