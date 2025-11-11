import { useState } from 'react'

const Button =({handelClick,text})=>{
return(
  <button onClick={handelClick}>{text}</button>
)
}
const StatisticLine =({text,value})=>{
  return(
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } 
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text ="good" value = {good} />
          <StatisticLine text ="neutral" value = {neutral} />
          <StatisticLine text ="bad" value = {bad} />
          <StatisticLine text ="all" value = {all} />
          <StatisticLine text ="average" value = {average.toFixed(1)} />
          <StatisticLine text ="positive" value = {positive.toFixed(1) + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () =>{ 
    const newGood = good + 1
    const newAll = newGood + neutral + bad
    setGood(newGood)
    setAll(newAll)
    setAverage((newGood - bad) / newAll)
    setPositive((newGood / newAll) * 100)
  }
  
  
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    const newAll = good + newNeutral + bad
    setNeutral(newNeutral)
    setAll(newAll)
    setAverage((good - bad) / newAll)
    setPositive((good / newAll) * 100)
    
  }


  const handleBadClick = () => {
    const newBad = bad + 1
    const newAll = good + neutral + newBad
    setBad(newBad)
    setAll(newAll)
    setAverage((good - newBad) / newAll)
    setPositive((good / newAll) * 100)
  }




  return (
    <div>
      <h1>give feedback</h1>
      <Button handelClick ={handleGoodClick} text = "good" />
      <Button handelClick ={handleNeutralClick} text = "neutral" />
      <Button handelClick ={handleBadClick} text = "bad" />

      <Statistics
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive} 
      />  
    </div>
  )
}

export default App