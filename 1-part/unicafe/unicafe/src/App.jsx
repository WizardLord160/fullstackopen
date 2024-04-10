import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } 
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={good} text="good"/>
          <StatisticLine value={neutral} text="neutral"/>
          <StatisticLine value={bad} text="bad"/>
          <StatisticLine value={all} text="all"/>
          <StatisticLine value={(good - bad) / (all)} text="average"/>
          <StatisticLine value={(good / all) * 100 + '%'} text="positive"/>
        </tbody>
      </table>
    </div>
  ) 
}

const StatisticLine = (props) => {
  const {value, text} = props
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App