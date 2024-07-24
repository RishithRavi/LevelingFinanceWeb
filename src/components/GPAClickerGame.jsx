'use client'
import React, { useState, useEffect } from 'react'

export default function GPAClickerGame({ onFinish }) {
  const [clicks, setClicks] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      const gpa = clicks >= 40 ? 4.0 : (clicks / 10).toFixed(2)
      onFinish(gpa)
    }
  }, [timeLeft, onFinish])

  const handleClick = () => {
    setClicks((prevClicks) => prevClicks + 1)
    if (clicks === 40) {
      const gpa = clicks >= 40 ? 4.0 : (clicks / 10).toFixed(2)
      onFinish(gpa)
    }
  }

  const filledSegments = Math.min(clicks / 10, 4)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100">
      <h1 className="mb-4 text-4xl font-bold">Click as much as you can!</h1>
      <div className="mb-4">
        <button
          onClick={handleClick}
          className="rounded-full bg-indigo-500 px-8 py-4 text-2xl font-bold text-white"
        >
          Click Me!
        </button>
      </div>
      <div className="mb-4 text-2xl">Time Left: {timeLeft}s</div>
      <div className="mb-4 text-2xl">Clicks: {clicks}</div>
      <div className="h-16 w-full max-w-md overflow-hidden rounded-lg bg-white">
        <div
          className="transition-width h-full bg-indigo-500 duration-300"
          style={{ width: `${(filledSegments / 4) * 100}%` }}
        ></div>
      </div>
      <div className="mt-2 flex w-full max-w-xl justify-between">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-1/6 text-center">
            {index}
          </div>
        ))}
      </div>
    </div>
  )
}
5
