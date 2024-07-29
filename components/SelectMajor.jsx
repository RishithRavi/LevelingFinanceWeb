'use client'
import React, { useRef, useEffect, useState } from 'react'
import useDraggableScroll from '../hooks/useDraggableScroll'
import useAutoScroll from '../hooks/useAutoScroll'

const majors = [
  {
    title: 'Computer Science',
    description: 'Study of computation and information processing',
    salary: '$70,000',
  },
  {
    title: 'Mechanical Engineering',
    description: 'Design and manufacture of mechanical systems',
    salary: '$65,000',
  },
  {
    title: 'Business Administration',
    description: 'Management of business operations',
    salary: '$60,000',
  },
  {
    title: 'Psychology',
    description: 'Study of mind and behavior',
    salary: '$50,000',
  },
  {
    title: 'Biology',
    description: 'Study of living organisms',
    salary: '$55,000',
  },
]

export default function SelectMajor({ meta }) {
  const [windowSize, setWindowSize] = useState(false)

  useEffect(() => {
    setWindowSize(window.visualViewport.width > 450)
  }, [])

  // if(windowSize.width > 450)
  const scrollRef = useRef(null)

  useDraggableScroll(scrollRef, meta)
  useAutoScroll(scrollRef)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-10 animate-slidein text-4xl font-bold text-indigo-600 opacity-0 [--slidein-delay:800ms] md:text-6xl">
          Choose Your Major
        </h1>
      </div>
      {windowSize ? (
        <div
          ref={scrollRef}
          className="scroll-container flex w-full max-w-screen-2xl animate-slidein space-x-6 overflow-x-hidden p-4 opacity-0 [--slidein-delay:1000ms] hover:cursor-grab"
        >
          {majors.map((major, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-shrink-0 rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition hover:scale-110 md:min-w-[300px]"
            >
              <h2 className="mb-2 select-none text-lg font-bold md:text-xl">
                {major.title}
              </h2>
              <p className="mb-4 select-none text-sm">{major.description}</p>
              <p className="select-none text-sm font-semibold">
                Starting Salary: {major.salary}
                <button
                  id={major.title}
                  className="ml-4 rounded-full bg-white px-3 py-1 font-bold italic text-indigo-500 transition hover:scale-110"
                >
                  Let&apos;s do it
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="scroll-container w-full max-w-screen-2xl animate-slidein flex-col space-y-6 overflow-x-hidden p-4 opacity-0 [--slidein-delay:400ms] hover:cursor-grab"
        >
          {majors.map((major, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-shrink-0 rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition md:min-w-[300px]"
            >
              <h2 className="mb-2 select-none text-lg font-bold md:text-xl">
                {major.title}
              </h2>
              <p className="mb-4 select-none text-sm">{major.description}</p>
              <p className="select-none text-sm font-semibold">
                Starting Salary: {major.salary}
                <button
                  id={major.title}
                  className="ml-4 rounded-full bg-white px-3 py-1 font-bold italic text-indigo-500 transition"
                >
                  Let&apos;s do it
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
