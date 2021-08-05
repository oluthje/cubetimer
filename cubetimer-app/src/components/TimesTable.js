import React from "react";
import { Table } from 'antd';

function TimesTable(props) {
	const { Column } = Table;
	const data = [];
	const times = props.times

  for (let i = times.length - 1; i >= 0; i--) {
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
	)
}

export default TimesTable