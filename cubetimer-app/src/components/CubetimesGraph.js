import React from "react"
import { Card } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

function CubetimesGraph(props) {
  var data = []
  var times = props.times

  for (var key in times) {
    const ms = times[key].seconds
    const seconds = ms / 1000
    data.push({
      name: key,
      time: parseFloat(seconds.toFixed(2))
    })
  }

  return (
    <Card>
      <ResponsiveContainer height={200}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="time"
            stroke="#8884d8"
            dot={false}
          />
          <Line type="monotone" dataKey="ao5" stroke="#82ca9d" />
          <Line type="monotone" dataKey="ao12" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default CubetimesGraph
