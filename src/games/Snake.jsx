import { useEffect, useRef, useState } from 'react'

const SIZE = 14
const START = [
  { x: 6, y: 7 },
  { x: 5, y: 7 },
  { x: 4, y: 7 },
]
const START_FOOD = { x: 10, y: 7 }

function nextFood(snake) {
  const open = []
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (!snake.some((part) => part.x === x && part.y === y)) {
        open.push({ x, y })
      }
    }
  }
  return open[Math.floor(Math.random() * open.length)] || START_FOOD
}

function Snake() {
  const [snake, setSnake] = useState(START)
  const [food, setFood] = useState(START_FOOD)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('Press START, then use the arrows or D-pad.')
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('retro44-snake-high')) || 0
    } catch {
      return 0
    }
  })
  const direction = useRef({ x: 1, y: 0 })

  const score = snake.length - START.length

  const chooseDirection = (x, y) => {
    const current = direction.current
    if (current.x + x === 0 && current.y + y === 0) return
    direction.current = { x, y }
  }

  const reset = () => {
    direction.current = { x: 1, y: 0 }
    setSnake(START)
    setFood(START_FOOD)
    setMessage('Go!')
    setRunning(true)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      const keyMap = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      }
      const move = keyMap[event.key]
      if (!move) return
      event.preventDefault()
      chooseDirection(move[0], move[1])
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!running) return undefined

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0]
        const nextHead = {
          x: head.x + direction.current.x,
          y: head.y + direction.current.y,
        }

        const wallHit =
          nextHead.x < 0 ||
          nextHead.x >= SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= SIZE

        const selfHit = currentSnake.some(
          (part) => part.x === nextHead.x && part.y === nextHead.y,
        )

        if (wallHit || selfHit) {
          setRunning(false)
          setMessage('GAME OVER. The pixel snake has become a legacy system.')
          return currentSnake
        }

        const ate = nextHead.x === food.x && nextHead.y === food.y
        const nextSnake = [nextHead, ...currentSnake]
        if (!ate) nextSnake.pop()

        if (ate) {
          setFood(nextFood(nextSnake))
          const nextScore = nextSnake.length - START.length
          setHighScore((currentHigh) => {
            const best = Math.max(currentHigh, nextScore)
            try {
              localStorage.setItem('retro44-snake-high', String(best))
            } catch {
              // High score persistence is optional.
            }
            return best
          })
        }

        return nextSnake
      })
    }, 150)

    return () => window.clearInterval(timer)
  }, [food, running])

  const cells = []
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const snakeIndex = snake.findIndex((part) => part.x === x && part.y === y)
      const isFood = food.x === x && food.y === y
      const className = [
        'snake-cell',
        snakeIndex >= 0 ? 'snake' : '',
        snakeIndex === 0 ? 'head' : '',
        isFood ? 'food' : '',
      ].filter(Boolean).join(' ')

      cells.push(<span className={className} key={`${x}-${y}`} />)
    }
  }

  return (
    <div className="game-layout">
      <div>
        <div className="game-stage">
          <div className="snake-board" aria-label="Snake game board">{cells}</div>
        </div>

        <div className="dpad" aria-label="Snake touch controls">
          <button className="control-button up" type="button" onClick={() => chooseDirection(0, -1)}>↑</button>
          <button className="control-button left" type="button" onClick={() => chooseDirection(-1, 0)}>←</button>
          <button className="control-button down" type="button" onClick={() => chooseDirection(0, 1)}>↓</button>
          <button className="control-button right" type="button" onClick={() => chooseDirection(1, 0)}>→</button>
        </div>
      </div>

      <aside className="game-sidebar">
        <div className="stat-card">
          <small>SCORE</small>
          <strong>{score.toString().padStart(2, '0')}</strong>
        </div>
        <div className="stat-card">
          <small>HIGH SCORE</small>
          <strong>{highScore.toString().padStart(2, '0')}</strong>
        </div>
        <p className="instructions">Desktop: arrow keys. Mobile: use the D-pad. Eat the pink pixels and avoid the walls or your own trail.</p>
        <button className="pixel-button" type="button" onClick={reset}>
          {running ? 'RESTART' : 'START'}
        </button>
        <p className="game-message" aria-live="polite">{message}</p>
      </aside>
    </div>
  )
}

export default Snake
