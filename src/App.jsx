import { useState } from 'react'
import './App.css'

const cards = [
  {
    title: 'Connect',
    body: 'Link this repository in Base Code and pick the branch to start from.',
  },
  {
    title: 'Change',
    body: 'Describe a change in the AI chat, check it in Preview, then open a pull request.',
  },
]

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <main className="demo">
      <h1>Base Code Demo</h1>
      <p className="intro">
        A small disposable project for testing the Base Code flow against the
        documentation.
      </p>
      <div className="cards">
        {cards.map((card) => (
          <section className="card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </section>
        ))}
      </div>
      <button type="button" onClick={() => setClicks((count) => count + 1)}>
        Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
      </button>
    </main>
  )
}

export default App
