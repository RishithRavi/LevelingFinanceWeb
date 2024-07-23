'use client'
import React, { useEffect, useRef } from 'react'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'

const tiers = [
  {
    title: 'Private',
    description: 'Mid-level colleges with good programs',
    imageUrl: '/images/tier3.jpg',
  },
  {
    title: 'Instate Public',
    description: 'Top ranked colleges and universities',
    imageUrl: '/images/tier1.jpg', // Add your image URLs here
  },
  {
    title: 'Out-of-state Public',
    description: 'Highly reputable institutions with strong programs',
    imageUrl: '/images/tier2.jpg',
  },
  {
    title: 'Community college',
    description: 'Regional and community colleges',
    imageUrl: '/images/tier4.jpg',
  },
]

export default function SelectCollegeTier({ onNext }) {
  useEffect(() => {
    const cards = document.querySelectorAll('.tier-card')
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 100}ms`
    })
  }, [])

  const handleCardClick = (tierTitle) => {
    console.log(`Selected College Tier: ${tierTitle}`)
    onNext(tierTitle) // Call the onNext function to proceed to the next stage
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100">
      <div className="mb-8 text-center">
        <h1 className="mb-10 animate-slidein text-6xl font-bold text-indigo-600 opacity-0 [--slidein-delay:200ms]">
          Choose Your College Tier
        </h1>
      </div>
      <div className="flex flex-wrap justify-center space-x-6 space-y-6 p-4">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="tier-card animate-fall flex w-[300px] transform cursor-pointer flex-col items-center justify-center p-4 opacity-0 transition-all hover:scale-110"
            onClick={() => handleCardClick(tier.title)}
          >
            <TiltCard key={index} text={tier} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ROTATION_RANGE = 32.5
const HALF_ROTATION_RANGE = 32.5 / 2

const TiltCard = ({ text }) => {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0]
    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-indigo-500 shadow-lg"
      >
        <p
          style={{
            transform: 'translateZ(50px)',
          }}
          className="white text-center text-2xl font-bold text-white"
        >
          {text.title}
        </p>
      </div>
    </motion.div>
  )
}
