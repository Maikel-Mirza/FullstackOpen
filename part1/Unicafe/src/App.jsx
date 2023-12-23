import { useState } from 'react'

const StatisticsLine = (props) => { 
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}
const Button = (props) => { 
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}
const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h4>statistics</h4>
      <table>
        <tbody>
        <tr>
          <td><StatisticsLine text="good" value={props.good}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="neutral" value={props.neutral}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="bad" value={props.bad}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="average" value={props.average}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="positive" value={props.positive}/></td>
          </tr>
          </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const average = (good + bad + neutral) / 3;
  const positive = good / (good + bad + neutral) * 100 + ' %'
  //const n = Math.floor(Math.random() * anecdotes.length)
 
  const goodClick = () => { 
    setGood(good + 1)
  }
  const neutralClick = () => { 
    setNeutral(neutral + 1)
  }
  const badClick = () => { 
    setBad(bad + 1)
  }
  const anecdoteClick = () => { 
   // Generate a new random index until it's different from the current selected
  let newSelected;
  do {
    newSelected = Math.floor(Math.random() * anecdotes.length);
  } while (newSelected === selected);

  // Set the new selected index
  setSelected(newSelected);
  }
  const voteClick = () => {
  const newVotes = [...votes];
  newVotes[selected] += 1;
  setVotes(newVotes);
  }
  const indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }
    let max = arr[0];
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button onClick={anecdoteClick} text="next anecdote" />
      <Button onClick={voteClick} text="vote" />
      <h2>Anecdote with the most votes</h2>
      {anecdotes[indexOfMax(votes)]}
      <h3>give feedback</h3>
      <Button onClick={goodClick} text="good" />
      <Button onClick={neutralClick} text="neutral" />
      <Button onClick={badClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

export default App