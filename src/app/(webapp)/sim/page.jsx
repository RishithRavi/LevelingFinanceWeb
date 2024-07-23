'use client'
import React, { useState, useEffect, useRef } from 'react'

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

const tiers = [
  {
    title: 'Tier 1',
    description: 'Top ranked colleges and universities',
  },
  {
    title: 'Tier 2',
    description: 'Highly reputable institutions with strong programs',
  },
  {
    title: 'Tier 3',
    description: 'Mid-level colleges with good programs',
  },
  {
    title: 'Tier 4',
    description: 'Regional and community colleges',
  },
]

function useDraggableScroll(ref, meta) {
  useEffect(() => {
    const el = ref.current

    let isDown = false
    let startX
    let scrollLeft
    let isDragging = false

    const onMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON') {
        console.log(e.target.id)
        meta.setStep(meta.step + 1)
        meta.setMajor(e.target.id)
        return // Prevent drag on button click
      }
      isDown = true
      isDragging = false
      el.classList.add('active')
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      console.log(isDown)
    }

    const onMouseLeave = () => {
      isDown = false
      el.classList.remove('active')
    }

    const onMouseUp = (e) => {
      isDown = false
      el.classList.remove('active')
      if (!isDragging) return // Do not count as drag if not moved
      e.target.click() // Trigger click event if it's a button
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      isDragging = true
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1
      el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [meta, ref])
}

function useAutoScroll(ref) {
  useEffect(() => {
    const el = ref.current

    const cloned = el.innerHTML
    el.innerHTML += cloned

    let autoScroll = setInterval(() => {
      el.scrollLeft += 1
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
    }, 20)

    el.addEventListener('mouseover', () => clearInterval(autoScroll))
    el.addEventListener('mouseout', () => {
      autoScroll = setInterval(() => {
        el.scrollLeft += 1
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }, 20)
    })

    return () => {
      clearInterval(autoScroll)
      el.removeEventListener('mouseover', () => clearInterval(autoScroll))
      el.removeEventListener('mouseout', () => {})
    }
  }, [ref])
}

function SelectMajor({ meta }) {
  const scrollRef = useRef(null)

  useDraggableScroll(scrollRef, meta)
  useAutoScroll(scrollRef)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100">
      <div className="mb-8 text-center">
        <h1 className="mb-10 animate-slidein text-6xl font-bold text-indigo-600 opacity-0 [--slidein-delay:200ms]">
          Choose Your Major
        </h1>
      </div>
      <div
        ref={scrollRef}
        className="scroll-container flex w-full max-w-screen-2xl animate-slidein space-x-6 overflow-x-hidden p-4 opacity-0 [--slidein-delay:400ms] hover:mx-9 hover:cursor-grab"
      >
        {majors.map((major, index) => (
          <div
            key={index}
            className="min-w-[300px] flex-shrink-0 rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition hover:scale-110"
          >
            <h2 className="mb-2 select-none text-xl font-bold">
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
    </div>
  )
}

function SelectCollegeTier() {
  const scrollRef = useRef(null)

  useDraggableScroll(scrollRef)
  useAutoScroll(scrollRef)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-100">
      <div className="mb-8 text-center">
        <h1 className="mb-10 animate-slidein text-6xl font-bold text-indigo-600 opacity-0 [--slidein-delay:200ms]">
          Choose Your College Tier
        </h1>
      </div>
      <div
        ref={scrollRef}
        className="scroll-container flex w-full max-w-screen-2xl animate-slidein space-x-6 overflow-x-hidden p-4 opacity-0 [--slidein-delay:400ms] hover:mx-9 hover:cursor-grab"
      >
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="min-w-[300px] flex-shrink-0 rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition hover:scale-110"
          >
            <h2 className="mb-2 select-none text-xl font-bold">{tier.title}</h2>
            <p className="mb-4 select-none text-sm">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [major, setMajor] = useState('')

  // const handleNextStep = () => {
  //   setStep(step + 1)
  //   console.log('first')
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      {step === 1 && (
        <SelectMajor
          meta={{ setMajor: setMajor, step: step, setStep: setStep }}
        />
      )}
      {step === 2 && <SelectCollegeTier />}
    </div>
  )
}
