'use client'
import React, { useState, useEffect } from 'react'

const experiences = ['Internship', 'Co-op', 'Research', 'Volunteer']

const generateBall = () => ({
  id: Math.random(),
  x: Math.random() * window.innerWidth,
  y: 0,
  speed: 8 + Math.random() * 3,
  text: experiences[Math.floor(Math.random() * experiences.length)],
})

export default function FallingBallsGame({ onFinish }) {
  const [balls, setBalls] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setBalls((balls) =>
          balls.map((ball) => ({ ...ball, y: ball.y + ball.speed })),
        )
        setBalls((balls) => balls.filter((ball) => ball.y < window.innerHeight))
      }, 50)

      const spawnInterval = setInterval(() => {
        setBalls((balls) => [...balls, generateBall()])
      }, 500)

      const timer = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
        clearInterval(spawnInterval)
        clearInterval(timer)
      }
    } else {
      onFinish(score)
    }
  }, [timeLeft, onFinish, score])

  const handleBallClick = (id) => {
    setBalls((balls) => balls.filter((ball) => ball.id !== id))
    setScore(score + 1)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-blue-100">
      <h1 className="mb-4 text-4xl font-bold">Catch the Balls!</h1>
      <div className="absolute left-0 top-0 h-full w-full">
        {balls.map((ball) => (
          <div
            key={ball.id}
            onClick={() => handleBallClick(ball.id)}
            className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500"
            style={{ top: ball.y, left: ball.x }}
          >
            <div className="relative">
              {/* <p className="text-center text-white">{ball.text}</p> */}
              <p
                className="absolute inset-0 flex items-center justify-center text-xs text-white"
                style={{ transform: 'rotate(-45deg)' }}
              >
                {ball.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 text-2xl">Time Left: {timeLeft}s</div>
      <div className="text-2xl">Score: {score}</div>
    </div>
  )
}
