import React from "react";
import { Table } from 'antd';
import { formatCubeTime } from "../helper/functions.js";

function TimesTable(props) {
	const { Column } = Table;
	const data = [];
	const times = props.times

  for (let i = times.length - 1; i >= 0; i--) {
    const dict = {
      key: i + 1,
      id: times[i].id,
      time: formatCubeTime(times[i].seconds).replace(/\s+/g, '')
    }
    data.push(dict)
  }
  //scroll={{ y: 250 }}
	return (
		<>
      <Table dataSource={data}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="Time" dataIndex="time" key="time" />
      </Table>
     </>
	)
}

export default TimesTable