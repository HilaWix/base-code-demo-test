import { useEffect, useState } from 'react'

const SYMBOLS = ['📼', '💾', '🕹️', '📟', '📺', '☎️', '💿', '👾']

function makeDeck() {
  return [...SYMBOLS, ...SYMBOLS]
    .map((symbol, index) => ({ id: `${symbol}-${index}`, symbol }))
    .sort(() => Math.random() - 0.5)
}

function MemoryMatch() {
  const [deck, setDeck] = useState(makeDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)

  const won = matched.length === SYMBOLS.length

  const reset = () => {
    setDeck(makeDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
  }

  const chooseCard = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return
    if (matched.includes(deck[index].symbol)) return
    setFlipped((current) => [...current, index])
  }

  useEffect(() => {
    if (flipped.length !== 2) return undefined

    const [first, second] = flipped
    setMoves((current) => current + 1)

    if (deck[first].symbol === deck[second].symbol) {
      const timer = window.setTimeout(() => {
        setMatched((current) => [...current, deck[first].symbol])
        setFlipped([])
      }, 350)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => setFlipped([]), 700)
    return () => window.clearTimeout(timer)
  }, [deck, flipped])

  return (
    <div className="game-layout">
      <div className="game-stage">
        <div className="memory-grid" aria-label="Memory matching grid">
          {deck.map((card, index) => {
            const isMatched = matched.includes(card.symbol)
            const isVisible = isMatched || flipped.includes(index)
            return (
              <button
                className={`memory-card ${isVisible ? 'revealed' : ''} ${isMatched ? 'matched' : ''}`}
                type="button"
                key={card.id}
                onClick={() => chooseCard(index)}
                aria-label={isVisible ? card.symbol : 'Hidden card'}
                disabled={isMatched}
              >
                {isVisible ? card.symbol : '■'}
              </button>
            )
          })}
        </div>
      </div>

      <aside className="game-sidebar">
        <div className="stat-card">
          <small>MOVES</small>
          <strong>{moves.toString().padStart(2, '0')}</strong>
        </div>
        <div className="stat-card">
          <small>PAIRS</small>
          <strong>{matched.length}/8</strong>
        </div>
        <p className="instructions">Flip two cards at a time and find all eight matching retro-tech pairs.</p>
        <button className="pixel-button" type="button" onClick={reset}>SHUFFLE</button>
        <p className="game-message" aria-live="polite">
          {won ? `CLEAR! Memory survived in ${moves} moves.` : 'Match the old-tech relics.'}
        </p>
      </aside>
    </div>
  )
}

export default MemoryMatch
