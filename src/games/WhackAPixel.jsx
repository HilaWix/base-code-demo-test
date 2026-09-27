import { useEffect, useState } from 'react'

function randomTarget(previous = -1) {
  let next = Math.floor(Math.random() * 9)
  while (next === previous) next = Math.floor(Math.random() * 9)
  return next
}

function WhackAPixel() {
  const [running, setRunning] = useState(false)
  const [target, setTarget] = useState(-1)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('retro44-whack-high')) || 0
    } catch {
      return 0
    }
  })

  const start = () => {
    setScore(0)
    setTime(20)
    setTarget(randomTarget())
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return undefined

    const targetTimer = window.setInterval(() => {
      setTarget((current) => randomTarget(current))
    }, 620)

    return () => window.clearInterval(targetTimer)
  }, [running])

  useEffect(() => {
    if (!running) return undefined

    const clock = window.setInterval(() => {
      setTime((current) => {
        if (current <= 1) {
          setRunning(false)
          setTarget(-1)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(clock)
  }, [running])

  useEffect(() => {
    if (running || time !== 0) return
    setBest((current) => {
      const nextBest = Math.max(current, score)
      try {
        localStorage.setItem('retro44-whack-high', String(nextBest))
      } catch {
        // High score persistence is optional.
      }
      return nextBest
    })
  }, [running, score, time])

  const hit = (index) => {
    if (!running || index !== target) return
    setScore((current) => current + 1)
    setTarget((current) => randomTarget(current))
  }

  return (
    <div className="game-layout">
      <div className="game-stage">
        <div className="whack-grid" aria-label="Whack-a-Pixel game grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <button
              className={index === target ? 'whack-cell target' : 'whack-cell'}
              type="button"
              key={index}
              onClick={() => hit(index)}
              aria-label={index === target ? 'Hit the invader' : 'Empty pixel'}
            >
              {index === target ? '👾' : '·'}
            </button>
          ))}
        </div>
      </div>

      <aside className="game-sidebar">
        <div className="stat-card">
          <small>TIME</small>
          <strong>{time}s</strong>
        </div>
        <div className="stat-card">
          <small>SCORE / BEST</small>
          <strong>{score} / {best}</strong>
        </div>
        <p className="instructions">Hit the invader before it jumps to another square. You get 20 seconds.</p>
        <button className="pixel-button" type="button" onClick={start}>
          {running ? 'RESTART TIMER' : 'START 20 SEC'}
        </button>
        <p className="game-message" aria-live="polite">
          {running ? 'GO GO GO' : time === 0 ? `TIME! Final score: ${score}.` : 'Awaiting coin insert.'}
        </p>
      </aside>
    </div>
  )
}

export default WhackAPixel
