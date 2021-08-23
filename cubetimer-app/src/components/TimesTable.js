import React from "react";
import { Table, Button, Card } from 'antd';
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

	return (
		<>
      <Card>
        <Table dataSource={data} scroll={{ y: 475 }} pagination={false}>
          <Column title="#" dataIndex="key" key="key" />
          <Column title="Time" dataIndex="time" key="time" />
          {props.delete ? <Column
            title="Delete"
            render={(text, record) => (
              <a onClick={() => props.onCubetimeDelete(record)}>Delete</a>
            )}
          /> : null}
        </Table>
      </Card>
     </>
	)
}

export default TimesTable