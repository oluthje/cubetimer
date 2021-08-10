import React, { useState, useEffect } from "react"
import { Card, Row, Col } from 'antd'
import { formatCubeTime, getAvgOf, capitalizeFirstLetter} from "../helper/functions.js"

function StatsPreview(props) {
  const times = props.times
  const gutter = [16, 16]
  const [stats, setStats] = useState({})

  function getStats() {
    var best = "-"
    var worst = "-"
    var avg = getAvgOf(null, times) ? formatCubeTime(getAvgOf(null, times)) : "-"
    var ao5 = getAvgOf(5, times) ? formatCubeTime(getAvgOf(5, times)) : "-"
    var ao12 = getAvgOf(12, times) ? formatCubeTime(getAvgOf(12, times)) : "-"
    var ao100 = getAvgOf(100, times) ? formatCubeTime(getAvgOf(100, times)) : "-"

    for (let key = 0; key < times.length; key++) {
      const ms = times[key].seconds
      if (key == 0) {
        best = ms
        worst = ms
      }
      best = ms < best ? ms : best
      worst = ms > worst ? ms : worst
    }
    if (best !== "-") {
      best = formatCubeTime(best)
      worst = formatCubeTime(worst)
    }

    setStats({
      "best": best.replace(/\s+/g, ''),
      "avg": avg.replace(/\s+/g, ''),
      "worst": worst.replace(/\s+/g, ''),
      "ao5": ao5.replace(/\s+/g, ''),
      "ao12": ao12.replace(/\s+/g, ''),
      "ao100": ao100.replace(/\s+/g, '')
    })
  }

  useEffect(() => {
    getStats()
  }, [times])

  const stat_cards = {
    "best": {"span": 24},
    "avg": {"span": 8},
    "worst": {"span": 8},
    "ao5": {"span": 8},
    "ao12": {"span": 12},
    "ao100": {"span": 12}
  }

  var stat_cols = []
  for (var key in stat_cards) {
    stat_cols.push(
      <Col span={stat_cards[key]["span"]}>
        <Card>{capitalizeFirstLetter(key)} <b style={{ float: 'right' }}>{stats[key]}</b></Card>
      </Col>
    )
  }

  return (
    <>
      <Card>
        <Row gutter={gutter}>
          {stat_cols}
        </Row>
      </Card>
    </>
  )
}

export default StatsPreview