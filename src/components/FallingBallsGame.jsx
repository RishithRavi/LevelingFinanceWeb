'use client'
import React, { useState, useEffect } from 'react'

const experiences = ['Internship', 'Co-op', 'Research', 'Volunteer']

const generateBall = () => ({
  id: Math.random(),
  x: Math.random() * window.innerWidth - window.innerWidth / 3,
  y: 0,
  speed: 8 + Math.random() * 1,
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
      }, 40)

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
  }, [timeLeft, onFinish])

  const handleBallClick = (id) => {
    setBalls((balls) => balls.filter((ball) => ball.id !== id))
    setScore(score + 1)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-blue-100 p-4 md:p-8">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Catch the Balls!
      </h1>
      <div className="absolute left-0 top-0 h-full w-full">
        {balls.map((ball) => (
          <div
            key={ball.id}
            onClick={() => handleBallClick(ball.id)}
            className="absolute flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-indigo-500 md:h-24 md:w-24"
            style={{ top: ball.y, left: ball.x }}
          >
            <div className="relative">
              <p className="absolute inset-0 flex select-none items-center justify-center text-xs text-white md:text-sm">
                {ball.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 text-xl md:text-2xl">Time Left: {timeLeft}s</div>
      <div className="text-xl md:text-2xl">Score: {score}</div>
    </div>
  )
}
